<template>
	<div class="recommendview">
		<div class="recommend" v-for='item in recommends'>
			<a :href='item.link'>
				<img :src='item.image'  alt=''/>
				<div>{{item.title}}</div>
			</a>
		</div>
	</div>
</template>

<script>
	export default{
		name:'RecommendView',
		props:{
			recommends:{
				type:Array,
				default() {
                    return []
                   }
			}
		}
	}
</script>

<style scoped>
	.recommendview{
		display: flex;
		width: 100%;
		text-align: center;
		font-size:12px;
		padding:10px 0 10px;
		border-bottom: 10px solid #eee;
	}
	.recommend{
		flex:1;
		
	}
	.recommend img{
		width:70px;
		height:70px;
		margin-bottom: 10px;
	}
</style>