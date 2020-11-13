# Spring Boot 项目框架搭建

## 0 介绍
- 多环境配置
- 日志配置
- Swagger-ui
- 统一结果返回封装
- JWT鉴权
- RESTFull API
- 数据库增删改查（多参数、带分页）

## 1. 多环境配置
1. 配置 application.properties
```
# 指定激活的配置文件名
spring.profiles.active = dev
```

2. 新建所需环境配置文件

```
dev: application-dev.properties
# 默认端口号
server.port = 8888

# 数据库配置
spring.datasource.url = dev-url
spring.datasource.username = dev-root
spring.datasource.password = dev-root
...


prod: application-prod.properties
# 默认端口号
server.port = 9999

# 数据库配置
spring.datasource.url = prod-url
spring.datasource.username = prod-root
spring.datasource.password = prod-root
...
```

## 2. 日志配置
1. application.properties
```
# 日志级别
logging.level.com.example = trace
# 日志目录
logging.file.name=./log/log.log
```
2. 使用方法
```
// Logger
org.slf4j.Logger logger = LoggerFactory.getLogger(getClass());

// 输出日志
logger.trace("...trace...");
logger.debug("...debug...");
logger.info("...info...");
logger.warn("...warn...");
logger.error("...error...");
```

## 3. Swagger-ui
1. pom.xml
```
<!-- swagger2 -->
<dependency>
  <groupId>io.springfox</groupId>
  <artifactId>springfox-swagger2</artifactId>
  <version>2.9.2</version>
</dependency>
<dependency>
  <groupId>io.springfox</groupId>
  <artifactId>springfox-swagger-ui</artifactId>
  <version>2.9.2</version>
</dependency>
```

2. 添加鉴权后，需要配置放行规则 excludePathPatterns
```
// -- swagger ui
"/csrf",
"/swagger-resources/**",
"/swagger-ui.html",
"/v2/api-docs",
"/webjars/**"
```

3. 查看
```
预览地址
http://localhost:8888/api/swagger-ui.html

更多文档
https://swagger.io/tools/swagger-ui/
```

## 4. 统一结果返回封装
1. ResultUtil.java 工具类
```
package com.example.learn.utils;

import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

public class ResultUtil {
  org.slf4j.Logger logger = LoggerFactory.getLogger(getClass());

  // 成功状态码
  public static final String  RET_CODE = "000000";
  // 成功信息
  public static final String  RET_MSG = "success";
  // 失败状态码
  public static final String  ERR_CODE = "999999";
  // 失败信息
  public static final String  ERR_MSG = "error";

  // 返回状态码参数
  private String code;
  // 返回信息参数
  private String msg;
  // 返回结果参数
  private Object payload;

  private ResultUtil () {
  }

  public String getCode () {
    return code;
  }

  public void setCode (String code) {
    this.code = code;
  }

  public String getMsg () {
    return msg;
  }

  public void setMsg (String msg) {
    this.msg = msg;
  }

  public Object getPayload () {
    return payload;
  }

  public void setPayload (Object payload) {
    this.payload = payload;
  }

  public static ResultUtil success () {
    ResultUtil result = new ResultUtil();
    result.setCode(RET_CODE);
    result.setMsg(RET_MSG);
    return result;
  }

  public static ResultUtil error () {
    return error(ERR_CODE, ERR_MSG);
  }

  public static ResultUtil error (String msg) {
    return error(ERR_CODE, msg);
  }

  public static ResultUtil error (String code, String msg) {
    ResultUtil result = new ResultUtil();
    result.setCode(code);
    result.setMsg(msg);
    return result;
  }

  public ResultUtil code (String code) {
    this.code = code;
    return this;
  }

  public ResultUtil msg (String msg) {
    this.msg = msg;
    return this;
  }

  public ResultUtil render (Object el) {
    this.payload = el;
    return this;
  }

  @SuppressWarnings({ "rawtypes", "unchecked" })
  public ResultUtil render (String key, Object value) {
    if (this.payload == null) {
      this.payload = new HashMap<String, Object>();
    }
    if (this.payload instanceof Map) {
      Map map = (Map) this.payload;
      map.put(key, value);
    } else {
      logger.error("The type of payload should be Map");
    }
    return this;
  }
}
```
2. 使用方法
```
# success
- ResultUtil.success().render("success");
result:
{
  "code": "000000",
  "msg": "success",
  "payload": success
}

- ResultUtil.success().render("element", element);
result:
{
  "code": "000000",
  "msg": "success",
  "payload": {
    element: element
  }
}

- ResultUtil.success()
  .render("element", element)
  .render("lists", lists);
result:
{
  "code": "000000",
  "msg": "success",
  "payload": {
    element: element,
    lists: lists
  }
}

# error
- ResultUtil.error();
result: 
{
  "code": "999999",
  "msg": "error",
  "payload": null
}

- ResultUtil.error("xxx");
result:
{
  "code": "999999",
  "msg": "xxx",
  "payload": null
}

- ResultUtil.error("500", "xxx");
result: 
{
  "code": "500",
  "msg": "xxx",
  "payload": null
}
```

