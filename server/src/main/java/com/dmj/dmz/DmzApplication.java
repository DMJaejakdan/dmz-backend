package com.dmj.dmz;

import com.dmj.dmz.config.EnvConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource(value = {
    "classpath:env.yml",
}, factory = EnvConfig.class)
public class DmzApplication {

    public static void main(String[] args) {
        SpringApplication.run(DmzApplication.class, args);
    }

}
