package com.theatre;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.theatre")
@EntityScan("com.theatre.model")
@EnableJpaRepositories("com.theatre.repository")
public class TheatreApplication {

  public static void main(String[] args) {
    SpringApplication.run(TheatreApplication.class, args);
  }
}
