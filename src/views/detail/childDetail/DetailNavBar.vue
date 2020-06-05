<template>
  <div class='detail-navbar'>
  	<nav-bar>
      <div slot='left' class='back' @click='goback'><img src='~assets/image/common/back.svg'/></div>
      <div slot='center' class='titles'>
      	<div  class='titles-item' 
      		:class='{active:index==currentItem}'
      		v-for='(item,index) in titles'
      		@click='itemactive(index)'>{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	export default{
		name:'DetailNavBar',
		components:{
			NavBar
		},
		
		data(){
			return{
				titles:['商品','参数','评论','推荐'],
				currentItem:0
			}
		},
		
		methods:{
			goback(){
				this.$router.back()
			},
			itemactive(index){
				this.currentItem=index;
				this.$emit('navbarclick',index)
			}
		}
	}
</script>

<style scoped>
	.back img{
		margin-top:10px;
	}
	.titles{
		display:flex;
	}
	.titles-item{
		flex:1;
		text-align: center;
		font-size:14px;
	}
	.active{
		color:var(--color-high-text)
	}
</style>