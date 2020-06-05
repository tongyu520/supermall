export default{
	ChangCart(context,payload){
		return new Promise((resolve,reject)=>{
			//查找vuex里面有没有这个商品
			let oldCart=context.state.cartList.find(item=>item.iid==payload.iid)
			if(oldCart){
				//有增加count
				context.commit('addcount',oldCart);
				reject()
			}else{
				//设置这个新商品的count为1，且默认选中
				payload.checked = true;
       		    payload.count = 1;
				context.commit('addlist',payload)
				resolve()
			}
		})
	}
}
