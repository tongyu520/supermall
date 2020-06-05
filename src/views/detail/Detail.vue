<template>
	<div id="detail">
		<detail-nav-bar class='detail-nav'
						@navbarclick='navbarclick' ref='nav' />
		<scroll class='content'
			    ref='scroll'
			    :probeType='3'
			     @scroll="contentScroll">
			<detail-swiper :topImages='topImages'/>
			<detail-goods  :goods='goods'/>
			<detail-shop-info :shop='shop'/>
			<detail-goods-info :detailInfo='detailInfo' @loadImgEvent='loadImgEvent'/>
			<detail-params :paramInfo='paramInfo' ref='params'/>
			<detail-comment :comment='comment' ref='comment'/>
			<good-list :goods='recommend' ref='goodlist'/>
		</scroll>
		<transition name="back-top">
      		<back-top v-show="isShowTop" @click.native="backClick" />
   		</transition>
   		<detail-bottom-bar  @addEvent="addToCart"/>
	</div>
</template>

<script>
	import DetailNavBar from './childDetail/DetailNavBar'
	import DetailSwiper from './childDetail/DetailSwiper'
	import DetailGoods from './childDetail/DetailGoods'
	import DetailShopInfo from './childDetail/DetailShopInfo'
	import DetailGoodsInfo from './childDetail/DetailGoodsInfo'
	import DetailParams from './childDetail/DetailParams'
	import DetailComment from './childDetail/DetailComment'
	import DetailBottomBar from './childDetail/DetailBottomBar'
	import {getDetail,Goods,GoodsParam, getDetailRecommend} from 'network/detail'
	import Scroll from 'components/common/scroll/Scroll'
	import GoodList from 'components/content/goodlist/GoodList'
	import { backTopMinxin } from "common/mixin.js";
	export default{
		name:'Detail',
		components:{
			DetailNavBar,
			DetailSwiper,
			DetailGoods,
			DetailShopInfo,
			Scroll,
			DetailGoodsInfo,
			DetailParams,
			DetailComment,
			GoodList,
			DetailBottomBar
		},
		data(){
			return{
				topImages:[],
				iid:null,
				goods:{},
				shop:{},
				detailInfo:{},
				paramInfo:{},
				comment:{},
				recommend:[],
				navbardistance:[],
				bcFuncTheme:null,
				detailIndex: 0
			}
		},
		//使用混入对象
		mixins: [backTopMinxin],
		mounted(){
			
			//监听goodslist中的图片加载完成
			this.$bus.$on('imgload',()=>{
				this.$refs.scroll.refresh()
			});
			 this.bcFuncTheme =()=>{
			 	this.navbardistance=[]
     	    	this.navbardistance.push(0)
     	    	this.navbardistance.push(this.$refs.params.$el.offsetTop)
     	    	this.navbardistance.push(this.$refs.comment.$el.offsetTop)
     	    	this.navbardistance.push(this.$refs.goodlist.$el.offsetTop)
     	    	
     	    }
			 
		},
		//销毁imglistenter事件
		destroyed(){
			this.$bus.$off('imgload',()=>{
				this.$refs.scroll.refresh()
			})
		},
		
		methods:{
			 contentScroll(pos){
           		 this.isShowTop = (-pos.y) > 1000;
           		
           		 for (let i = 0; i < this.navbardistance.length; i++) {
        		if (
         			 (i===this.navbardistance.length-1 && -pos.y >= this.navbardistance[i] )||this.detailIndex != i &&
        			 ( -pos.y >= this.navbardistance[i] &&
         			 -pos.y < this.navbardistance[i + 1])
       		 ) {
            				console.log(i);
         			 this.detailIndex = i;
         			 this.$refs.nav.currentItem = i;
        		  break;
        }
      }
           		 
			 },
			 //点击navbaritem跳转到相应的位置，添加进距离
			 navbarclick(index){
			 	this.$refs.scroll.scroll.scrollTo(0,-this.navbardistance[index],0)
			 	
			 },
			 //在图片加载完成后获取offsetTop
			 loadImgEvent(){
			 	
			 	this.$refs.scroll.refresh();
			 	this.bcFuncTheme()
			 	
			 },
			 addToCart(){
			 	const obj={
			 		 iid: this.iid,
       				 desc: this.goods.desc,
       				 price: this.goods.lowNowPrice,
       				 title: this.goods.title,
       				 img: this.topImages[0]
			 	};
			 	this.$store.dispatch('ChangCart',obj).then((res)=>{
			 		this.$toast.show("添加成功，在购物车等亲！")
			 	}).catch(()=>{this.$toast.show("购买数量+1")})
			 }
           		 
		},
		created(){
			this.iid=this.$route.params.iid
			getDetail(this.iid).then(res=>{
				const getdata = res.data.result
				this.topImages=getdata.itemInfo.topImages
				this.shop=getdata.shopInfo
				
				this.goods = new Goods(getdata.itemInfo,getdata.columns,getdata.shopInfo.services)
  				
  				//获取宝贝的详细信息
       			 this.detailInfo = getdata.detailInfo;			
       			 //获取参数信息
       			  this.paramInfo = new GoodsParam(
         			 getdata.itemParams.info,
         			 getdata.itemParams.rule
        			);
        			
        			//获取评论
       			 if (getdata.rate.cRate != 0) {
          				this.comment = getdata.rate.list[0];
       			 }
       			
       			})
			//获取detail里面的推荐
     	    getDetailRecommend().then(res=>{
     	    	
     	    	this.recommend = res.data.data.list;
     	    	
     	    })
      
      
    
		}
		
	}
</script>

<style scoped>
   #detail{
   	position:relative;
   	z-index: 10;
   	background-color: white;
   	height:100vh;
   }
   .detail-nav{
   	position: relative;
   	z-index: 10;
   	background-color: white;
   }
   .content{
   	height:calc(100% - 44px);
   	/*使scroll里面的东西的offsettop以scroll为offsetParent*/
   	position: relative;
   }
</style>