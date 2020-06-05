<template>
	<div class='calcu'>
		<div class='left'>
			<check-button class='button' :ischecked='isall' @click.native='allclick'></check-button>
			<span calss='all'>全选</span>
		</div>
		<div class='center'>
			<span class='heji'>合计</span>
			<span class='price'>￥{{total}}</span>
			
		</div>
		<div id="right" @click='money'>结算({{checknum}})</div>
	</div>
</template>

<script>
	import CheckButton from './CheckButton'
	export default{
		name:'Calculation',
		components:{
			 CheckButton
		},
		computed:{
			isall(){
				if(this.$store.state.cartList.length==0){
					return false;
				}
				else{
					return	this.$store.state.cartList.every(value=>value.checked===true)
				}
			},
			checknum(){
				return this.$store.state.cartList.filter(item=>item.checked===true).length
			},
			total(){
				return this.$store.state.cartList.filter(item=>item.checked===true).reduce(
        (pre, curr) => pre + curr.count * curr.price,
        0
      );
			}
		},
		methods:{
			allclick(){
				/* if (this.isall == true) {
        this.$store.state.cartList.forEach(item => item.checked = false);
      } else {
        this.$store.state.cartList.forEach(item => item.checked = true);
      } */
      let checkFlag = !this.isall;
      this.$store.state.cartList.forEach(item => (item.checked = checkFlag));
			},
			money(){
				if(this.checknum===0){
					this.$toast.show('请选择商品')
				}else{
					this.$toast.show('买它！')
				}
			}
		}
	}
</script>

<style scoped>
   .calcu{
   	height:40px;
   	display: flex;
   	position: relative;
   	background-color: #CCCCCC;
   }
   .left{
   	width:90px;
   	
   }
   .left span{
   	position:relative;
   	top:-9.5px;
   	left:35px;
   }
   .left .button{
   		position:relative;
   		top:10px;
   }
   .center{
   	flex:1;
   	line-height: 40px;
   }
   .price{
   	color:#ff5577;
   }
   
   #right{
   	width:90px;
   	background-color: red;
   	color:white;
   	line-height: 40px;
   	text-align: center;
   }
</style>