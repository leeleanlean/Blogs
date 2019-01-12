### 创建webview 并渲染到页面上

```
UIWebView *webView = [[UIWebView alloc] initWithFrame:self.view.frame];
NSString *urlStr = @"http://www.baidu.com";
NSURL *url = [NSURL URLWithString:urlStr];
NSURLRequest *request = [NSURLRequest requestWithURL:url];
[webView setScalesPageToFit:YES];
[webView loadRequest:request];

[self.view addSubview:webView];
```


#### 启动项目白屏，控制台报错
```
webView[20611:2081211] App Transport Security has blocked a cleartext HTTP (http://) resource load since it is insecure. Temporary exceptions can be configured via your app's Info.plist file.
```

#### 报错原因：
iOS9引入了新特性App Transport Security (ATS)，新特性要求App内访问的网络必须使用HTTPS协议。

#### 解决方法：
1/ 在Info.plist中添加 App Transport Security Settings 类型 Dictionary
2/ 在 App Transport Security Settings 下添加 Allow Arbitrary Loads 类型 Boolean ,值设为 YES