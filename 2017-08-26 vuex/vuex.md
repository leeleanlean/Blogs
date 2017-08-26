### 创建store.js

~~~
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// axios
import axios from 'axios'

// 导出模块
export default new Vuex.Store({
    state: {
        count: 10
    },
    mutations: {
        increment: (state,then) => {
            state.count++;
            console.log(then);
            axios({
                url:'aaa.json'
            }).then((res)=>{
                console.log(res);
            })
        },
        decrement: (state,then) => {
            state.count--;
            console.log(then);
        }
    }
})
~~~

### 将store实例注入到根组件

app.vue
~~~
import store from './store';
export default {
    store
}
~~~

### 组件中使用

使用数据：
this.$store.state.count

调用方法并传递参数：
this.$store.commit('fn',...)