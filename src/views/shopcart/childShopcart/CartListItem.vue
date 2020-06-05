<template>
	<div class='cartlistitem'>
		<check-button :ischecked='cartlist.checked'
						@click.native='buttonclick'></check-button>
		<div class='image' @click='godetail'>
			<img :src='cartlist.img'>
		</div>
		<div class='des'>
			<p class='title'>{{cartlist.title}}</p>
			<p class='desc'>{{cartlist.desc}}</p>
			<span class='price'>￥{{cartlist.price}}</span>
			<span class='count'>x{{cartlist.count}}</span>
		</div>
	</div>
</template>

<script>
	import CheckButton from './CheckButton'
	export default{
		components:{
			CheckButton
		},
		props:{
			cartlist:{}
		},
		methods:{
			buttonclick(){
				this.cartlist.checked=!this.cartlist.checked
			},
			godetail(){
				this.$router.push('/detail/'+this.cartlist.iid)
			}
		}
	}
</script>

<style scoped>
	.cartlistitem{
		display: flex;
		border-bottom: 1px solid #ccc;
		padding: 10px 10px 10px 0;
		width:100%;
		height:120px;
		box-sizing: border-box;
	}
	.image {
		width:70px;
		height:100px;
		
		margin-right:10px;
	}
	.image img{
		width:100%;
		height:100%;
		border-radius: 5%;
	}
	.des{
		width:calc(100% - 70px - 10px - 10px - 40px);
		height:100%;
		position:relative;
	}
	p{
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		width: 100%;
		display: inline-block;
	}
	.desc{
		font-size:12px;
		margin-top:15px;
	}
	.price{
		color:#ff5577;
		position:absolute;
		bottom: 0px;
		left:0px;
	}
	.count{
		position:absolute;
		bottom: 0px;
		right:0px;
		
	}
</style>