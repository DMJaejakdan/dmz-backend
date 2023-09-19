package com.dmj.dmz;

import com.dmj.dmz.mongodb.schema.Edge;
import com.dmj.dmz.mongodb.schema.Vertex;
import com.dmj.dmz.processing.Content;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import scala.Tuple2;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class JavaRddTransformer {

    public JavaRDD<Vertex> transformContentToJavaRDD(Dataset<Row> content) {
        return content
                .javaRDD()
                .map(Vertex::fromContent);
    }

    public JavaRDD<Vertex> transformPersonToJavaRDD(Dataset<Row> content) {
        return content
                .javaRDD()
                .map(Vertex::fromPerson);
    }

    public JavaRDD<Edge> transformContentActorToJavaRDD(Dataset<Row> contentActor) {
        return contentActor
                .javaRDD()
                .map(Edge::fromContentActor)
                .flatMap(List::iterator);
    }


    public JavaRDD<Edge> transformContentCrewToJavaRDD(Dataset<Row> contentCrew) {
        return contentCrew
                .javaRDD()
                .map(Edge::fromContentCrew)
                .flatMap(List::iterator);
    }

    public JavaRDD<Edge> transformContentContentToJavaRDD(Dataset<Row> genre, Dataset<Row> keyword) {
        JavaPairRDD<Long, Long> genreTest = genre.javaRDD()
                .mapToPair(row -> {
                    Long id = row.getAs("CONTENT_ID");
                    Long genreId = row.getAs("GENRE_ID");
                    return new Tuple2<>(id, genreId);
                });

        // content_id를 key로 해서 genre와 keyword를 리스트 형태로 모은 후 Content 정보를 담은 객체 생성
        JavaPairRDD<Long, Set<Long>> genreRdd = genre
                .javaRDD()
                .mapToPair(row -> {
                    Long id = row.getAs("CONTENT_ID");
                    Long genreId = row.getAs("GENRE_ID");
                    return new Tuple2<>(id, genreId);
                })
                .groupByKey()
                .mapValues(values -> {
                    Set<Long> valueSet = new HashSet<>();
                    for (Long value : values) {
                        valueSet.add(value);
                    }
                    return valueSet;
                });

        JavaPairRDD<Long, Set<Long>> keywordRdd = keyword
                .javaRDD()
                .mapToPair(row -> {
                    Long id = row.getAs("CONTENT_ID");
                    Long keywordId = row.getAs("KEYWORD_ID");

                    return new Tuple2<>(id, keywordId);
                })
                .groupByKey()
                .mapValues(values -> {
                    Set<Long> valueSet = new HashSet<>();
                    for (Long value : values) {
                        valueSet.add(value);
                    }
                    return valueSet;
                });

        // 작품 id로 엮어서 하나의 Content 객체로 변환하기
        JavaRDD<Content> contentRdd = genreRdd
                .cogroup(keywordRdd)
                .mapValues(tuple -> {
                    Set<Long> genres = new HashSet<>();
                    for (Set subset : tuple._1) {
                        genres.addAll(subset);
                    }

                    Set<Long> keywords = new HashSet<>();
                    for (Set subset : tuple._2) {
                        keywords.addAll(subset);
                    }

                    return new Tuple2<>(genres, keywords);
                })
                .map(tuple -> new Content(tuple._1, tuple._2._1, tuple._2._2));

        // 가능 한 모든 processing.Content 순서 쌍을 생성하고 Edge로 매핑
        return contentRdd
                .cartesian(contentRdd)
                .filter(pair -> !pair._1().getId().equals(pair._2.getId()))
                .map(pair -> Edge.fromContentContent(pair._1(), pair._2()))
                .filter(edge -> edge.getWeight() > 0);
    }
}
