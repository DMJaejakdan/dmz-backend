package com.dmj.dmz;

import com.dmj.dmz.mongodb.schema.Edge;
import com.dmj.dmz.mongodb.schema.Vertex;
import com.dmj.dmz.session.SparkMongoSession;
import com.dmj.dmz.session.SparkMysqlSession;
import org.apache.spark.api.java.JavaRDD;

public class Main {
    private static final SparkMysqlSession mysqlSession = SparkMysqlSession.getInstance();
    private static final SparkMongoSession mongoSession = SparkMongoSession.getInstance();

    public static void main(String[] args) {
        // 정점 collection 만들기
        makeVerticesAndSave();

        // 간선 collection 만들기
        // 단방향
        // 작품-인물 간선
        makeContentPersonRelationsAndSave();

        // 작품-작품 간선
        makeContentContentRelationsAndSave();

        // 양방향
        makeUndirectedContentContentRelationsAndSave();
    }

    // Mysql의 content, person 테이블을 Mongodb의 vertex document 형식으로 변환시켜 vertex collection에 저장
    private static void makeVerticesAndSave() {
        JavaRddTransformer transformer = new JavaRddTransformer();

        JavaRDD<Vertex> contentDataset = transformer.transformContentToJavaRDD(mysqlSession.readTable("content"));
        mongoSession.overwriteToMongoCollection(contentDataset, Vertex.class, "vertex");

        JavaRDD<Vertex> personDataset = transformer.transformPersonToJavaRDD(mysqlSession.readTable("person"));
        mongoSession.appendToMongoCollection(personDataset, Vertex.class, "vertex");
    }

    // Mysql의 content_actor, content_crew 테이블을 Mongodb의 edge 형식으로 변환시켜 edge collection에 저장
    private static void makeContentPersonRelationsAndSave() {
        JavaRddTransformer transformer = new JavaRddTransformer();

        JavaRDD<Edge> contentActorDataset = transformer.transformContentActorToJavaRDD(mysqlSession.readTable("content_actor"));
        mongoSession.overwriteToMongoCollection(contentActorDataset, Edge.class, "edge");

        JavaRDD<Edge> contentCrewDataset = transformer.transformContentCrewToJavaRDD(mysqlSession.readTable("content_crew"));
        mongoSession.appendToMongoCollection(contentCrewDataset, Edge.class, "edge");
    }

    // Mysql의 content 테이블을 Mongodb의 edge 형식으로 변환시켜 edge collection에 저장
    private static void makeContentContentRelationsAndSave() {
        JavaRddTransformer transformer = new JavaRddTransformer();

        JavaRDD<Edge> contentContentDataset = transformer.transformContentContentToJavaRDD(mysqlSession.readTable("content_genre"), mysqlSession.readTable("content_keyword"));

        mongoSession.appendToMongoCollection(contentContentDataset, Edge.class, "edge");
    }

    private static void makeUndirectedContentContentRelationsAndSave() {
        JavaRddTransformer transformer = new JavaRddTransformer();

        JavaRDD<Edge> contentContentDataset = transformer.transformUndirectedContentContentToJavaRDD(mysqlSession.readTable("content_genre"), mysqlSession.readTable("content_keyword"));

        mongoSession.overwriteToMongoCollection(contentContentDataset, Edge.class, "undirected_edge");
    }
}
