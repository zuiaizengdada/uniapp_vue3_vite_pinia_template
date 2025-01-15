// #ifdef VUE3
 import lottie from 'lottie-web'
// #endif
// #ifdef VUE2
 import lottie from '../../../node_modules/lottie-web'
// #endif
 import getfile  from './getfile.js'
 export default {
	 data() {
		return {
			player: null,
			pdata:{}
		}
	 },
	 methods: {
		 async render(val,oldValue,vm) {
			 this.$nextTick(async()=>{
				 let data,player;
				 // console.log(val);
				 if(val){
					data =val
					this.pdata=data
				 }else{
					data=this.pdata
				 }
				 // console.log(data); 				
				 if(this.player){
					this.player.destroy()
				 }
				 player = lottie.loadAnimation({
					container:document.getElementById(data.myCanvasId), // the dom element
					renderer: data.renderer,
					loop: data.loop,
					autoplay: data.autoPlay,
					// 动画json的本地数据
					animationData: data.data, 
					// 动画json的网络路径
					path: data.src?await getfile(data.src):''
				 }) 
				 player.addEventListener('data_ready',(val)=>{ //当动画的所有部分都已加载时
					 vm.callMethod('receiveRenderData',{name:'dataReady',val})
				 })
				 player.addEventListener('data_failed',(val)=>{ //当部分动画无法加载时
					 vm.callMethod('receiveRenderData',{name:'dataFailed',val})
				 })
				 player.onComplete=(val)=>{ //动画播放完成触发
					//console.log('动画播放完成触发',val);
					vm.callMethod('receiveRenderData',{name:'Complete',val})
				 }
				 player.onLoopComplete=(val)=>{ //当前循环播放完成触发
					//console.log('当前循环播放完成触发',val);
					vm.callMethod('receiveRenderData',{name:'LoopComplete',val})
				 }
				 if(data.isOnChange){
					player.onEnterFrame=(val)=>{ //播放动画的时候触发
						//console.log('播放动画的时候触发',val);
						vm.callMethod('receiveRenderData',{name:'EnterFrame',val})
					} 
				 }
				 player.onSegmentStart=(val)=>{ //开始播放一个动画片段的时候触发
					//console.log('开始播放一个动画片段的时候触发',val);
					vm.callMethod('receiveRenderData',{name:'SegmentStart',val})
				 }
				 this.player=player
			 })
		 },
		 async callPlayer(val){
			if(!val.name)return;
			let {name, args} = val
			// console.log(name, args);
			if(Array.isArray(args)){
				this.player[name](...args)
			}else{
				this.player[name](args)
			}
		}
		 
	 },
 }