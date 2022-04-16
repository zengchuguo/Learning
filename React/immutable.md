### 背景

JavaScript对象一般是可变的（因为使用的引赋值 当一个项目很大的时候 为了保护原来的类型 需要进行深浅拷贝带来的成本太高 

### Immutable

immutable Data 一个数据一旦创建时候 就不能再进行修改 对该对象的任何修改（添加删除等操作）都会返回一个新的immutable对象 

### react-immutable

redux中利用combineReducers来合并reducer并初始化state，redux自带的combineReducers只支持state是原生js形式的，所以需要使用redux-immutable提供的combineReducers来替换原来的方法

### 使用

```js
import { fromJS } from 'react-immutable'

const defaluteState {
    return fromJS({
		name:'chuguo'
    })
}

/* 获取数据 */
defaluteState.get('name')
/* 修改数据 */
defaluteState.set('name','chuguo2')

defaluteState.marge({
    name:'chuguo2'
})
```

