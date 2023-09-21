package com.dmj.dmz.session;

import com.dmj.dmz.mongodb.schema.Edge;
import com.dmj.dmz.mongodb.schema.Vertex;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SaveMode;
import org.apache.spark.sql.SparkSession;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class SparkMongoSession {
    private String url;

    private String database;

    private static SparkMongoSession instance;


    final SparkSession sparkSession = SparkSession
            .builder()
            .appName("MongoSparkSession")
            .master("spark://spark-master:8000")
            .config("spark.executor.memory", "3g")
            .getOrCreate();

    private SparkMongoSession() {
        Properties properties = new Properties();
        try {
            String resources = "src/main/resources/mongo.properties";
            properties.load(new FileInputStream(resources));
            
            url = properties.getProperty("MONGO_URL");
            database = properties.getProperty("MONGO_DATABASE");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

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
                .option("spark.mongodb.write.connection.uri", url)
                .option("database", database)
                .option("collection", "vertex")
                .mode(SaveMode.Append)
                .save();
    }

    public void appendEdgesToMongoCollection(JavaRDD<Edge> dataset) {
        Dataset<Row> dataFrame = sparkSession.createDataFrame(dataset, Edge.class).toDF();

        dataFrame.write()
                .format("mongodb")
                .option("spark.mongodb.write.connection.uri", url)
                .option("database", database)
                .option("collection", "edge")
                .mode(SaveMode.Append)
                .save();
    }

    public void appendToMongoCollection(JavaRDD<?> dataset, Class schema, String collectionName) {
        Dataset<Row> dataFrame = sparkSession.createDataFrame(dataset, schema).toDF();

        dataFrame
                .write()
                .format("mongodb")
                .option("spark.mongodb.write.connection.uri", url)
                .option("database", database)
                .option("collection", collectionName)
                .mode(SaveMode.Append)
                .save();
    }

    public void overwriteToMongoCollection(JavaRDD<?> dataset, Class schema, String collectionName) {
        Dataset<Row> dataFrame = sparkSession.createDataFrame(dataset, schema).toDF();

        dataFrame
                .write()
                .format("mongodb")
                .option("spark.mongodb.write.connection.uri", url)
                .option("database", database)
                .option("collection", collectionName)
                .mode(SaveMode.Overwrite)
                .save();
    }
}
