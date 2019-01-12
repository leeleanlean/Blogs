# React构建项目笔记 （React、react-router、Redux）

- 笔记目录

  - 项目目录结构
  - 安装 React
  - JSX基础语法
  - 添加less配置
  - React 生命周期
  - 跨域请求数据
  - 路由配置 (react-router)
  - 状态管理 Redux
  - 封装Fetch请求数据

## 项目目录结构

- ...
- src
  - components       (公共组件)
  - assets           (静态资源)
  - static           (第三方静态资源)
  - views            (视图文件夹)
  - redux            (redux文件夹)
  - index.js         (主入口文件)
  - router.js        (路由配置文件)
  - store.js         (拆分reducer)
  - fetch.js         (封装fetch请求)

## 安装 React
```
npm install -g create-react-app
create-react-app my-app

cd my-app
npm start
```

## JSX基础语法
它是一种JavaScript语法扩展，在React中可以方便地用来描述UI。

#### 输出文本
```
{info.name}
```

#### 输出HTML
为了避免xss攻击，React Render需要开启html显示功能才能插入html标签
```
<p dangerouslySetInnerHTML={{__html: info.html}}></p>
```

#### 标签属性
```
<p age={info.age}>{info.age}</p>
```

#### 标签样式
```
const pStyle = {
  color: '#f00'
}
<p style={pStyle}>{info.age}</p>

<p style={{color: '#f00', fontSize: '20px'}}>{info.age}</p>
```

#### 动态class
因为class为js保留关键词，所以用className
```
<p className={info.age === 20 ? 'hidden' : 'show'}>{info.age}</p>
```

#### 标签表达式
```
<p>{info.age + 1}</p>
<p>{info.age === 20 ? '等于20' : '不等于20'}</p>
```

#### 显示 || 隐藏标签
```
<p className={info.age === 20 ? 'hidden' : ''}>{info.age}</p>
```

#### 遍历数据
```
<ul>
  {
    info.list.map(item => {
      return <li key={item.index}>
        <span>{item.index}</span>
        <span>{item.type}</span>
        <span>{item.text}</span>
      </li>
    })
  }
</ul>
```

#### 事件绑定
由于类的方法默认不会绑定this，在调用的时候如果忘记绑定this的值将会是undefined。

* 调用的时候使用bind绑定this
```
onClick={this.liClick.bind(item)}
```

* 调用的时候使用箭头函数绑定this
```
onClick={() => this.liClick(item)}
```

#### 获取表单的值
```
<input type="text" ref='username' onChange={() => this.inputChange(this)}/>
console.log(this.refs.username.value)
```

#### React支持的事件

> 阻止事件冒泡 e.stopPropagation()

* 剪贴板事件
onCopy onCut onPaste

* 键盘事件
onKeyDown onKeyPress onKeyUp

* 焦点事件
onFocus onBlur

* 表单事件
onChange onInput onSubmit

* 鼠标事件
onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
onMouseMove onMouseOut onMouseOver onMouseUp

* 触控事件
onTouchCancel onTouchEnd onTouchMove onTouchStart

* 用户界面事件
onScroll

* 滚轮事件
onWheel

## 添加less配置

#### 暴露配置文件
create-react-app生成的项目文，看不到webpack相关的配置文件，需要先暴露出来，使用如下命令即可：
```
npm run eject
```

#### 安装less-loader 和 less
```
npm install less-loader less --save-dev
```

#### 修改webpack配置
修改 webpack.config.dev.js 和 webpack.config-prod.js 配置文件

* /\.css$/ 改为 /\.(css|less)$/
* /\.css$/ 的 use 数组配置增加 less-loader

```
{
  loader: require.resolve('less-loader') // compiles Less to CSS
}
```

## React 生命周期

#### 初始化时会触发5个钩子函数

1、getDefaultProps()

设置默认的props，也可以用dufaultProps设置组件的默认属性。

2、getInitialState()

在使用es6的class语法时是没有这个钩子函数的，可以直接在constructor中定义this.state。此时可以访问this.props。

3、componentWillMount()

组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改state。

4、 render()

react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行。此时就不能更改state了。

5、componentDidMount()

组件渲染之后调用，可以通过this.getDOMNode()获取和操作dom节点，只调用一次。

#### 更新时会触发5个钩子函数

6、componentWillReceivePorps(nextProps)

组件初始化时不调用，组件接受新的props时调用。

7、shouldComponentUpdate(nextProps, nextState)

