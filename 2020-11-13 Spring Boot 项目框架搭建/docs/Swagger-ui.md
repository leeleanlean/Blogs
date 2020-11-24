## Swagger-ui
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