<template>
	<div class='tabcontrol'>
		<div v-for='(item,index) in titles'
			 :key="index"
			 class='tabitem' 
			 @click=itemclick(index)
			 :class='{active:index==curitem}'>
			<span>{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default{
		name:'TabControl',
		props:{
			titles:{
				type:Array,
				default(){
					return []
				}
			}
		},
		data(){
			return{
				curitem:0
			}
		},
		methods:{
			itemclick(index){
				this.curitem=index
				this.$emit("tabclick",index)
			}
		}
	}
</script>

<style scoped>
	.tabcontrol{
		display:flex;
		width:100%;
		height: 40px;
		line-height: 40px;
		text-align: center;
	}
	.tabitem{
		flex:1
	}
	span{
		padding:0 5px;
	}
	.active span{
		color:#ff8198;
		border-bottom: 2px solid #ff8198;
	}
	
</style>