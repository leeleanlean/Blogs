## Jest结合Vue-test-utils使用方法

Jest，是由Facebook开发的单元测试框架，也是Vue推荐的测试运行器之一。

Vue-test-utils在Vue和Jest之前提供了一个桥梁，暴露出的接口可以更加方便、轻松的编写单元测试。

### 1. 挂载组件

通过 mount 方法来创建包裹器

```
import { mount } from 'vue-test-utils';
import App from '@/App';

const wrapper = mount(App)
```

mount会把子组件渲染到App中，可以通过shallow方法创建一个不渲染子组件的包裹器

```
import { mount, shallowMount } from 
const wrapper = shallowMount(App)

const wrapper = shallowMount(App)
```

### 2. 测试DOM

通过mount、shallow、find、findAll方法都可以返回一个包裹器对象

find和findAll方法可以用选择器作为参数，返回所有匹配的DOM节点或者Vue组件

#### 2.1 CSS选择器
* 标签选择器 (div | h1 | p)
* 类选择器 (.class .box)
* id选择器 (#id | #box)
* 伪类选择器 (div:first-child)
* 属性选择器 ([attr] | [attr="name"])
* 符合选择器（div > #box > .title | div + .box)

#### 2.2 Vue组件
Vue 组件也是有效的选择器

#### 2.3 查找选项对
name：根据组件的name选择
```
wrapper.find({ name: 'my-button' })
```

ref：根据$ref选择
```
wrapper.find({ ref: 'myButton' })
```

#### 2.4 验证DOM
```
// 使用Vue组件选择器
expect(wrapper.is(Test1)).toBe(true);
// 使用CSS选择器
expect(wrapper.is('.outer')).toBe(true);
// 使用CSS选择器
expect(wrapper.contains('p')).toBe(true)

// exists()：断言 Wrapper 或 WrapperArray 是否存在。
it('不存在img', () = > {
  expect(wrapper.findAll('img').exists()).toBeFalsy()
});

// isEmpty()：断言 Wrapper 并不包含子节点。
it('MyButton组件不为空', () = > {
  expect(wrapper.find(MyButton).isEmpty()).toBeFalsy()
});

// attributes()：返回 Wrapper DOM 节点的特性对象
// classes()：返回 Wrapper DOM 节点的 class 组成的数组
it('MyButton组件有my-class类', () = > {
  expect(wrapper.find(MyButton).attributes().class).toContain('my-button');
  expect(wrapper.find(MyButton).classes()).toContain('my-button');
})
```

### 3. 测试样式

#### 3.1 inline style
```
// hasStyle：判断是否有对应的内联样式
it('MyButton组件有my-class类', () = > {
  expect(wrapper.find(MyButton).hasStyle('padding-top', '10')).toBeTruthy()
})
```

#### 3.2 CSS

属于E2E测试，有专门的E2E测试框架nightwatch等

### 4. 测试Props

#### 4.1 传值方法
```
// 1. propsData
const wrapper = shallowMount(Index, {
  propsData: {
    name: 'lee'
  }
})

// 2. setProps
const wrapper = shallowMount(Index)
wrapper.setProps({ name: 'lee' })
```

#### 4.1 向子组件传值
```
// 递给Test1组件的messages一个['bye']数组，来验证是否存在：
beforeEach(() = > {
  wrapper = mount(Test1, {
    propsData: {
      messages: ['bye']
    }
  });
});

// props：返回 Wrapper vm 的 props 对象。
it('接收到了bye作为Props', () = > {
  expect(wrapper.props().messages).toContain('bye')
});
```

### 5. 测试自定义事件

#### 5.1 目的
* 测试自定义事件是否会被触发
* 测试被触发的后续行为是否符合预期

#### 5.2 用法
```
/*
 * 测试是否触发
 *
*/
it('calls increment when click on button', () => {
  // 创建mock函数
  const mockFn = jest.fn();
  // 设置 Wrapper vm 的方法并强制更新。
  wrapper.setMethods({
    increment: mockFn
  });
  // 触发按钮的点击事件
  wrapper.find('button').trigger('click');
  expect(mockFn).toBeCalled();
  expect(mockFn).toHaveBeenCalledTimes(1)

  // 再次触发按钮的点击事件
  wrapper.find('button').trigger('click');
  expect(mockFn1).toHaveBeenCalledTimes(2);
  expect(mockFn1).toHaveBeenCalledWith(2);
})

/*
 * 测试是否符合预期
 *
*/
// $emit 触发自定义事件
describe('验证addCounter是否被触发', () = > {
  wrapper = mount(Test1);
  it('addCounter Fn should be called', () = > {
    const mockFn = jest.fn();
    wrapper.setMethods({
      'addCounter': mockFn
    });
    wrapper.find(MyButton).vm.$emit('add', 100);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
  wrapper.destroy()
});
```

### 6. 测试监听器
```
it('returns the string in normal order if reversed property is not true', () => {
  wrapper.setProps({needReverse: false});
  wrapper.vm.inputValue = 'ok';
  expect(wrapper.vm.outputValue).toBe('ok')
});

it('returns the string in normal order if reversed property is not provided', () => {
  wrapper.vm.inputValue = 'ok';
  expect(wrapper.vm.outputValue).toBe('ok')
});

it('returns the string in reversed order if reversed property is true', () => {
  wrapper.setProps({needReverse: true});
  wrapper.vm.inputValue = 'ok';
  expect(wrapper.vm.outputValue).toBe('ko')
})
```

### 7. 测试监听器
为了测试，测试前将console的log方法用jest的spyOn方法mock掉，测试结束后通过mockClear方法将其重置，避免无关状态的引入。
```
describe('Test watch', () = > {
  let spy;
  beforeEach(() = > {
    wrapper = shallow(Test2);
    spy = jest.spyOn(console, 'log')
  });
  afterEach(() = > {
    wrapper.destroy();
    spy.mockClear()
  });
}

it('is called with the new value in other cases', (done) = > {
  wrapper.vm.inputValue = 'ok';
  wrapper.vm.$nextTick(() = > {
    expect(spy).toBeCalled();
    done()
  })
});
```

### 8. 测试方法
测试的核心之一就是测试方法的行为是否符合预期，在测试时要避免一切的依赖，将所有的依赖都mock掉。

例如：输入一个问题后，点击按钮后，使用axios发送HTTP请求，获取答案

* 不需要实际调用axios.get方法，需要将它mock掉
* 需要测试是否调用了axios方法（但是并不实际触发）并且返回了一个Promise对象
* 返回的Promise对象执行了回调函数，设置用户名和头像

要mock掉整个axios模块，使用的方法是jest.mock

```
jest.mock('axios', () => ({
  get: jest.fn()
}));
const mockData = {
  data: {
    answer: 'mock_yes',
    image: 'mock.png'
  }
};
import { shallow } from 'vue-test-utils';
import Test3 from '@/components/Test3';
import axios from 'axios';

describe('Test for Test3 Component', () => {
  let wrapper;

  beforeEach(() => {
    axios.get.mockClear();
    wrapper = shallow(Test3);
  });

  afterEach(() = > {
    wrapper.destroy()
  });

  // 点击按钮后调用了 getAnswer 方法
  it('getAnswer Fn should be called', () => {
    const mockFn = jest.fn();
    wrapper.setMethods({getAnswer: mockFn});
    wrapper.find('button').trigger('click');
    expect(mockFn).toBeCalled();
  });

  // 点击按钮后调用了axios.get方法
  it('axios.get Fn should be called', () => {
    const URL = 'https://yesno.wtf/api';
    wrapper.find('button').trigger('click');
    expect(axios.get).toBeCalledWith(URL)
  });
});
```

### 9. 测试插槽
### 10. 测试命名插槽