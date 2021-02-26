import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const homepage = {
	state: {
		imgnum: 1,
		putaway: true,
		//消息提示
		badge: false,
		userName: "请登录",
		userImg: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
		defaultNovelImg:'http://ww1.sinaimg.cn/large/006QQPIfly1gnwfk9zdlpj30zk1annpd.jpg',
		searchData: [],
		commentActionData: [] //用户点赞数据
	},
	mutations: {
		replace(state){
			if(state.imgnum < 5){
				state.imgnum++;
			}else{
				state.imgnum = 1;
			}
		},
		putawayImg(state,n){
			state.putaway = n
		},
		updataUserName(state){
			if(window.localStorage.getItem("userName") == null){
				state.userName = "请登录"
			}else{
				state.userName = window.localStorage.getItem("userName")
			}
		},
		updataImg(state){
			if(window.localStorage.getItem("userImg") == null){
				state.userImg = "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
			}else{
				state.userImg = "http://39.107.68.86:8888/" + window.localStorage.getItem("userImg") 
			}
		},
		changeSearchData(state,n){
			state.searchData = n
		},
		updataCommentActionData(state,n){
			state.commentActionData = n;
		}
	},
	actions: {
	},
	getters: {
		
	}
}


export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
		a: homepage
  }
})
