<template>
	<div class='cartlist'>
		<div v-for='item in $store.state.cartList'>
			<cart-list-item :cartlist='item'></cart-list-item>
		</div>
	</div>
</template>

<script>
	import CartListItem from './CartListItem'
	export default{
		components:{
			CartListItem
		}
		
	}
</script>

<style>
</style>