react性能优化非常重要的一环。组件接受新的state或者props时调用，我们可以设置在此对比前后两个props和state是否相同，如果相同则返回false阻止更新，因为相同的属性状态一定会生成相同的dom树，这样就不需要创造新的dom树和旧的dom树进行diff算法对比，节省大量性能，尤其是在dom结构复杂的时候。不过调用this.forceUpdate会跳过此步骤。

8、componentWillUpdate(nextProps, nextState)

组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改state

9、render()

不多说

10、componentDidUpdate()

组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点。

还有一个卸载钩子函数

11、componentWillUnmount()

组件将要卸载时调用，一些事件监听和定时器需要在此时清除。

以上可以看出来react总共有10个周期函数（render重复一次），这个10个函数可以满足我们所有对组件操作的需求，利用的好可以提高开发效率和组件性能。

## 跨域请求数据

#### 配置package.json
在 package.json 文件中添加 proxy
```
"proxy": {
  "/v2/api/": {
    "target": "http://www.xxxxxx.com",
    "changeOrigin": true
  }
},
```

## 路由配置 (react-router)

#### 安装 react-router
React Router被拆分成三个包：react-router,react-router-dom和react-router-native。react-router提供核心的路由组件与函数。其余两个则提供运行环境（即浏览器与react-native）所需的特定组件。

react-router-dom暴露出react-router中暴露的对象与方法，进行网站（将会运行在浏览器环境中）构建时，只需要安装并引用react-router-dom即可。
```
npm install --save-dev react-router-dom
```

#### 配置项目入口文件

<BrowserRouter>和<HashRouter>都可以实现前端路由的功能，区别是前者基于rul的pathname段，后者基于hash段。

* 前者：项目地址/article/num1
* 后者：项目地址/#/article/num1（不一定是这样，但#是少不了的）

```
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import Router from './router.js'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <BrowserRouter>
    <Router/>
  </BrowserRouter>
  ), document.getElementById('root')
);
registerServiceWorker();

```

#### 创建router.js文件

> 统一配置和管理路由的文件

```
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from './views/Home/home.js'
import About from './views/About/about.js'
import Contact from './views/Contact/contact.js'

const BasicExample = () => (
  <Router>
    <div>
      <Route exact path="/" component={ Home }/>
      <Route path="/about" component={ About }/>
      <Route path="/contact" component={ Contact }/>
    </div>
  </Router>
)
export default BasicExample
```

## 状态管理 Redux

react 是一个 UI 库（a library for UI），因此单靠 react 不足以搭建一个完整的 web 应用。因此，我们要结合其它架构（包括第三方架构和自主设计的架构），才能搭建一个完整的 web 应用。因此，我们要结合其它架构（包括第三方架构和自主设计的架构），才能搭建一个完整的

redux 是为了解决更复杂的业务逻辑而设计的，如果是简单的业务逻辑，完全可以不使用 redux。若应用的特点符合以下的标准，可以考虑使用 redux：

* 用户的使用方式复杂
* 不同身份的用户有不同的使用方式（比如普通用户和管理员）
* 多个用户之间可以协作
* 与服务器大量交互，或者使用了WebSocket
* View要从多个来源获取数据

Redux 的设计思想很简单:

* Web 应用是一个状态机，视图与状态是一一对应的
* 所有的状态，保存在一个对象里面

#### Store

* Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。
* Redux 提供了 createStore 这个函数，用来生成 Store：
```
// createStore 函数接受另一个函数作为参数，返回新生成的 Store 对象
import { createStore } from 'redux';
const store = createStore(fn);
```

#### State
* Store 对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State 。
* 当前的 State ，可以通过 store.getState() 拿到：
```
import { createStore } from 'redux';
const store = createStore(fn);

const state = store.getState();
```
* Redux 规定，一个 State 对应一个 View。只要 State 相同，View 就相同。你知道 State，就知道 View 是什么样，反之亦然。

#### Action

* State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 是一个对象，其中的 type 属性是必须的，表示 Action 的名称。其他属性可以自由设置，不过建议遵从 FSA 规范：
```
// FSA（flux standard action）标准
let action = {
  type: 'toSetNumber',  // 必需，可以看作action的标识
  payload: 15，         // 可选，存放需要action携带的数据
  meta: '设置数量',      // 可选，描述action含义
  error: false          // 可选，出错时为 true
}
```
* 可以这样理解， Action 描述当前发生的事情。改变 State 的唯一方法，就是使用 Action，它会运送数据到 Store 。


#### Action Creator

