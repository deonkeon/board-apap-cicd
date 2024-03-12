package com.bit.boardapp.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {
    // react의 라우트 요청 시 index.html로 가도록하는 설정
    // springboot는 요청이 오면 .html 파일을 리턴하기 때문에 에러가 발생한다.
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/app/**")
                .setViewName("forward:/index.html");
    }
}
