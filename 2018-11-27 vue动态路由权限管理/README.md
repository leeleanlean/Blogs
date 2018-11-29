# vue 动态路由权限管理
根据不同的角色，展示不同的路由

### 实现思路

用户登录成后，把用户信息保存至localStorage 和 vuex，用addRutes动态添加路由。
然后用 localStorage 和 vuex相结合，解决用户刷新路由无效问题

```
用户登录
  ↓
  - 成功
    ↓
    - 把用户信息保存至vuex
    - 把用户信息保存至localStorage
    - 用addRutes动态添加路由并跳转至首页
  ↓
  - 失败
    ↓
    - 继续登录

拦截路由变化
  ↓
  - 判断vuex中是否有用户信息
    ↓
    - 有用户信息
      ↓
      - 验证token
        ↓
        - token验证通过
          ↓
          - 跳转路由
        ↓
        - token验证不通过
          ↓
          - 跳转登录页面
    ↓
    - 没有用户信息
      ↓
      - 判断localStorage中是否有用户信息
        ↓
        - 有用户信息
          ↓
          - 验证token
            ↓
            - token验证通过
              ↓
              - 获取localStorage用户信息
                ↓
                - 设置vuex中的用户信息
                ↓
                - 重新设置用户路由
            ↓
            - token验证不通过
              ↓
              - 跳转登录页面
        ↓
        - 没有用户信息
          ↓
          - 跳转登录
```

### 实现代码

vue-premission 目录