## 获取properties属性值
1. @Value
```
@Value("${spring.servlet.multipart.location}")
private String filePath;
```

2. Environment
```
@Autowired
private Environment environment;

environment.getProperty("spring.servlet.multipart.location")
```

3. ConfigurationProperties
```
@ConfigurationProperties(prefix = "url")  

private String path;
```

4. 自定义properties文件
```
@Component  
@ConfigurationProperties(prefix = "url")  
@PropertySource("classpath:/platform.properties") 

private String path;
```