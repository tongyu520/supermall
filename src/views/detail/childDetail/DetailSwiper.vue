<template>
  <div class='swiper'>
    <swiper class='dswiper'>
      <swiper-item v-for='item in topImages'>
      	<img :src="item"/>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
	import {Swiper,SwiperItem} from 'components/common/swiper'
	export default{
		name:'DetailSwiper',
		props:{
			topImages:{
				type:Array,
				default(){
					return []
				}
			}
		},
		components:{
			Swiper,
			SwiperItem
		}
	}
</script>

<style scoped>
	.dswiper{
		height:300px;
		overflow: hidden;
	}
	.dswiper img{
		height:300px;
	}
</style>