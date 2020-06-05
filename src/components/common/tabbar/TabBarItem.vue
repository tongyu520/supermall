<template>
 	<div class="tabbar-item" @click="handclick">
		<div v-if='!active'><slot name="unactive"></slot></div>
		<div v-else><slot name="active"></slot></div>
		<div :style='activeStyle'><slot name="text"></slot></div>
	</div>
</template>

<script>
	export default {
		name: 'TabBarItem',
		props:{
			path:String
		},
		data(){
			return{
				
			}
		},
		methods:{
			handclick(){
				this.$router.replace(this.path)
			}
		},
		computed:{
			active(){
				return this.$route.path.indexOf(this.path) !== -1
			},
			activeStyle(){
				return  this.active ? {color: '#ff5577'} : {}
			}
		}
	}
</script>

<style scoped>
    .tabbar-item{
    	flex:1;
    	height:49px;
    	text-align: center;
    	font-size: 14px;
    }
    .tabbar-item img{
    	width: 24px;
        height: 24px;
        margin-top: 3px;
        vertical-align: middle;
        margin-bottom: 2px;
    }
</style>