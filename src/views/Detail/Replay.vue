<template>
	<div class="replyComment">
		<!-- <el-avatar :size="size" :src="replyCircleUrl" class="portrait"></el-avatar> -->
		<img :src="replyCircleUrl" class="portrait">
		<span class="UserId">{{userName}}</span>
		<div class="UserReplay">{{replyComment}}</div>
		<span class="CommentTime">{{time}}</span>
		<a class="el-icon-caret-top" @click="Up" href="#" style="text-decoration:none;" :class="{positiveActive:isPositiveActive}"></a>
		<span class="positiveCommentNum">{{positiveCommentNum}}</span>
		<a class="el-icon-caret-bottom" @click="Down" href="#" style="text-decoration:none;" :class="{negativeActive:isNegativeActive}"></a>
		<span class="negativeCommentNum">{{negativeCommentNum}}</span>
	</div>
</template>

<script>
	import {request} from '../../network/request.js'
	export default {
		name: 'reply',
		props: ['replayItemData'],
		created() {
			this.userName = this.replayItemData.userName
			if(this.replayItemData.userImg != null){
				this.replyCircleUrl = this.defaultUrl + this.replayItemData.userImg
			}
			this.time = this.replayItemData.commentTime
			this.replyComment = this.replayItemData.commentContent
			this.positiveCommentNum = this.replayItemData.commentPnum
			this.negativeCommentNum = this.replayItemData.commentNnum
			let _this = this
			if(window.localStorage.getItem("token") != null){
				let commentAction = this.$store.state.a.commentActionData
				commentAction.forEach(function(x, index, a){//forEach()：对数组进行遍历循环，对数组中的每一项运行给定函数。这个方法没有返回值。参数都是function类型，默认有传参，参数分别为：遍历的数组内容；第对应的数组索引，数组本身。
					if(x.commentId == _this.replayItemData.commentId){
						_this.isPositiveActive = x.commentPositive
						_this.isNegativeActive = x.commentNegative
						return
					}
				})
			}
		},
		data() {
			return {
				userName: '胡莱',
				replyCircleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
				replyComment: "确实",
				time: '2020-10-18 10:46',
				positiveCommentNum: 0,
				negativeCommentNum: 0,
				isPositiveActive: false,
				isNegativeActive: false
			}
		},
		methods: {
			Up() {
				if(window.localStorage.getItem("token") == null){
					this.$router.push("/login")
				}else{
					request({
							url: '/commentUp',
							method: 'get',
							params: {
								novelId: this.$route.params.id,
								commentId: this.replayItemData.commentId
							}
						}).then(res => {
							if(this.isPositiveActive == false && this.isNegativeActive == false){
								this.isPositiveActive = true
								this.positiveCommentNum++
							}else if(this.isPositiveActive == true && this.isNegativeActive == false){
								this.isPositiveActive = false
								this.positiveCommentNum--
							}else if(this.isPositiveActive == false && this.isNegativeActive == true){
								this.isPositiveActive = true
								this.positiveCommentNum++
								this.isNegativeActive = false
								this.negativeCommentNum--
							}
						}).catch( err => {
							console.log(err)
						})
					}
			},
			Down(){
				if(window.localStorage.getItem("token") == null){
					this.$router.push("/login")
				}else{
					request({
							url: '/commentDown',
							method: 'get',
							params: {
								novelId: this.$route.params.id,
								commentId: this.replayItemData.commentId
							}
						}).then(res => {
							if(this.isNegativeActive == false && this.isPositiveActive == false){
								this.isNegativeActive = true
								this.negativeCommentNum++
							}else if(this.isNegativeActive == true && this.isPositiveActive == false){
								this.isNegativeActive = false
								this.negativeCommentNum--
							}else if(this.isNegativeActive == false && this.isPositiveActive == true){
								this.isNegativeActive = true
								this.negativeCommentNum++
								this.isPositiveActive = false
								this.positiveCommentNum--
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
	@media screen and (min-width : 768px) {
		.replyComment .UserId{
			position: absolute;
			font-size: 14px;
			font-weight: 600;
			/* color: #828282; */
			margin-left: 10px !important;
		}
		.replyComment {
			margin-top: 8px;
			margin-left: 50px;
		}
		.UserReplay {
			font-size: 14px;
			line-height:20px;
			margin-left: 55px;
			margin-top: -22px;
			white-space: pre-line;
		}
		.replyComment .portrait {
			margin-left: 10px;
			width: 30px;
			height: 30px;
			border-radius: 15px;
		}
		.positiveActive{
			color: #66CCFF !important;
		}
		.negativeActive{
			color: #66CCFF !important;
		}
	}
	@media screen and (max-width : 768px) {
		.replyComment .UserId{
			position: absolute;
			font-size: 14px;
			font-weight: 600;
			/* color: #828282; */
			margin-left: 10px !important;
		}
		.replyComment {
			margin-top: 8px;
			margin-left: 50px;
		}
		.UserReplay {
			font-size: 14px;
			line-height:20px;
			margin-left: 55px;
			margin-top: -18px;
			white-space: pre-line;
		}
		.replyComment .portrait {
			margin-left: 10px;
			width: 30px;
			height: 30px;
			border-radius: 15px;
		}
		.positiveActive{
			color: #66CCFF !important;
		}
		.negativeActive{
			color: #66CCFF !important;
		}
	}
	
</style>
