## JWT鉴权
1. pom.xml
```
<!-- jwt -->
<dependency>
  <groupId>com.auth0</groupId>
  <artifactId>java-jwt</artifactId>
  <version>3.11.0</version>
</dependency>
```

2. JWTUtil.java JWT工具类
```
package com.example.learn.utils;

import java.util.Calendar;
import java.util.Map;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/jwt")
public class JWTUtil {
  private static String SIGN = "xxxxxx";

  /**
   * 生成token
   * @param map
   * @return
   */
  public static String getToken(Map<String, String> map) {
    Calendar instance = Calendar.getInstance();
    instance.add(Calendar.MINUTE, 9);

    JWTCreator.Builder builder = JWT.create();

    map.forEach((k, v) -> {
      builder.withClaim(k, v);
    });

    String token = builder.withExpiresAt(instance.getTime()).sign(Algorithm.HMAC256(SIGN));

    return token;
  }

  /**
   * 验证token
   * @param token
   * @return
   */
  public static DecodedJWT verify(String token) {
    return JWT.require(Algorithm.HMAC256(SIGN)).build().verify(token);
  }
}
```

3. JWTInterceptor.java 配置接口请求拦截器
```
package com.example.learn.interceptors;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.auth0.jwt.exceptions.AlgorithmMismatchException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.example.learn.utils.JWTUtil;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.web.servlet.HandlerInterceptor;

public class JWTInterceptor implements HandlerInterceptor {
  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
  throws Exception {
    Map<String, Object> map = new HashMap<>();
    String token = request.getHeader("token");
    try {
      JWTUtil.verify(token);
      return true;
    } catch (SignatureVerificationException e) {
      e.printStackTrace();
      map.put("msg", "无效签名");
    } catch (TokenExpiredException e) {
      e.printStackTrace();
      map.put("msg", "token过期");
    } catch (AlgorithmMismatchException e) {
      e.printStackTrace();
      map.put("msg", "token有误");
    } catch (Exception e) {
      e.printStackTrace();
      map.put("msg", "token无效");
    }
    map.put("status", false);

    String json = new ObjectMapper().writeValueAsString(map);
    response.setContentType("application/json;charset=UTF-8");
    response.getWriter().println(json);

    return false;
  }
}
```

4. interceptorConfig.java 配置接口请求鉴权
```
package com.example.learn.config;

import com.example.learn.interceptors.JWTInterceptor;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class interceptorConfig implements WebMvcConfigurer {
  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    String[] exclude = new String[]{
      "/auth/login",
      "/auth/register",
      "/**/*.png"
    };
    registry.addInterceptor(new JWTInterceptor())
      .addPathPatterns("/**")
      .excludePathPatterns(exclude);
  }
}
```