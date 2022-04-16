### 创建组件

函数式组件 （首字母大写 （无状态组件）性能更好 没有实例（本质没有class

class 关键字组件 （有状态组件）

本质区别有无state属性

### JSX原理

构建DOM结构

具体属性 tag attrs children 

React.createElement本质原理

### 组件样式

styled-components

classnames

#### 默认属性的设置

defaultProps

#### 函数方法触发

tips：需要箭头函数触发？

```jsx
/* 可行写法 */ 
/* render里面使用箭头函数来传递数据 */
/* 不传递数据的话 直接写方法名 方法使用箭头函数执行 */
<button onClick={() => this.test1(1)}>test1</button>

/* 不能直接触发事件 */
<button onClick={this.test1(1)}>test1</button>
```

### 状态组件

**创建状态**：

直接写state

继承式constructor（）的写法 特别注意super（）

**设置状态**

setState（设置的状态只能通过此方法修改

​	参数是对象

​	参数是方法 多了两个参数 prevState（上一次的状态信息） props（传递进来的数据信息）

​	参数数异步的处理

setState（）异步操作 第一个输出结果会传入到第二个之中

### ref实例

### 生命周期

挂载

- constructor
- getDerivedStateFromProps
- render
- **componentDidMount**

更新

- getDerivedStateFromProps
- shouldComponentUpdate
- 
- render
- componentDidUpdate

卸载

- componentWillUnmount



### HOC 高级组件作为一个参数 返回一个新组件

本质上函数进行包装的效果

#### setState理解

当前的修改不会立即触发render

每次的状态上的更新都会触发render

### redux

```js
import { createStore } from 'redux'
import reducer from './reducer'

export default store = createStore(reducer)

/* 使用 action作为具体需要触发*/
export default (state = defaultState, action) => {
    return state
}
```

### react-redux(本质上还是redux的使用 不过限制了使用的范围（同时简便具体的使用方法

本质上 能简便不需要独立的传入个个参数

父向子注入`Provider` 子和父连接后就能直接使用（具体连接

`connect(mapStateToProps,mapDispachToProps)(组件)`

mapStateToProps（将**state**（常数变量）**映射**到UI组件**参数props**中

```js
const mapStateToProps = (state,porps) =>{
	name: state.name
}
```

mapDispachToProps（事件触发action 电梯store.dispatch

```javascript
const mapDispachToProps = (dispatch) =>{
    
}
```

拆分的写法action 和 reducer

拆分actiontype 控制action的类型

拆分reducer 使用combineReducers



immutable能直接在原state上进行修改

redux-immutable统一格式



对于异步处理

eg.获取列表在本身的钩子函数处理  在使用action触发事件（更新新的state



rudex--thunk中间件的处理

### Hook 加强版的函数 具备类的生命周期等

**useState** 参数一个数组 第一个参数是state数 第二个是修改该state的数

该方法时替换 并不是更新效果（需要保存之前的值

```js
let [arr,setarr] = useState('arr的初始值')

/* 修改 */
f(){
	setarr(arr + 1)
}

const [counts, setCounts] = useState({
        num1: 0,
        num2: 0
    });
       
    <button onClick={() => setCounts({ ...counts, num1: counts.num1 + 1})}>num1+1</button>
            
    );
```

**useContext** 数据共享 跨组件数据通信

React.createContext();创建一个TestContext对象
TestContext.Provider包裹子组件
数据放在<TestContext.Provider value={value}>的value中
子组件中通过useContext(TestContext)获取值

缺点：

​	只要共享数据发生改变 子组件都会重新渲染 （避免不必要的渲染 使用react.memo

**useReducer** 在当前组件创建一个redux使用（没有中间件和异步处理

```js
import {useReducer} from 'react';

const initialState = { pageNum: 1, pageSize: 15 };

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const Page = () => {
  /* pager状态 dispatch事件触发（需要传入一个action */
  const [pager, dispatch] = useReducer(reducer, initialState);

  return (
    <Table
      pageNum={pager.pageNum}
      pageSize={pager.pageSize}
      onGoNext={() => dispatch({ type: 'next' })}
      onPageSizeChange={(size) => dispatch({ type: 'changeSize', payload: size })}
    />
  );
};
```

**useEffect**（副作用 取代生命周期 监听依赖上的变化

等价于生命周期componentDidMount 和 componentDidUpdate（只要有一个触发 就能触发事件

```js
/* 语法：useEffect(回调函数，[依赖值]) */
useEffect(() => {
    console.log('useEffect触发了')
}, [count1]);
/*
 注意需要清理副作用
 */
```

**useCallback** / **useMemo**性能优化 缓存和计算结果

```js
// useCallback(回调函数，[依赖值])
const handleClick = useCallback(()=> {
    // 做一些事
}, [value]);
```



动画

react-transition-group



