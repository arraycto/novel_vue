<template>
	<div class="message11 animated zoomInRight">
		<div class="loginForm">	
			<div class="login_tit">
					<h4>
							<img src="../../assets/img-pc/login2.png" alt="">
					</h4>
			</div>
			
			<label :style="inputStyle4">
					<input type="text" maxlength="20" minlength="1" placeholder="请输入用户名" v-model="account" @blur="checkAccount0(account)" @focus="checkAccount00" />
			</label>
			<span class="error4">{{error4}}</span>
			<label :style="inputStyle5">
					<input type="password" placeholder="请输入密码" v-model="password" @blur="checkPassword0(password)" @focus="checkPassword00"/>
			</label>
		</div>
		<span class="error5">{{error5}}</span>
		<button class="loginBtn1" @click="linkToHome" v-preventReClick>
				登录
		</button>
		<button class="loginBtn2" @click="linkToRegister" v-preventReClick>
				注册
		</button>
		
	</div>
</template>

<script>
	import {request} from '../../network/request.js'
	export default {
		name: 'loginpage',
		data() {
				return {
						account: "",
						password: "",
						error4: "",
						error5: "",
						inputErrorStyle1: {border: '1px solid #F00000'},
						inputStyle4:{},
						inputStyle5:{},
						receptionCheck4: false,
						receptionCheck5: false,
						backstageCheck1: true
				}
		},
		methods: {
			checkAccount0(n) {
				let l = n.replace(/\s*/g,"")
				if(l == ""){
					this.inputStyle4 = this.inputErrorStyle1
					this.error4 = "用户名不能为空"
					this.receptionCheck4 = false
				}else if(n.indexOf(" ") != -1){//indexOf() 方法返回值是 指定的字符串，在指定字符串中首次出现的位置。 如果没有找到，返回值为-1
					this.inputStyle4 = this.inputErrorStyle1
					this.error4 = "用户名不能包含空格"
					this.receptionCheck4 = false
				}else{
					this.receptionCheck4 = true
				}
			},
			checkAccount00(){
				this.inputStyle4 = {}
				this.error4 = ""
			},
			checkPassword0(n) {
				let reg=/^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$/g;
				if(!reg.test(n)){
					this.inputStyle5 = this.inputErrorStyle1
					this.receptionCheck5 = false
					this.error5 = "密码格式错误！"
				}else{
					this.receptionCheck5 = true
				}
			},
			checkPassword00() {
				this.inputStyle5 = {}
				this.error5 = ""
			},
			linkToHome() {
				if(this.receptionCheck4&&this.receptionCheck5&&this.backstageCheck1){
					request({
						url: '/login',
						method: 'post',
						data: {
							userName: this.account,
							password: this.password
						}
					}).then(res => {
						if(res.status == 200){
							window.localStorage.setItem("token",res.token)
							window.localStorage.setItem("userName",this.account)
							if(res.url != ""){
								window.localStorage.setItem("userImg",res.url)
								this.$store.commit('updataImg')
							}
							this.$store.commit('updataUserName')
							this.$router.push('/home')
							this.$notify({
								title: '登录成功',
								message: '欢迎来到亿观的扫书站',
								type: 'success',
								offset: 100
							})
						}else if(res.status == 400){
							this.$notify.error({
								title: '登录失败',
								message: '用户名不存在',
								offset: 100
							})
						}else{
							this.$notify.error({
								title: '登录失败',
								message: '密码错误',
								offset: 100
							})
						}
					}).catch( err => {
						console.log(err)
					})
					
				}else{
					this.$notify.error({
						title: '登录失败',
						message: '账号或者密码错误',
						offset: 100
					})
				}
			},
			linkToRegister(){
				this.$router.push('/register')
			}
		}
	}
</script>

