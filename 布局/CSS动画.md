### **animation（动画）** 

​	用于设置动画属性，他是一个简写的属性，包含6个属性  

| 值                        | 描述                                                     |
| ------------------------- | -------------------------------------------------------- |
| animation-name            | 指定要绑定到选择器的关键帧的名称   **@keyframes**        |
| animation-duration        | 规动画指定需要多少秒或毫秒完成                           |
| animation-timing-function | 设置动画将如何完成一个周期 同transition的timing-function |
| animation-delay           | 设置动画在启动前的延迟间隔 默认 0                        |
| animation-iteration-count | 定义动画的播放次数 infinite \|Number 默认 1              |
| animation-direction       | 指定是否应该轮流反向播放动画 默认normal                  |
| animation-fill-mode       | 规定当动画不播放时 要应用到元素的样式 默认none           |
| animation-play-state      | 指定动画是否正在运行或已暂停 默人 running                |

**animation-direction** （播放方向）

normal：默认值，正向播放。

reverse：反向播放。

alternate：偶数次反向播放、奇数次正向播放。

alternate-reverse：奇数次反向播放、偶数次正向播放。

**animation-fill-mode：**

- none默认值。
- forwards，表示，动画完成后，元素状态保持为最后一帧的状态。
- backwards，表示，有动画延迟时，动画开始前，元素状态保持为第一帧的状态。
- both，表示上述二者效果都有

**animation-play-state** （播放状态）

语法： `animation-play-state: running | paused`

规定动画正在运行还是暂停，即控制动画播放状态。

running：默认值，动画正常播放。

paused：动画暂停



### **transition（过渡）** 

​	transition: property duration timing-function delay;

​	用于设置元素的样式过度 定义CSS的某个属性上的变化情况

| 值                         | 描述                                                         |
| -------------------------- | ------------------------------------------------------------ |
| transition-property        | 指定CSS属性的name，transition效果: 大小,位置,扭曲等          |
| transition-duration        | 规定完成过渡效果需要花费的时间（以秒或毫秒计）。 默认值是 0，意味着不会有效果。 |
| transition-timing-function | 指定transition效果的转速曲线                                 |
| transition-delay           | 定义transition效果开始的时候                                 |

linear 规定以**相同速度**开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）。  

ease 规定**慢速开始**，然后变快，然后**慢速结束**的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。  

ease-in 规定以**慢速开始**的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。  

ease-out 规定以**慢速结束**的过渡效果（等于 cubic-bezier(0,0,0.58,1)）。  

ease-in-out 规定以**慢速开始和结束**的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）。  

cubic-bezier(n,n,n,n) 在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。



### **transform（变形）** 

​	用于对元素上的变换操作

​	例如`rotate`(旋转 deg)

​			`scale`(缩放)默认为1,

​			`skew`(扭曲 deg),

​			`translate`(移动 px)

​			`matrix`(矩阵变换)