package com.dmj.dmz.session;

import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class SparkMysqlSession {
    private final static String MYSQL_DRIVER = "com.mysql.jdbc.Driver";
    private String url;

    private String username;
    private String password;

    private static SparkMysqlSession instance;

    private static SparkSession session = SparkSession
            .builder()
            .appName("MySQLTest")
            .master("spark://spark-master:8000")
            .config("driver", MYSQL_DRIVER)
            .config("spark.executor.memory", "3g")
            .getOrCreate();

    private SparkMysqlSession() {
        Properties properties = new Properties();
        try {
            String resources = "src/main/resources/mysql.properties";
            properties.load(new FileInputStream(resources));

            url = properties.getProperty("MYSQL_URL");
            username = properties.getProperty("MYSQL_USERNAME");
            password = properties.getProperty("MYSQL_PASSWORD");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static SparkMysqlSession getInstance() {
        if (instance == null) {
            instance = new SparkMysqlSession();
        }

        return instance;
    }

    public Dataset<Row> readTable(String tableName) {
        Properties properties = new Properties();
        properties.setProperty("characterEncoding", "UTF-8");
        properties.setProperty("username", username);
        properties.setProperty("password", password);

        return session.read().jdbc(url, tableName, properties);
    }
}
