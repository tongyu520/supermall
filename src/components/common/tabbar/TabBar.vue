<template>
	<div class="tabbar">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name:"TabBar"
	}
</script>

<style scoped>
    .tabbar{
    	display: flex;
    	
    	background-color:#f6f6f6;
    	
    	
    	position:fixed;
    	right:0px;
    	left:0px;
    	bottom:0px;
    	
    	box-shadow:0 -1px 1px rgba(100,100,100,.2);
    	
    }
</style>