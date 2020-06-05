export default{
	addcount(state,payload){
		payload.count+=1
	},
	addlist(state,payload){
		state.cartList.push(payload)
	}
}
