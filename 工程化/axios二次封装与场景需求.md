# axios

[AXIOS官方文档](https://www.axios-http.cn/docs/intro) ：简单来说axios是基于ajax封装成promise的http请求库

#### 封装

​	封装的意义： 使得便于管理，特别是模块之间的管理；减少重复代码书写，~~便于摸鱼~~

​	简单版本大概思路（普遍形式都是两层的形式）：

1. 在第一层的封装中 受到导入 请求地址 请求方式 
2. 在第二层的封装中 在设置请求参数等

```js
/* 第一层封装 封装url method */
const makeAction = ({ 
	url,
    method = 'get',
}) => {
    /* 第二层封装 封装请求参数*/
    /* 在这里 我统一处理请求参数使用query 然后在get请求下 进行转换 */
    return （{ query }）=> {
        if（method === 'get'） {
			query = {
				params: query,
            }
        }
        /* 发送请求 可对请求的结果先做一步处理 */
        return axios({
            url,
            method,
            query,
        })
            .then(res => {
                return Promise.resolve(res)
            })
            .catch(err => {
                /* 能在这里对全局请求响应做一定的处理 */
                return Promise.reject(err)
            })
    }
}

// 模块化使用 例如使用vuex分成每一个模块单独的promise请求
// 需要写在vuex的actions形式（需要使用actions进行异步请求
action： {
	getData： makeAction（{
       url：'/getData/list',
       method: 'get'
    }）
}


// 使用方式 
getData（{
	query：{
		id: 'id',
        name: 'name',
    }
}）
```

**进阶版本的封装**（增加拦截器 请求默认前缀 请求头等

对请求的进一步封装

```js
const request = axios.create({
	timeout: 15000,
    base，URL： baseURL，
	headers: {
		/* 可与后端规定一定的请求token */
		Authorization： {
			token，
		}
	}
})

// 全局请求拦截
request.interceptors.request.use(config => {
	// 请求添加时间戳 能使得不使用缓存
	if(config.method === 'get') {
		config.params.t = Date.parse(new Date()) / 1000
	}
	return config
},(err => {
	return Promise.reject(err)
}))

// 全局响应拦截
request.interceptors.response.use((res) => {
	const { data } = res
	const { data, code } = data
	if(code === '401') {
		/* 重定位到login */
	}
	/* 一系列等等操作 */
	return Promise.resolve(data)
},(err => {
	return Promise.reject(err)
}))

export default request
```

```js
// 对前面进行一定修改
const makeAction = ({ 
	url,
    method = 'get',
}) => {
    /* 第二层封装 封装请求参数*/
    /* 在这里 我统一处理请求参数使用query 然后在get请求下 进行转换 */
    return （{ query }）=> {
        if（method === 'get'） {
			query = {
				params: query,
            }
        }
        /* 发送请求 可对请求的结果先做一步处理 */
++      return request({
            url,
            method,
            query,
        })
            .then(res => {
                return Promise.resolve(res)
            })
            .catch(err => {
                /* 能在这里对全局请求响应做一定的处理 */
                return Promise.reject(err)
            })
    }
}
```

### 场景题

#### 请求超时重传

思路： （主要有两种方式： 使用全局响应拦截器，或是在第一次拿到请求结果时候进行处理

**全局响应拦截器**

```js
// 全局拦截器思路
/**
	使用到变量 
		retry 超时重传的最大次数
		retryNum 超时重传的当前次数
		retryTime 超时重传需要等待的时间
**/
request.interceptors.response.use((res) => {
	const { data } = res
	const { data, code } = data
	/* 一系列等等操作 */
	return Promise.resolve(data)
},(err => {
    const { config } = err
    // 判断当前请求是不是需要进行超时重传
    if(!config || !config.retry) {
		return Promise.reject(err)
    }
    // 判断当前超时重传的次数是否大于规定的最大次数
    config.retryNum = config.retryNum || 0
    if(config.retryNum >= config.retry) {
		return Promise.reject(err)
    }
    config.retryNum++
    
    // 超时重传后设置等待时间
    const delayTime = new Promise((resolve, reject) => {
     	setTimeout(_ => {
			resolve()
        }, config.retryTime || 0)   
    })
    
    // 进行一次重传操作
    return delayTime.then(_ => {
		return axios(config)
    })
}))
```

```js
// 使用方式
// 1.全局处理 对所有请求都设置 （采用全局请求拦截器
request.interceptors.request.use(config => {
    config = {
        ...config,
        retry: 5, // 最大超时重传次数
        retryTime: 1000, // 超时重传后等待时间
    }
	return config
},(err => {
	return Promise.reject(err)
}))

// 2.单独请求处理(当然在这种基础上能进行一步封装形式 操作类似于上面
axios({
	url: '/getData',
    method: 'get',
 
    retry: 5, // 最大超时重传次数
    retryTime: 1000, // 超时重传后等待时间
})
```

**单独请求处理（能进行封装效果**

```js
// 单独请求思路
/**
	类似于防抖节流 形成闭包形式
**/
const getData = ({ url, method }) => {
	let retry = 0
	return axios({
		url: url,
		method: method,
	})	
		.then(res => {
			Promise.resolve(res)
		})
		.catch(err => {
        	// 判断是否需要进行重传
			if(retry < 5) {
				retry++
				callee(argument)
			}
			else {
				Promise.reject(err)
			}
		})
}
```

### 总结	

​	在前端来说，axios的使用还是比较频繁的，在封装时候要可以多尝试自己多去手写手写。当然在不同业务中，这有着不同处理和封装方式，毕竟适合自己的才是最好的。先只是给出一个简单模板！欢迎在这个基础进行需要和推进的