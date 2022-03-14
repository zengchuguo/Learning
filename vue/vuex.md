# Vuex（适用于组件通信

导出  在main.js中导入其中

### state：（状态）

使用：this.$store.state.\__name__

建议：

​	以上操作放置在计算属性中computed：{	}

```javascript
import { mapState } from 'vuex'

computed：{
	...mapState(['__name__'])
}

解构的改名
...mapState({ aliasName: 'name' }),  // 赋别名的话，这里接收对象，而不是数组
```

### Getter

修改输出出来的信息

```javascript
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        name: '张三',
    },
    // 在store对象中增加getters属性
    getters: {
        getMessage(state) { // 获取修饰后的name，第一个参数state为必要参数，必须写在形参上
            return `hello${state.name}`;
        }
    },
});

export default store;

使用
export default {
    mounted() {
        // 注意不是$store.state了，而是$store.getters
        console.log(this.$store.state.name);
        console.log(this.$store.getters.getMessage);
    }
}

解构使用 同理取别名
import { mapGetter } from 'vuex'

...mapGetters(['getMessage'])

```

### Mutation

修改state的value

```javascript
mutations: { // 增加nutations属性
	函数名（state,param）{
    	
    }
},

使用
this.$store.commit('__函数名__',param)

对象参数传入数据 Vuex设置
mutations: { // 增加nutations属性
	函数名（state,payload）{
    	state.name = payload.name
    }
},

this.$store.commit('__函数名__',{ name:'chuguo' })


解构使用 同理取别名
import { mapMutation } from 'vuex'

 methods: {   // 注意，mapMutations是解构到methods里面的，而不是计算属性了
        ...mapMutations(['function']),
  },
```

### Actions

同理Mutation的异步操作

```javascript
actions:{
	function(state){
		异步操作
        state.commit('function in mutation',param)
	}
}

使用
this.$store.dispatch('function')

解构使用和命名
import { mapActions } from 'vuex'

...mapActions(['function']),   // 就像这样，解构到methods中
   OR
async mounted() {
        await this.setNum({ number: 123 });  // 直接这样调用即可
},
```

### 持久化

​	Vuex保存的数据在页面刷新的时候 会全部重新计算一次

解决方案：

​	可使用LocalStore SessionStore存储结果

```javascript
1.npm install --save vuex-persistedstate

2.import createPersistedState from "vuex-persistedstate"

export default createStore({
  state: {
  },
  mutations: {
  }
  actions: {
  },
  getters: {
  }
  plugins: [createPersistedState({
    storage：windoe.sesssionStorage, //默认在LocalStorage
  	keys:'Vuex',
    return {
		...state
    }
  )]
})
```

