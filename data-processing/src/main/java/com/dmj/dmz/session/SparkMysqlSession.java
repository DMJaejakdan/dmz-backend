package com.dmj.dmz.session;

import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;

import java.util.Properties;

public class SparkMysqlSession {
    private static final String MYSQL_DRIVER = "com.mysql.jdbc.Driver";
    private static final String MYSQL_URL = "jdbc:mysql://dmz-db.clgf81ssifml.ap-northeast-2.rds.amazonaws.com:3306/dmz?allowPublicKeyRetrieval=true&useSSL=false&characterEncoding=utf8";

    private static final String MYSQL_USERNAME = "";
    private static final String MYSQL_PASSWORD = "";

    private static SparkMysqlSession instance;

    private static SparkSession session = SparkSession
            .builder()
            .appName("MySQLTest")
            .config("spark.master", "local")
            .config("driver", MYSQL_DRIVER)
            .getOrCreate();

    private SparkMysqlSession() {}

    public static SparkMysqlSession getInstance() {
        if (instance == null) {
            instance = new SparkMysqlSession();
        }

        return instance;
    }

    public static Dataset<Row> readTable(String tableName) {
        Properties properties = new Properties();
        properties.setProperty("characterEncoding", "UTF-8");
        properties.setProperty("username", MYSQL_USERNAME);
        properties.setProperty("password", MYSQL_PASSWORD);

        return session.read().jdbc(MYSQL_URL, tableName, properties);
    }


}
