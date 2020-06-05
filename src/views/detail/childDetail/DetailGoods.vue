<template>
  <div class='deatilgoods'>
  	<div class='title'>{{goods.title}}</div>
  	<div class='info'>
  		<span class='lowprice'>￥{{goods.lowNowPrice}}</span>
  		<del>
  			<span class='nowprice'>{{goods.oldPrice}}</span>
  		</del>
  		<span :style="{ backgroundColor: goods.discountBgColor }" v-if='goods.discountDesc' class="discount"
        >{{ goods.discountDesc }}
        </span>
  	</div>
  	<div class='info-server'>
  		<span>{{goods.columns[0]}}</span>
  		<span>{{goods.columns[1]}}</span>
  		<span id='last'>{{goods.columns[2]}}</span>
  	</div>
  	 <div class="services">
      <div
        v-for="(item, index) in goods.services"
        v-if="itemShow(item)"
        :key="index"
      >
        <img :src="item.icon" alt="" />
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
	export default{
		name:'DetailGoods',
		props:{
			goods:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		computed: {
    itemShow() {
      return function(item) {
        return item.icon && item.name !== "72小时发货";
      };
    }
  }
	}
</script>

<style scoped>
	.title{
		font-size:14px;
		padding-top: 10px;
		font-weight: bold;
	}
	.info{
		margin:10px 0px;
	}
	.lowprice{
		color:#ff5577;
		font-size:18px;
		padding-right: 10px;
	}
	.nowprice{
		font-size:12px;
		padding-right: 10px;
	}
	.discount{
		border-radius: 10px;
		padding:5px;
		font-size: 12px;
		color:white;
		position:relative;
		top:-5px;
	}
	.info-server{
		font-size:12px;
		display: flex;
		justify-content: space-around;
		padding-bottom: 10px;
		border-bottom: 1px #ccc solid;
		
	}
	.info-server span{
		flex:1;
		color: gray;
	}
	.services{
		display:flex;
		justify-content: space-around;
		align-items: center;
	}
	.services div{
		flex:1;
		font-size:12px;
		padding:20px 0px;
		font-weight: bold;
		
	}
	.services img{
		width:12px;
		height:12px;
		position:relative;
		top:1px;
		
	}
</style>