<style>
	@media screen and (min-width : 768px) {
		.message11 {
			position: fixed;
			left: 50%;
			top:22%;
			width: 350px;
			height: 550px;
			margin-left: -175px;
			line-height: 1.7;
			border-radius: 4px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
		}
		h4 {
		    text-align: center;
		    font-size: 20px;
		    color: #8BC34A;
		    font-weight: 500;    
		}
		h4 img {
				height: 105px;
				display: block;
				margin: 30px auto;
				margin-bottom: 0;
		            
		}
		.loginForm label {
			margin: 0 auto;
			display: table;
			width: 90%;
			margin-bottom: 40px;
			border: 1px solid #fff;
			transition: all .8s;
			border-radius: 300px;
		}
		.loginForm label:hover {
			border: 1px solid #000;
		}
		.loginForm input {
			border: 0;
			-webkit-box-shadow: 0 0 15px #ccc;
			box-shadow: 0 0 15px #ccc;
			padding: 15px 0;
			width: 100%;
			float: left;
			text-indent: 20px;
			border-radius: 50px;
			outline: none;
		}
		.loginForm {
		    display: block;
		}
		.loginBtn1 {
		    padding: 14px 0;
		    border: 0;
		    background: #000;
		    color: #fff;
		    border-radius: 50px;
		    width: 90%;
		    margin: auto;
		    display: block;
				position: relative;
		    outline: none;
				transition: all .8s;
		}
		.loginBtn2 {
		    padding: 14px 0;
		    border: 0;
		    background: #000;
		    color: #fff;
		    border-radius: 50px;
		    width: 90%;
		    margin: 30px auto;
		    display: block;
				position: relative;
		    outline: none;
				transition: all .5s;
		}
		.loginBtn1:hover{
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
			bottom: 1px;
		}
		.loginBtn2:hover{
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
			bottom: 1px;
		}
		.error4 {
			position: absolute;
			left: 30px;
			/* top: -40px; */
			bottom: 345px;
			color: #F00000;
			font-size: 12px;
		}
		.error5 {
			position: absolute;
			left: 30px;
			/* top: -40px; */
			bottom: 260px;
			color: #F00000;
			font-size: 12px;
		}
	}
	
	@media screen and (max-width : 768px) {
		.message11 {
			position: fixed;
			left: 50%;
			top: 16%;
			width: 350px;
			height: 550px;
			margin-left: -175px;
			line-height: 1.7;
			/* border-radius: 4px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3); */
		}
		h4 {
		    text-align: center;
		    font-size: 20px;
		    color: #8BC34A;
		    font-weight: 500;    
		}
		h4 img {
				height: 105px;
				display: block;
				margin: 30px auto;
				margin-bottom: 0;
		            
		}
		.loginForm label {
			margin: 0 auto;
			display: table;
			width: 90%;
			margin-bottom: 40px;
			border: 1px solid #fff;
			transition: all .8s;
			border-radius: 300px;
		}
		.loginForm label:active {
			border: 1px solid #000;
		}
		.loginForm input {
			border: 0;
			-webkit-box-shadow: 0 0 15px #ccc;
			box-shadow: 0 0 15px #ccc;
			padding: 15px 0;
			width: 100%;
			float: left;
			text-indent: 20px;
			border-radius: 50px;
			outline: none;
		}
		.loginForm {
		    display: block;
		}
		.loginBtn1 {
		    padding: 14px 0;
		    border: 0;
		    background: #000;
		    color: #fff;
		    border-radius: 50px;
		    width: 90%;
		    margin: auto;
		    display: block;
				position: relative;
		    outline: none;
				transition: all .8s;
		}
		.loginBtn2 {
		    padding: 14px 0;
		    border: 0;
		    background: #000;
		    color: #fff;
		    border-radius: 50px;
		    width: 90%;
		    margin: 30px auto;
		    display: block;
				position: relative;
		    outline: none;
				transition: all .5s;
		}
		.loginBtn1:active{
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
			bottom: 1px;
		}
		.loginBtn2:active{
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
			bottom: 1px;
		}
		.error4 {
			position: absolute;
			left: 30px;
			/* top: -40px; */
			bottom: 345px;
			color: #F00000;
			font-size: 12px;
		}
		.error5 {
			position: absolute;
			left: 30px;
			/* top: -40px; */
			bottom: 260px;
			color: #F00000;
			font-size: 12px;
		}
	}
</style>
