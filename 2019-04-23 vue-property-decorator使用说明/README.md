## vue-property-decorator使用说明
> 在Vue中使用TypeScript时，使用装饰器来简化书写。
```
import {
  Component,
  Prop,
  Model,
  Watch,
  Emit,
  Inject,
  Provide
} from 'vue-property-decorator'
```

### @Component
> 引用组件

父组件
```
<script lang="ts">
// 引入所需装饰器
import { Vue, Component } from 'vue-property-decorator'

// 引入组件
import ComponentHeader from './components/Header'
import ComponentMain from './components/Main'

// 注册组件
@Component({
  components: {
    ComponentHeader,
    ComponentMain
  }
})
</script>

// 默认导出
export default class Index extends Vue {}
```

子组件
```
<script lang="ts">
import {
  Vue,
  Component
} from 'vue-property-decorator'

@Component
export default class IndexMain extends Vue {}
</script>
```

### @Prop
> 父组件向子组件传值

父组件
```
Template:
<Main :user="user" />

Script:
user:object = {
  info: {
    age: 20,
    name: 'lean'
  },
  sex: 1,
  location: 'ShangHai'
}
```

子组件
```
@Prop({
  type: Object,
  default: () => {
    return {}
  }
})
user!: object
```
### @Emit
> 子组件向父组件传值

父组件
```
Template:
<Header @emitClick="emitClick" />

Script:
emitClick (params:any) {
  console.log(params)
}
```
子组件
```
Template:
<div @click="click">Click</div>

Script:
@Emit('emitClick')
click () {
  this.msg = 'leelean'
  return this.msg
}
```

### @Watch
> 监听数据变化
```
@Watch('user', { immediate: true, deep: true })
userChange (data:any) {
  console.log(data)
}
```
### @Model

特点：
v-model 会把 value 用作 prop 且把 input 用作 event，使用 model 选项可以回避使用 value prop 产生的冲突

缺点：
使用场景比较少

### @Provide / @Inject

特点：
在上层级的声明的provide，往下层无论多深都能通过inject来访问到provide的数据

缺点：
在任意层级都能访问导致数据追踪比较困难，不建议使用