<template>
	<div class='detail-shop'>
		<div class='shop'>
			<img :src='shop.shopLogo' alt="" />
			<span>{{shop.name}}</span>
		</div>
		<div class='des'>
			<div class='left'>
				<div class='num'>
					<div>{{ sellValue() }}万</div>
                	<div style="font-size: 12px;">总销量</div>
				</div>
				<div class='hani'>
					<div>{{shop.cGoods}}</div>
					<div style="font-size: 12px;">全部宝贝</div>
				</div>
			</div>
			<div class='right'>
				<table>
					<tr v-for='(item,index) in shop.score' :key="index">
						<td>{{item.name}}</td>
						<td :style="{color:item.isBetter?'red':'green'}">{{item.score}}</td>
						<td style="color: white;"
              				:style="{ backgroundColor: item.isBetter ? 'red': 'green' }"
            				>{{item.isBetter?'高':'低'}}</td>
					</tr>
				</table>
			</div>
		</div>
		<div class='gohome'>
		       进店逛逛
		</div>
	</div>
</template>

<script>
	export default{
		name:'DetailShopInfo',
		props:{
			shop:{}
		},
		methods:{
			sellValue(){
				return Math.round(this.shop.cSells/1000)/10
			}
		}
	}
</script>

<style scoped>
	.detail-shop{
		border-top:2px solid #ccc;
		border-bottom: 2px solid #ccc;
	}
	.shop{
		padding-bottom: 20px;
	}
	.shop img{
		width:40px;
		height:40px;
		border-radius:50%;
		border:1px solid #ccc;
		position:relative;
		top:15px;
		margin:0 10px;
	}
	.des{
		display: flex;
			
	}
	.right ,.left{
		flex:1;
		text-align: center;
		/*justify-content: space-around;*/
		font-weight: bold;
	}
	.left{
		display: flex;
		justify-content: space-around;
		border-right:1px solid #ccc;
		align-items: center;
	}
	table{
		font-size: 14px;
		margin:0 auto;
		border-spacing: 0.42rem;
	}
	.gohome{
		width:100px;
		height:30px;
		border-radius: 10px;
		margin:10px auto;
		background-color: rgba(44,44,44,.1);
		text-align: center;
		line-height: 30px;
		
	}
</style>