* View 要发生多少种信息，就会有多少种 Action。如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函数就叫做 Action Creator。
```
const ADD_TODO = 'toSetNumber';

let addTodo = id => {
  type: ADD_TODO,  
  payload: id
}

const action = addTodo(15);
```
* addTodo 函数就是一个 Action Creator。

#### store.dispatch()

* store.dispatch() 是 View 发出 Action 的 唯一方法。
```
import { createStore } from 'redux';
const store = createStore(fn);

store.dispatch({
    type: ADD_TODO,
    payload: 15
});
```
* 上面代码中，store.dispatch 接受一个 Action 对象作为参数，将它发送出去，结合 Action Creator ，这段代码可以改写如下：
```
store.dispatch(addTodo(17));
```

#### Reducer

* Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。
* Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。
```
const reducer = function (state) {
  // ...
  return new_state;
}
```
* 整个应用的初始状态，可以作为 State 的默认值，下面是一个实际的例子：
```
const defaultState = 0;
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD':
            return state + action.payload;
        default:
            return state;
    }
}

const state = reducer(1, {
    type: 'ADD',
    payload: 2
});
```
* 上面代码中，reducer 函数收到名为 ADD 的 Action 以后，就返回一个新的 State，作为加法的计算结果，其他运算的逻辑（比如减法），也可以根据 Action 的不同来实现。
* 实际应用中，Reducer 函数不用像上面这样手动调用， store.dispatch 方法会触发 Reducer 的自动执行。为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入 createStore 方法。
```
import { createStore } from 'redux';
const store = createStore(reducer);
```
* 上面的代码中，createStore 接受 Reducer 作为参数，生成一个新的 Store，以后每当 store.dispatch 发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。
* 为什么这个函数叫做 Reducer 呢？因为它可以作为数组的 reduce 方法的参数。请看下面的例子，一系列 Action 对象按照顺序作为一个数组。
```
const actions = [
  { type: 'ADD', payload: 0 },
  { type: 'ADD', payload: 1 },
  { type: 'ADD', payload: 2}
];

const total = actions.reduce(reducer, 0);    // 0+1+2=3
```
* 上面代码中，数组 actions 表示依次有三个 Action，分别是加 0、加 1、加 2，数组的 reduce 方法接受 Reducer 函数作为参数，就可以直接得到最终的状态 3。

#### 纯函数

* Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。纯函数是函数式编程的概念，必须遵守以下一些约束。
* 不得改写参数
* 不能调用系统的 I/O 的 API
* 不能调用 Date.now() 或者 Math.random() 等不纯的方法，因为每次会得到不一样的结果
* 由于 Reducer 是纯函数，就可以保证同样的 State，必定得到同样的 View，但也正因为这一点，Reducer 函数里面不能改变 State，必须返回一个全新的对象，请参考下面的写法：
```
// State 是一个对象
function reducer(state, action) {
    return Object.assign({}, state, {thingToChange});
    // 或者
    return { ...state, ...newState };
}

// State 是一个数组
function reducer(state, action) {
    return [ ...state, newItem ];
}
```
* 最好把 State 对象设成只读。你没法改变它，要得到新的 State，唯一办法就是生成一个新对象，这样的好处是，任何时候，与某个 View 对应的 State 总是一个不变的对象。

#### store.subscribe()
* Store 允许使用 store.subscribe 方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。
```
import { createStore } from 'redux';
const store = createStore(reducer);

store.subscribe(listener);
```
* 显然，只要把 View 的更新函数（对于 React 项目，就是把组件的render 方法或 setState 方法）放入 listen，就会实现 View 的自动渲染。
* store.subscribe 方法返回一个函数，调用这个函数就可以解除监听。
```
let unsubscribe = store.subscribe(() =>
    console.log(store.getState())
);

unsubscribe();
```

#### Store 的实现
Store 提供了三个方法。

* store.getState()
* store.dispatch()
* store.subscribe()
```
import { createStore } from 'redux';
let { subscribe, dispatch, getState } = createStore(reducer);

// 等同于
let reducer = createStore(reducer);
let subscribe = reducer.subscribe;
let dispatch = reducer.dispatch;
let getState = reducer.getState;
```

createStore 方法还可以接受第二个参数，表示 State 的最初状态，这通常是服务器给出的。
```
let store = createStore(todoApp, window.STATE_FROM_SERVER);
```

上面代码中，window.STATE_FROM_SERVER 就是整个应用的状态初始值。注意，如果提供了这个参数，它就会覆盖 Reducer 函数的默认初始值。