## 5. JWT鉴权
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

## 6. RESTFull API
DemoController.java
```
package com.example.learn.demo.controller;

import com.example.learn.utils.ResultUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/demo")
public class DemoController {
  // Logger
  Logger logger = LoggerFactory.getLogger(getClass());

  /**
   * 输出日志
   * @return
   */
  @GetMapping("/log")
  public ResultUtil log() {
    logger.trace("...trace...");
    logger.debug("...debug...");
    logger.info("...info...");
    logger.warn("...warn...");
    logger.error("...error...");
    return ResultUtil.success().render("打印日志成功");
  }

  /**
   * 查询所有数据
   * @return
   */
  @GetMapping("")
  public ResultUtil searchAll () {
    return ResultUtil.success().render("查询所有数据");
  }

  /**
   * 查询一条数据
   * @param id
   * @return
   */
  @GetMapping("/{id}")
  public ResultUtil searchOne (@PathVariable String id) {
    return ResultUtil.success().render("根据ID查询一条数据");
  }

  /**
   * 新增一条数据
   * @param entity
   * @return
   */
  @PostMapping("")
  public ResultUtil create (@RequestBody String entity) {
    return ResultUtil.success().render("新增一条数据");
  }

  /**
   * 更新一条数据
   * @param id
   * @param entity
   * @return
   */
  @PutMapping("/{id}")
  public ResultUtil update (@PathVariable String id, @RequestBody String entity) {
    return ResultUtil.success().render("根据ID更新一条数据");
  }

  /**
   * 删除一条数据
   * @param id
   * @return
   */
  @DeleteMapping("/{id}")
  public ResultUtil delete (@PathVariable String id) {
    return ResultUtil.success().render("根据ID删除一条数据");
  }
}
```

## 7. 数据库增删改查（多参数、带分页）
```
api: https://spring.io/projects/spring-data-jpa
```
1. pom.xml
```
<!--集成mysql数据库-->
<dependency>
  <groupId>mysql</groupId>
  <artifactId>mysql-connector-java</artifactId>
</dependency>

<dependency>
  <groupId>org.springframework.data</groupId>
  <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

2. application.properties
```
# 配置MySql数据库
spring.datasource.url=jdbc:mysql://localhost:3306/springboot
spring.datasource.username=root
spring.datasource.password=root
```

3. UserEntity.java
```
package com.example.learn.user.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@Entity
@Table(name = "tb_user")
public class UserEntity {
  /**
   * 主键 id
   */
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Id
  private Long id;

  /**
   * 用户名
   */
  @Column(name = "name", unique = true, length = 32)
  private String name;

  /**
   * 年龄
   */
  @Column(name = "age", nullable = true, length = 2)
  private String age;

  /**
   * 创建时间
   */
  @CreatedDate
  @Column(name = "create_time", updatable = false,nullable = false)
  @org.hibernate.annotations.CreationTimestamp
  private Date createTime;

  /**
   * 更新时间
   */
  @LastModifiedDate
  @Column(name = "update_time", nullable = false)
  @org.hibernate.annotations.UpdateTimestamp
  private Date updateTime;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getAge() {
    return age;
  }

