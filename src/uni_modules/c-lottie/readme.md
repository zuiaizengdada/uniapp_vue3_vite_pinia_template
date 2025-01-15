# c-lottie

### 
- c-lottie lottie动画

### c-design交流群号：330647926

### 示例预览

[https://cloud.vuedata.wang/cdesign/#/pages/lottie/lottie](https://cloud.vuedata.wang/cdesign/#/pages/lottie/lottie)
####
![微信小程序预览](https://mp-eeab6da6-80cd-4e80-844a-66b2a7203834.cdn.bspapp.com/cloudstorage/dca3227b-0028-47f6-b576-cb89def67177.png?x-oss-process=image/resize,m_fixed,w_240)

### 一、使用示例
#### vue2/vue3
```html
<template>
	<view>
		<c-lottie
			ref="cLottieRef"
			:src='src'
			@LoopComplete="onLoopComplete" 
			width="750rpx" height='750rpx' :loop="true"></c-lottie>
		<view class="content">
			<view>切换图像</view>
			<view class="btnBox">
				<button @click="src='https://mp-eeab6da6-80cd-4e80-844a-66b2a7203834.cdn.bspapp.com/cloudstorage/7b538fb7-d2d5-4524-bf21-6c20e3b5ce6f.json'" size="mini">热销</button>
				<button @click="src='https://mp-eeab6da6-80cd-4e80-844a-66b2a7203834.cdn.bspapp.com/cloudstorage/c42b5f05-06b9-43e7-8436-c1029eee610a.json'" size="mini">字母</button>
			</view>
			<view>播放暂停</view>
			<view class="btnBox">
				<button @click="this.$refs.cLottieRef.call('play')" size="mini">播放</button>
				<button @click="this.$refs.cLottieRef.call('setDirection',-1)" size="mini">反向播放</button>
				<button @click="this.$refs.cLottieRef.call('pause')" size="mini">暂停播放</button>
				<button @click="this.$refs.cLottieRef.call('stop')" size="mini">停止播放</button>
			</view>
			<view>播放速度</view>
			<view class="btnBox">
				<button @click="this.$refs.cLottieRef.call('setSpeed',1)" size="mini">播放速度1x</button>
				<button @click="this.$refs.cLottieRef.call('setSpeed',2)" size="mini">播放速度2x</button>
			</view>
			<view>播放其它设置</view>
			<view class="btnBox">
				<button @click="this.$refs.cLottieRef.call('goToAndStop',[2000,false])" size="mini">跳转到2s并暂停</button>
				<button @click="this.$refs.cLottieRef.call('goToAndPlay',[2000,false])" size="mini">跳转到2s并播放</button>
			</view>
			<view class="btnBox">
				<button @click="this.$refs.cLottieRef.call('goToAndStop',[2,true])" size="mini">跳转到第2帧并暂停</button>
				<button @click="this.$refs.cLottieRef.call('goToAndPlay',[2,true])" size="mini">跳转到第2帧并播放</button>
			</view>
			<view class="btnBox">
				<button @click="this.$refs.cLottieRef.call('playSegments',[[10,20],false])" size="mini">播放完之前的片段，播放10-20帧</button>
			</view>
			<view class="btnBox">
				<button @click="this.$refs.cLottieRef.call('playSegments',[[[0,5],[10,18]],true])" size="mini">直接播放0-5帧和10-18帧</button>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'https://mp-eeab6da6-80cd-4e80-844a-66b2a7203834.cdn.bspapp.com/cloudstorage/7b538fb7-d2d5-4524-bf21-6c20e3b5ce6f.json'
			}
		},
		methods: {
			onLoopComplete(val) {
				// console.log('当前循环播放完成',val);
			}
		},
	}
</script>

<style lang="scss">
	.page{
		width: 100vw;
		overflow-x: hidden;
	}
	.content{
		padding: 20rpx;
		font-size: 28rpx;
	}
	.btnBox{
		width: 100%;
		display: flex;align-items: center;
		margin-top: 20rpx;
		margin-bottom: 30rpx;
	}
</style>
```
#### vue3
```html
<template>
	<view>
		<c-lottie
			ref="cLottieRef"
			:src='src'
			@LoopComplete="onLoopComplete" 
			width="750rpx" height='750rpx' :loop="true"></c-lottie>
		<view class="content">
			<view>切换图像</view>
			<view class="btnBox">
				<button @click="src='https://mp-eeab6da6-80cd-4e80-844a-66b2a7203834.cdn.bspapp.com/cloudstorage/7b538fb7-d2d5-4524-bf21-6c20e3b5ce6f.json'" size="mini">热销</button>
				<button @click="src='https://mp-eeab6da6-80cd-4e80-844a-66b2a7203834.cdn.bspapp.com/cloudstorage/c42b5f05-06b9-43e7-8436-c1029eee610a.json'" size="mini">字母</button>
			</view>
			<view>播放暂停</view>
			<view class="btnBox">
				<button @click="cLottieRef.call('play')" size="mini">播放</button>
				<button @click="cLottieRef.call('setDirection',-1)" size="mini">反向播放</button>
				<button @click="cLottieRef.call('pause')" size="mini">暂停播放</button>
				<button @click="cLottieRef.call('stop')" size="mini">停止播放</button>
			</view>
			<view>播放速度</view>
			<view class="btnBox">
				<button @click="cLottieRef.call('setSpeed',1)" size="mini">播放速度1x</button>
				<button @click="cLottieRef.call('setSpeed',2)" size="mini">播放速度2x</button>
			</view>
			<view>播放其它设置</view>
			<view class="btnBox">
				<button @click="cLottieRef.call('goToAndStop',[2000,false])" size="mini">跳转到2s并暂停</button>
				<button @click="cLottieRef.call('goToAndPlay',[2000,false])" size="mini">跳转到2s并播放</button>
			</view>
			<view class="btnBox">
				<button @click="cLottieRef.call('goToAndStop',[2,true])" size="mini">跳转到第2帧并暂停</button>
				<button @click="cLottieRef.call('goToAndPlay',[2,true])" size="mini">跳转到第2帧并播放</button>
			</view>
			<view class="btnBox">
				<button @click="cLottieRef.call('playSegments',[[10,20],false])" size="mini">播放完之前的片段，播放10-20帧</button>
			</view>
			<view class="btnBox">
				<button @click="cLottieRef.call('playSegments',[[[0,5],[10,18]],true])" size="mini">直接播放0-5帧和10-18帧</button>
			</view>
			
		</view>
	</view>
</template>

<script setup>
	import { ref } from "vue";
	const cLottieRef = ref()
	let src=ref('https://mp-eeab6da6-80cd-4e80-844a-66b2a7203834.cdn.bspapp.com/cloudstorage/7b538fb7-d2d5-4524-bf21-6c20e3b5ce6f.json')
	const onLoopComplete=(val)=>{
		// console.log('当前循环播放完成',val);
	}
</script>

<style lang="scss">
	.page{
		width: 100vw;
		overflow-x: hidden;
	}
	.content{
		padding: 20rpx;
		font-size: 28rpx;
	}
	.btnBox{
		width: 100%;
		display: flex;align-items: center;
		margin-top: 20rpx;
		margin-bottom: 30rpx;
	}
</style>
```

### 二、Props

| 字段				| 类型		| 必填	| 默认值				| 描述																																							|
| -----------		| --------	| ----	| ----------------------| -------------------------------	
| canvasId	| String	| 否|  'c'+uuid(18)	| canvasId 画布id 可不填此项			|
| width		| String	| 否|  750rpx		| 图像宽度 单位rpx/px					|
| height	| String	| 否|  750rpx		| 图像高度 单位rpx/px					|
| src		| String	| 是|				| Lottie文件地址 小程序只支持网络地址	|
| data		| String	| 否|				| Lottie文件data						|
| autoPlay	| Boolean	| 否|  true			| 是否自动播放							|
| loop		| Boolean	| 否|  true			| 是否循环播放							|
| renderer	| String	| 否|  canvas		| 可选值 svg,canvas 小程序不支持		|
| isOnChange| Boolean	| 否|  false		|false时不触发 EnterFrame监听			|

### 三、Event
| 字段			| 描述						|
| ---------		| ------------------------	|
| Complete		| 监听动画播放完成			|
| LoopComplete	| 监听当前循环播放完成		|
| EnterFrame	| 监听动画播放进度			|
| SegmentStart	| 监听开始播放一个动画片段	|
| dataReady		| 加载完成事件				|
| dataFailed	| 加载失败事件				|

### 四、Methods

#### 组件内方法统一使用 call(funName, args) 调用

```js
	this.$refs.cLottieRef.call('play')
	//or
	const cLottieRef = ref()
	cLottieRef.value.call('play')
```

#### funName args入参为array类型 单个参数可传入string类型 

* play(); - 播放
* stop(); - 停止播放
* pause(); - 暂停播放
* setSpeed(speed); -播放速度 speed: 1 为正常速度.
* goToAndStop(value, isFrame); -暂停到某一时间点或帧 value:数值  isFrame:定义第一个参数是基于时间的值还是基于帧的值（默认为false)
* goToAndPlay(value, isFrame); -从某一时间点或帧开始播放 value:数值  isFrame:定义第一个参数是基于时间的值还是基于帧的值（默认为false)
* setDirection(direction); - direction: 1 为正向, -1 为反向.
* playSegments(segments,forceFlag) - 播放选定的片段 segments:array.可以包含2个数值，它们将用作动画的第一帧和最后一帧。或者可以包含一个数组序列，每个数组带有2个数值。 forceFlag:boolean.如果设置为false，它将等待当前段完成。如果为真，则它将立即更新值。
* setSubframe(useSubFrames); - useSubFrames: 如果为false，它将遵循原始的AE fps。如果为true，它将更新每个请求动画帧的中间值。默认值为true。
* destroy(); - 销毁实例
* ...

### 方法与lottie-web 方法保持一致 [详情可参考](http://airbnb.io/lottie/#/web?id=usage)
### 微信小程序端会提示’发现 Lottie 动态创建 canvas 组件，但小程序不支持动态创建组件，接下来可能会出现异常‘ 组件内部已进行处理忽略即可
### 暂不支持nvue nvue请使用性能更好的原生插件
### 注意：由于Hbuilderx上传插件无法上传node_odules依赖 导入插件后进入插件目录/uni_modules/c-lottie   使用npm i 进行依赖安装 