package com.dmj.dmz.session;

import com.dmj.dmz.mongodb.schema.Edge;
import com.dmj.dmz.mongodb.schema.Vertex;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;

public class SparkMongoSession {
    private static final String MONGO_URL = "mongodb://localhost:27017/admin";

    private static final String MONGO_USERNAME = "";
    private static final String MONGO_PASSWORD = "";

    private static final String MONGO_DATABASE = "admin";

    private static SparkMongoSession instance;

    final SparkSession sparkSession = SparkSession
            .builder()
            .master("local")
            .appName("MongoSparkSession")
            .config("spark.mongodb.input.uri", MONGO_URL)
            .config("spark.mongodb.output.uri", MONGO_URL)
            .getOrCreate();

    private SparkMongoSession() {}

    public static SparkMongoSession getInstance() {
        if (instance == null) {
            instance = new SparkMongoSession();
        }
        return instance;
    }

    public void appendVerticesToMongoCollection(JavaRDD<Vertex> dataset) {
        Dataset<Row> dataFrame = sparkSession.createDataFrame(dataset, Vertex.class).toDF();

        dataFrame.write()
                .format("mongodb")
                .option("database", MONGO_DATABASE)
                .option("collection", "vertex")
                .mode("overwrite")
                .save();
    }

    public void appendEdgesToMongoCollection(JavaRDD<Edge> dataset) {
        Dataset<Row> dataFrame = sparkSession.createDataFrame(dataset, Edge.class).toDF();

        dataFrame.write()
                .format("mongodb")
                .option("database", MONGO_DATABASE)
                .option("collection", "edge")
                .mode("overwrite")
                .save();
    }
}
