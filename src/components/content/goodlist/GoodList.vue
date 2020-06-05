<template>
	<div class='goodlist'>
		<good-list-item v-for="item in goods" :goods-item="item"/>
	</div>
</template>

<script>
	import GoodListItem from './GoodListItem'
	export default{
		name:'GoodList',
		props:{
			goods:{
				type:Array,
				default(){
					return []
				}
			}
		},
		components:{
			GoodListItem
		}
		
	}
</script>

<style scoped>
	.goodlist{
		display:flex;
		flex-wrap: wrap;
		justify-content:space-around
	}
</style>