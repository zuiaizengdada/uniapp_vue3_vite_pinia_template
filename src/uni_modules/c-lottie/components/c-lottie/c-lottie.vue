<template>
	<!-- #ifdef H5||APP-PLUS -->
	<view class="c-lottie" :style="{width,height}" :lottieData="lottieData" :change:lottieData="lottie.render" :fun='fun'
		:change:fun='lottie.callPlayer'>
		<div :id='myCanvasId'></div>
	</view>
	<!-- #endif -->
	<!-- #ifdef MP -->
	<view class="c-lottie" :style="{width,height}">
		<canvas class="canvas" :id="myCanvasId" type="2d"></canvas>
	</view>
	<!-- #endif -->
</template>
<script>
	/**
	 * c-lottie Lottie组件
	 * @property {String} canvasId 画布id
	 * @property {String} width 图像宽度 默认750rpx 单位rpx/px
	 * @property {String} height 图像高度 默认750rpx 单位rpx/px
	 * @property {String} src Lottie文件地址 小程序只支持网络地址
	 * @property {String} data Lottie文件data
	 * @property {Boolean} autoPlay 是否自动播放 默认true
	 * @property {Boolean} loop 是否循环播放 默认值为 true
	 * @property {String} renderer 渲染模式 默认值为canvas 可选值 svg|canvas 小程序不支持
	 * @property {Boolean} isOnChange 是否开启播放进度监听 默认false false时不触发EnterFrame
	 * @event {Function()} Complete 监听动画播放完成
	 * @event {Function()} LoopComplete 监听当前循环播放完成
	 * @event {Function()} EnterFrame 监听动画播放进度
	 * @event {Function()} SegmentStart 监听开始播放一个动画片段
	 * @event {Function()} dataReady 当动画的所有部分都已加载时触发
	 * @event {Function()} dataFailed 当部分动画无法加载时触发
	 * 组件内方法统一使用 call(funName, args) 调用player实例方法 详见文档
	 * */
	import uuid from './js/uuid.js'
	// #ifdef MP&VUE3
	import lottie from 'lottie-miniprogram'
	// #endif
	// #ifdef MP&VUE2
	import lottie from '../../node_modules/lottie-miniprogram'
	// #endif
	export default {
		props: {
			canvasId: {
				type: String
			},
			width: {
				type: String,
				default: '750rpx'
			},
			height: {
				type: String,
				default: '750rpx'
			},
			src: {
				type: String,
			},
			data: {
				type: String,
			},
			autoPlay: { //是否自动播放
				type: Boolean,
				default: true
			},
			loop: { //是否循环播放 默认值为 true
				type: Boolean,
				default: true
			},
			renderer: { //渲染模式 默认值为canvas 可选值 svg
				type: String,
				default: 'canvas',
			},
			isOnChange: {
				type: Boolean,
				default: false
			}
		},
		emits: ['Complete', 'LoopComplete', 'EnterFrame', 'SegmentStart','dataReady','dataFailed'],
		data() {
			return {
				fun: {}
			}
		},
		computed: {
			myCanvasId() {
				if (!this.canvasId) {
					return 'c' + uuid(18)
				} else {
					return this.canvasId
				}
			},
			lottieData() {
				return {
					myCanvasId: this.myCanvasId,
					width: this.width,
					height: this.height,
					src: this.src,
					data: this.data,
					autoPlay: this.autoPlay,
					loop: this.loop,
					renderer: this.renderer,
					isOnChange: this.isOnChange
				}
			}
		},
		watch: {
			lottieData() {
				// #ifdef MP
				this.render()
				// #endif
			}
		},
		methods: {
			call(name, args) {
				this.fun = {name,args}
				// #ifdef MP
				this.callPlayer(this.fun)
				// #endif
			},
			// #ifdef MP
			getContext() {
				return new Promise((resolve) => {
					const {
						pixelRatio
					} = uni.getSystemInfoSync()
					uni.createSelectorQuery()
						.in(this)
						.select(`#${this.myCanvasId}`)
						.fields({
							node: true,
							size: true
						})
						.exec(res => {
							const {
								width,
								height
							} = res[0]
							const canvas = res[0].node
							resolve({
								canvas,
								width,
								height,
								pixelRatio
							})
						})
				})
			},
			async render() {
				if (this.player) {
					// console.log(player);
					// call('stop')
					this.call('destroy', this.player)
				}
				let {
					canvas,
					width,
					height,
					pixelRatio
				} = await this.getContext()
				this.myCanvas = canvas
				this.context = canvas.getContext('2d')
				//避免出现锯齿问题
				this.context.scale(pixelRatio, pixelRatio)
				canvas.width = width * pixelRatio
				canvas.height = height * pixelRatio
				lottie.setup(this.myCanvas)
				this.player = lottie.loadAnimation({
					loop: this.loop,
					autoplay: this.autoPlay,
					// 动画json的本地数据
					animationData: this.data,
					//远程动画。一定要把json格式的文件放到服务器中，并且注意域名是合法的
					path: this.src,
					rendererSettings: {
						context:this.context,
					},
				})
				this.player.addEventListener('data_ready',(val)=>{ //当动画的所有部分都已加载时
					this.$emit('dataReady', val)
				})
				this.player.addEventListener('data_failed',(val)=>{ //当部分动画无法加载时
					this.$emit('dataFailed', val)
				})
				this.player.onComplete = (val) => { //动画播放完成触发
					// console.log('动画播放完成触发',val);
					this.$emit('Complete', val)
				}
				this.player.onLoopComplete = (val) => { //当前循环播放完成触发
					// console.log('当前循环播放完成触发',val);
					this.$emit('LoopComplete', val)
				}
				if (this.isOnChange) {
					this.player.onEnterFrame = (val) => { //播放动画的时候触发
						// console.log('播放动画的时候触发',val);
						this.$emit('EnterFrame', val)
					}
				}
				this.player.onSegmentStart = (val) => { //开始播放一个动画片段的时候触发
					// console.log('开始播放一个动画片段的时候触发',val);
					this.$emit('SegmentStart', val)
				}

			},
			callPlayer(val) {
				if (!val.name) return;
				let {name,args} = val
				// console.log(name, args);
				if (Array.isArray(args)) {
					this.player[name](...args)
				} else {
					this.player[name](args)
				}
			},
			// #endif
			// #ifndef MP
			receiveRenderData(val) {
				// console.log(val);
				this.$emit(val.name, val.val)
			}
			// #endif
		},
		mounted() {
			// #ifdef MP
			this.render()
			// #endif
		},
		beforeDestroy() {
			// 组件卸载销毁实例
			this.call('destroy')
		}

	}
</script>

<!-- #ifndef MP -->
	
	<!-- #ifdef VUE3 -->
	<script lang="renderjs" src='./js/render.js' module='lottie'></script>
	<!-- #endif -->
	
	<!-- #ifdef VUE2 -->
	<script lang="renderjs" module='lottie'>
		import lottieRender from "./js/render.js"
		export default {
			mixins:[lottieRender],
		}
	</script>
	<!-- #endif -->
<!-- #endif -->


<style lang="scss" scoped>
	.c-lottie {
		// width: v-bind(width);
		// height: v-bind(height);

		/* #ifndef MP */
		div {
			width: 100%;
			height: 100%;
		}

		/* #endif */

		.canvas {
			width: 100%;
			height: 100%;
		}
	}
</style>