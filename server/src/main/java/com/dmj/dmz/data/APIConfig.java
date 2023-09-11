package com.dmj.dmz.data;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@ConfigurationProperties(prefix = "apikey")
@PropertySource(value = {"apikey.yml"}, factory = YmlLoadFactory.class)
@Getter
@Setter
@ToString
public class APIConfig {
    private String baseURL;
    private String key;
}