下面是 createStore 方法的一个简单实现，可以了解一下 Store 是怎么生成的。
```
const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;
    
    const dispatch = (action) => {
        state = reducer(state, action);
        listenrs.forEach(listener => listener());
    };
    
    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(1 => 1 !== listener );
        }
    };

    dispatch({});

    return {getState, dispatch, subscribe};
}
```

#### 工作流程

* 用户发出 Action
```
store.dispatch(action)
```

* 然后，Store 自动调用 Reducer，并且传入两个参数：当前 State 和收到的 Action。 Reducer 会返回新的 State。
```
let nextState = todoApp(previousState, action);
```

* State 一旦有变化， Store 就会调用监听函数。
```
// 设置监听函数
store.subscribe(listener);
```

* listener 可以通过 store.getState() 得到当前状态。如果使用的是 React，这时可以触发重新渲染 View。
```
function listener() {
    let newState = store.getState();
    component.setState(newState);
}
```

#### 基本用法
```
import { createStore } from 'redux';

/**
 * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
 * 描述了 action 如何把 state 转变成下一个 state。
 *
 * state 的形式取决于你，可以是基本类型、数组、对象、
 * 甚至是 Immutable.js 生成的数据结构。惟一的要点是
 * 当 state 变化时需要返回全新的对象，而不是修改传入的参数。
 *
 * 下面例子使用 `switch` 语句和字符串来做判断，但你可以写帮助类(helper)
 * 根据不同的约定（如方法映射）来判断，只要适用你的项目即可。
 */
function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1;
  case 'DECREMENT':
    return state - 1;
  default:
    return state;
  }
}

// 创建 Redux store 来存放应用的状态。
// API 是 { subscribe, dispatch, getState }。
let store = createStore(counter);

// 可以手动订阅更新，也可以事件绑定到视图层。
store.subscribe(() =>
  console.log(store.getState())
);

// 改变内部 state 惟一方法是 dispatch 一个 action。
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
store.dispatch({ type: 'INCREMENT' });
// 1
store.dispatch({ type: 'INCREMENT' });
// 2
store.dispatch({ type: 'DECREMENT' });
// 1
```

#### 整合到项目中

index.js
```
// Redux
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render((
    <Provider store={store}>
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root')
);
```

store.js
```
import {createStore, combineReducers} from 'redux';

import * as home from './redux/home/reducer';

let store = createStore(
  combineReducers({...home})
);

export default store;
```

./redux/home/reducer.js
```
let defaultState = {
  orderSum: '', //金额
  name: '', //姓名
  phoneNo: '', //手机号
  imgpath: '', //图片地址
}
// 首页表单数据
export const formData = (state = defaultState , action = {}) => {
  switch(action.type){
    case 'SAVEFORMDATA':
      return {...state, ...{[action.datatype]: action.value}};
    case 'SAVEIMG':
      return {...state, ...{imgpath: action.path}};
    case 'CLEARDATA':
      return {...state, ...defaultState};
    default:
      return state;
  }
}
```

./redux/home/actions
```
// 保存表单数据
export const saveFormData = (value, datatype) => {
  return {
    type: 'SAVEFORMDATA',
    value,
    datatype,
  }
}

// 保存图片地址
export const saveImg = path => {
  return {
    type: 'SAVEIMG',
    path,
  }
}

// 保存图片地址
export const clearData = () => {
  return {
    type: 'CLEARDATA',
  }
}
```

## 封装Fetch请求数据

#### GET用法
```
Fetch(`/v2/api/dashboard?params=params`).then(res => {
  console.log(res)
}).catch(err => console.log(err))
```

#### POST用法
```
Fetch('/v2/api/login', {
    method: 'POST',
    body: {
      username: 'username',
      password: 'password'
    }
  }).then(res => {
    console.log(res)
  }).catch(err => console.log(err))
```

#### fetch.js
```
export default function request(url, options) {
  // 默认参数
  const defaultOptions = {
    // credentials
    // * omit: 从不发送cookies.
    // * same-origin: 只有当URL与响应脚本同源才发送cookies.
    // * include: 总是发送cookies, 即使来自跨域的请求
    credentials: 'include'
  }
  const newOptions = { ...defaultOptions, ...options }

  // 设置POST请求参数
  // * fetch不会自动转FormData
  // * new一个FormData，直接传给body
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    var formData = new FormData()
    for(let k in newOptions.body){  
      formData.append(k, newOptions.body[k])
    }
    newOptions.body = formData
  }

  // 发送请求
  return fetch(url, newOptions)
    .then((res) => {
      if (newOptions.method === 'DELETE' || res.status === 204) {
        return res.text()
      }
      return res.json()
    })
    .catch((err) => {
      console.log(err)
    })
}
```