  public void setAge(String age) {
    this.age = age;
  }

  public Date getCreateTime() {
    return createTime;
  }

  public void setCreateTime(Date createTime) {
    this.createTime = createTime;
  }

  public Date getUpdateTime() {
    return updateTime;
  }

  public void setUpdateTime(Date updateTime) {
    this.updateTime = updateTime;
  }
}
```

4. UserController.java
```
package com.example.learn.user.controller;

import com.example.learn.user.entity.UserEntity;
import com.example.learn.user.service.UserService;
import com.example.learn.utils.ResultUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

  @Autowired
  private UserService userService;

  /**
   * 查询所有数据
   * @param pageIndex
   * @param pageSize
   * @param userEntity
   * @return
   */
  @GetMapping("")
  public ResultUtil search(
    @RequestParam(value = "pageIndex", required = false, defaultValue = "0") String pageIndex,
    @RequestParam(value = "pageSize", required = false, defaultValue = "10") String pageSize,
    @RequestBody(required = false) UserEntity userEntity) {
    return userService.findAll(pageIndex, pageSize, userEntity);
  }

  /**
   * 查询一条数据
   * @param id
   * @return
   */
  @GetMapping("/{id}")
  public ResultUtil findById(@PathVariable Long id) {
    return userService.findById(id);
  }

  /**
   * 删除一条数据
   * @param id
   * @return
   */
  @DeleteMapping("/{id}")
  public ResultUtil delete(@PathVariable Long id) {
    System.out.println();
    return userService.delete(id);
  }

  /**
   * 新增一条数据
   * @param userEntity
   * @return
   */
  @PostMapping("")
  public ResultUtil create(@RequestBody UserEntity userEntity) {
    return userService.save(userEntity);
  }

  /**
   * 更新一条数据
   * @param userEntity
   * @return
   */
  @PutMapping("")
  public ResultUtil update(@RequestBody UserEntity userEntity) {
    return userService.save(userEntity);
  }
}
```

5. UserService.java
```
package com.example.learn.user.service;

import javax.annotation.Resource;

import com.example.learn.user.entity.UserEntity;
import com.example.learn.user.repository.UserRepository;
import com.example.learn.utils.ResultUtil;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Resource
  UserRepository userRepository;

  /**
    * 查询所有数据
    * @param pageIndex
    * @param pageSize
    * @param userEntity
    * @return
    */
  public ResultUtil findAll(String pageIndex, String pageSize, UserEntity userEntity) {
    try {
      int index = Integer.parseInt(pageIndex);
      int size = Integer.parseInt(pageSize);
      PageRequest pageRequest = PageRequest.of(index, size);
      Slice<UserEntity> records = userRepository.findAll(pageRequest);

      return ResultUtil.success().render(records);
    } catch (Exception e) {
      return ResultUtil.error(e.getMessage());
    }
  }

  /**
    * 根据ID查询用户
    * @param id
    * @return
    */
  public ResultUtil findById(Long id) {
    try {
      return ResultUtil.success().render(userRepository.findById(id));
    } catch (Exception e) {
      return ResultUtil.error(e.getMessage());
    }
  }

  /**
    * 删除一条数据
    * @param id
    * @return
    */
  public ResultUtil delete(Long id) {
    try {
      return ResultUtil.success().render(userRepository.deleteById(id));
    } catch (Exception e) {
      return ResultUtil.error(e.getMessage());
    }
  }

  /**
    * 新增一条数据
    * @param userEntity
    * @param userEntity.id 更新一条数据
    * @return
    */
  public ResultUtil save(UserEntity userEntity) {
    try {
      userRepository.save(userEntity);
      return ResultUtil.success().render(userEntity);
    } catch (Exception e) {
      return ResultUtil.error(e.getMessage());
    }
  }
}
```

6. UserRepository.java
```
package com.example.learn.user.repository;

import com.example.learn.user.entity.UserEntity;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

  Slice<UserEntity> findAllByAge(Integer integer, Pageable pageable);

  Object findById(Long id);

  Object deleteById(Long id);
}
```