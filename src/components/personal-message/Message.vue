<template>
	<div class="message">
		<div style="color: #66CCFF; font-weight: 600;">{{getId}}</div>
		<el-divider class="message-2"></el-divider>
		<div><router-link to="/personal" tag="a" class="message-1" style="text-decoration:none;"><span class="el-icon-user"></span>个人中心</router-link></div>
		<el-divider class="message-2"></el-divider>
		<el-badge is-dot hidden class="item">
			<div class="message-1"><span class="el-icon-chat-square"></span>消息</div>
		</el-badge>
		<el-divider class="message-2"></el-divider>
		<!-- <div><router-link to="/home" tag="a" class="message-1" style="text-decoration:none;"><span class="el-icon-switch-button"></span>退出</router-link></div> -->
		<div class="message-1" @click="logout" v-preventReClick><span class="el-icon-switch-button" v-preventReClick>退出</span></div>
	</div>
</template>

<script>
	import {request} from '../../network/request.js'
	export default {
		name: 'message',
		data() {
			return {
				
			}
		},
		computed: {
			getId(){
				return this.$store.state.a.userName
			}
		},
		methods: {
			logout() {
				if(window.localStorage.getItem("token") != null){
					request({
						url: '/logout',
						method: 'get'
					}).then(res => {
						if(res.status == 200){
							window.localStorage.clear()
							this.$store.commit('updataUserName')
							this.$store.commit('updataImg')
							this.$notify({
								title: '退出成功',
								type: 'success',
								offset: 100
							})
							this.$router.push("/home").catch(err => {
								console.log("点慢点")
							})
						}else{
							this.$notify.error({
								title: '退出失败',
								message: '请稍后重试',
								offset: 100
							})
						}
					}).catch( err => {
						console.log(err)
					})
				}
			}
		}
	}
</script>

<style>
	.message .message-2{
		margin-top: 10px !important;
		margin-bottom: 10px !important;
	}
	.message {
		text-align: center;
		font-size: 16px;
		font-weight: 500;
		color: #828282;
	}
	.message-1 {
		color: #828282;
	}
	.message-1:hover {
		/* 标记该颜色*/
		color: #66CCFF;
	}
</style>
