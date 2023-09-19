package com.dmj.dmz;

import com.dmj.dmz.mongodb.schema.Edge;
import com.dmj.dmz.mongodb.schema.Vertex;
import com.dmj.dmz.session.SparkMongoSession;
import com.dmj.dmz.session.SparkMysqlSession;
import org.apache.spark.api.java.JavaRDD;

// TODO: aws 서버의 데이터베이스로 추가하기
public class Main {
    private static final SparkMysqlSession mysqlSession = SparkMysqlSession.getInstance();
    private static final SparkMongoSession mongoSession = SparkMongoSession.getInstance();

    public static void main(String[] args) {
        // 정점 collection 만들기
        makeVerticesAndSave();

        // 간선 collection 만들기
        // 작품-인물 간선
        makeContentPersonRelationsAndSave();
        makeContentContentRelationsAndSave();

        // 작품-작품 간선
        makeContentContentRelationsAndSave();

        // 인물-인물 간선

    }

    // Mysql의 content, person 테이블을 Mongodb의 vertex document 형식으로 변환시켜 vertex collection에 저장
    private static void makeVerticesAndSave() {
        JavaRddTransformer transformer = new JavaRddTransformer();

        JavaRDD<Vertex> contentDataset =
                transformer.transformContentToJavaRDD(mysqlSession.readTable("content"));
        mongoSession.appendVerticesToMongoCollection(contentDataset);

        JavaRDD<Vertex> personDataset =
                transformer.transformPersonToJavaRDD(mysqlSession.readTable("person"));
        mongoSession.appendVerticesToMongoCollection(personDataset);
    }

    // Mysql의 content_actor, content_crew 테이블을 Mongodb의 edge 형식으로 변환시켜 edge collection에 저장
    private static void makeContentPersonRelationsAndSave() {
        JavaRddTransformer transformer = new JavaRddTransformer();

        JavaRDD<Edge> contentActorDataset =
                transformer.transformContentActorToJavaRDD(mysqlSession.readTable("content_actor"));
        mongoSession.appendEdgesToMongoCollection(contentActorDataset);

        JavaRDD<Edge> contentCrewDataset =
                transformer.transformContentCrewToJavaRDD(mysqlSession.readTable("content_crew"));
        mongoSession.appendEdgesToMongoCollection(contentCrewDataset);
    }

    // Mysql의 content 테이블을 Mongodb의 edge 형식으로 변환시켜 edge collection에 저장
    private static void makeContentContentRelationsAndSave() {
        JavaRddTransformer transformer = new JavaRddTransformer();

        JavaRDD<Edge> contentContentDataset =
                transformer.transformContentContentToJavaRDD(mysqlSession.readTable("content_genre"),
                        mysqlSession.readTable("content_keyword"));

        mongoSession.appendEdgesToMongoCollection(contentContentDataset);
    }
}
