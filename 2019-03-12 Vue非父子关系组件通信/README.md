### Vue 非父子组件通信

#### vue1 
组件之间通信主要通过$dispatch沿着父级向上传播，和通过$broadcast向下广播来实现。

#### vue1废弃原因
组件树的事件流传播方式难以理解，对组件的功能进行扩展会越来越弱。同级组件间的通信问题变得更为复杂

#### vue2解决方案
通过事件中心，无论组件处于组件树的那一层都可以自由交流。可以通过实例化一个空的Vue实例实现。

#### 案例

##### 1. 创建一个空的Vue实例
```
// Bus.js

import Vue from 'vue'
export default new Vue()
```

##### 2. 在需要传递数据的组件用$emit触发实例上的事件

```
// Emit.vue
import Bus from './Bus.vue'

methods: {
  click () {
    Bus.$emit('clickFirst', 'click-first')
  }
}
```

##### 3. 在需要接收的组件用$on监听事件

```
// On.vue
import Bus from './Bus.vue'

mounted () {
  Bus.$on('clickFirst', params => {
    console.log(params)
  })
}
```

#### 注意
在组件销毁前，最好清除对事件的监听
```
beforeDestroy: function () {
  Bus.$off('clickFirst')
},
```