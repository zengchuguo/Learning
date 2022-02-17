# Proxy

用于修改某些操作的默认行为 在目标对象前设置一层“拦截器”

- `new Proxy（）`表示生成一个Proxy实例，target参数是拦截的目标对象，handler参数定义拦截行为
- 拦截方法
  - `get（）` 可继承
  - `set（）`param1该对象 param2属性 param3属性值
  - `apply`拦截函数调用、call和apply操作
  - `has（`）拦截HasProperty操作 典型操作in运算符
  - `construct（）`拦截new命令
  - `deleteProperty（`）拦截delete操作
  - `defineProperty（）`
  - `getOwnPropertyDescription（）`
  - `getPototypeOf（）`拦截获取原型对象
  - `isExtensible（）`判断是否可以扩展
  - `ownKeys（）`拦截对象自身属性的读取操作
  - `preventExtensions()`
  - `setPrototypeOf()`
  - `Proxy.revocable（）`返回一个可取消的Proxy实例
- this问题 会指向Proxy代理
- 作用编写Web服务的客户端

# Reflect

- 作用
  - 获取语言内部的方法
  - 修改某些Object方法的返回结果
  - 使Object操作都变成函数行为
  -  
- 静态方法
  - Reflect.get(target,name,receiver) target的name属性的读取
    - name属性如果部署读取函数 则读取函数的this绑定为receiver
  - Reflect.set(target,name,value,receiver) 
  - Reflect.has(targe，name)
  - Reflect.deleteProperty(target,name) 
  - Reflect.construct(target,arg）好比new 一个新对象
  - Reflect.getPrototypeOf(obj) 读取对象的\__proto__ 
  -  Reflect.setPrototypeOf(obj,newProto) 设置对象的\__proto__ 
  - Reflect.apply（function，Object，args）
  - Reflect.defineProperty（target，propertyKey，attributes） 为对象定义属性 
  - Reflect.getOwnPropertyDescription（target，popertyKey）
  - Reflect.isExtensible（target）
  - Reflect.PreventExtensions（target）
  - Reflect.ownKeys（target）返回对象的所有属性

