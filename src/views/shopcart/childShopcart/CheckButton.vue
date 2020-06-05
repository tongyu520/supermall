<template>
	<div class='button'>
		<div class='buttoncheck' :class='{checked:ischecked}'></div>
	</div>
</template>

<script>
	export default{
		name:'CheckButton',
		props:{
			ischecked:Boolean
		}
	}
</script>

<style scoped>
	.button{
		width:40px;
		
	}
	.buttoncheck{
		border-radius:50%;
		border:1px solid rgba(155,155,155,.4);
		width:20px;
		height:20px;
		margin:0 auto;
		position:relative;
		top:calc(50% - 10px);
	}
	 .checked{
		background:url("~assets/image/cart/yes.svg") no-repeat ;
		border-style:none;
		background-size: 20px auto;
		background-color: red;
		}
</style>