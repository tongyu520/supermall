<template>
	<div class='shopcart'>
		<nav-bar class='navbar'><div slot='center' >购物车({{$store.state.cartList.length}})</div></nav-bar>
		<scroll ref='scroll'
				class='content'>
			<cart-list></cart-list>
		</scroll>
		<calculation/>
	</div>
</template>

<script>
	import scroll from 'components/common/scroll/Scroll'
	import NavBar from 'components/common/navbar/NavBar'
	import CartList from './childShopcart/CartList'
	import Calculation from './childShopcart/Calculation'
	export default{
		name:'Shopcart',
		components:{
			NavBar,
			scroll,
			CartList,
			Calculation
		},
		activated(){
			//在cart活跃的时候获取数据，能正确滚动
			this.$refs.scroll.refresh()
		}
	}
</script>

<style scoped>
	.shopcart{
		height:100vh;
		
	}
	.navbar{
		color:#fff;
		background-color: var(--color-tint);
		font-weight: 700;
	}
	.content{
		height:calc(100% - 44px - 49px - 40px);
		overflow: hidden;
	}
</style>