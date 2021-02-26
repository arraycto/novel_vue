import axios from 'axios'

export function request(config) {
	//创建axios实例
	const instance = axios.create({
		baseURL: 'http://39.107.68.86:8888/',
		timeout: 5000
	})
	
	//拦截请求
	instance.interceptors.request.use(res => {
		//为请求头添加token
		if(window.localStorage.getItem("token") != null){
			res.headers['token'] = window.localStorage.getItem("token")
		}
		return res
	},err => {
		
	})
	instance.interceptors.response.use(res => {

		return res.data
	},err => {

	})
	
	//真正的网络请求
	return instance(config)
}
