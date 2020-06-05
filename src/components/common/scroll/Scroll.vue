<template>
	<div ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default{
		name:'Scroll',
		props:{
			probeType:{
				type:Number,
				default:0
			},
			pullUpLoad:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return{
				scroll:null
			}
		},
		methods:{
			refresh(){
				this.scroll && this.scroll.refresh && this.scroll.refresh()
			},
			scrollTo(x,y,z=0){
				this.scroll&&this.scroll.scrollTo&&this.scroll.scrollTo(x,y,z)
			}
		},
		mounted(){
			this.scroll= new BScroll(this.$refs.wrapper,{
				click:true,
				probeType:this.probeType,
				pullUpLoad:this.pullUpLoad
			})
			this.scroll.on('scroll',(position)=>{
				this.$emit('scroll',position)
			})
			this.scroll.on('pullingUp',()=>{
				this.$emit('pullingUp')
			})
		}
	}
</script>

<style scoped>
	
</style>