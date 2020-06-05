<template>
	<div id='home' class='chome'>
		<nav-bar class="home-nav"><div slot='center'>购物街</div></nav-bar>
		<tab-control :titles="['流行', '新款', '精选']"
                   @tabclick="tabclick"
                   ref="tabControl1"
                   class="tab-control"
                   v-if='isShowBackTop' />
		<scroll class="scontent"
            ref="scroll"
			:probe-type='3'
			@scroll='contentScroll'
			:pull-up-load='true'
			@pullingUp='loadMore'>
		<home-swiper :banners='banners'
			@swiperLoad='swiperLoad'
			/>
		<recommend-view :recommends='recommends'/>
		<feature-view/>
		<tab-control :titles="['流行', '新款', '精选']" 
		    @tabclick="tabclick"
		    ref="tabControl2"/>
		<good-list :goods='showGoods'/>
	    </scroll>
	    <!--<back-top v-show='isShowBackTop'
	    	@click.native='goBack'/>-->
	    <transition name="back-top">
      		<back-top v-show="isShowTop" @click.native="backClick" />
   		</transition>
	</div>
</template>

<script>
	import NavBar from "components/common/navbar/NavBar"
	import Scroll from 'components/common/scroll/Scroll'
	import TabControl from "components/content/tabcontrol/TabControl"
	import GoodList from 'components/content/goodlist/GoodList'
    import BackTop from 'components/content/backTop/BackTop'
	import HomeSwiper from './childcomps/HomeSwiper'
	import RecommendView from './childcomps/RecommendView'
	import FeatureView from './childcomps/FeatureView'
	
	import { getHomeMultidata,getHomeGoods } from "network/home"
	import { backTopMinxin,itemListenerMinxin } from "common/mixin.js";
	export default{
		name:'Home',
		components:{
			NavBar,
			HomeSwiper,
			RecommendView,
			FeatureView,
			TabControl,
			GoodList,
			Scroll
		},
		data(){
			return {
				banners:[],
				recommends:[],
				currentType:'pop',
				goods:{
					'pop':{page:0,list:[]},
					'new':{page:0,list:[]},
					'sell':{page:0,list:[]},
				},
				isShowBackTop:false,
				taboffset:0,
				positiony:0,
				imglistener:{}
			}
		},
		created(){
			this.getHomeMultidata()
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
			
			
		},
		//使用混入对象
		mixins: [backTopMinxin,itemListenerMinxin],
		mounted(){
			
			//监听goodsitem中的图片加载完成
			this.$bus.$on('imgload',this.bcFunc())
		},
		
		activated(){
			//在vue中使用scrollTo加入this.$nextTick()
			this.$nextTick(
				()=>{this.$refs.scroll.scroll.scrollTo(0,this.positiony,0)}
				)
			this.$refs.scroll.refresh()
			
		},
		deactivated(){
			this.positiony=this.$refs.scroll.scroll.y;
			
			//取消当其他界面加载goodlistitem的图片时，使home界面的goodlistitam图片刷新
			this.$bus.$off('imgload',this.bcFunc())
		},
		computed: {
          showGoods() {
            return this.goods[this.currentType].list
          }
       },
		methods:{
			swiperLoad(){
    		this.taboffset=this.$refs.tabControl2.$el.offsetTop
    		console.log(this.taboffset)
    	},
			getHomeMultidata() {
          getHomeMultidata().then(res => {
          // this.result = res;
          this.banners = res.data.data.banner.list
          this.recommends = res.data.data.recommend.list
              })
           },
           //当滚动到底的时候触发loadMore又请求第二页的图片
           getHomeGoods(type){
           	let page = this.goods[type].page+1
           	getHomeGoods(type,page).then(res=>{
           		this.goods[type].list.push(...res.data.data.list)
           		this.goods[type].page+=1
           		this.$refs.scroll.scroll.finishPullUp()
           	})
           },
           tabclick(index){
           	 switch(index){
           	 	case 0:
           	 	this.currentType='pop'
           	 	break;
           	 	case 1:
           	 	this.currentType='new'
           	 	break;
           	 	case 2:
           	 	this.currentType='sell'
           	 	break;
           	 	
           	 };
           	 this.$refs.tabControl1.curitem = index;
           	 this.$refs.tabControl2.curitem = index;
           	 console.log( this.$refs.tabControl1.curitem)
           	 console.log( this.$refs.tabControl2.curitem)
           	 
           },
           contentScroll(position){
           	 this.isShowTop = (-position.y) > 1000
           	 this.isShowBackTop=(-position.y)>this.taboffset
           },
           loadMore(){
           	this.getHomeGoods(this.currentType)
           }
	 	}
	}
</script>

<style scoped>
	#home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
	
	.scontent {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control{
  	position:absolute;
  	top:44px;
  	right:0px;
  	left:0px;
  	z-index: 10;
  	background-color: white;
  }
</style>