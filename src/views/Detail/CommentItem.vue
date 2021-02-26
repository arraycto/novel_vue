<template>
	<div class="CommentItem">
		<el-divider class="el_divider3"></el-divider>
		<!-- <el-avatar :size="size" :src="circleUrl" class="portrait"></el-avatar> -->
		<img :src="circleUrl" class="portrait">
		<span class="UserId">{{userName}}</span>
		<div class="UserComment">{{comment}}</div>
		<span class="CommentTime">{{time}}</span>
		<a class="el-icon-caret-top" href="#" @click="Up" style="text-decoration:none;" :class="{positiveActive:isPositiveActive}"></a>
		<span class="positiveCommentNum">{{positiveCommentNum}}</span>
		<a class="el-icon-caret-bottom" href="#" @click="Down" style="text-decoration:none;" :class="{negativeActive:isNegativeActive}"></a>
		<span class="negativeCommentNum">{{negativeCommentNum}}</span>
		<span class="ReplyButton" @click="isDispaly">回复</span>
		<replay v-for="item in replayData" :key="item.commentId" :replayItemData="item"></replay>
		
		<div v-show="replayFrame">
			<el-input
				type="textarea"
				placeholder="请文明用语"
				v-model="textarea2"
				maxlength="150"
				show-word-limit
				resize="none"
				class="commentInput"
				style="margin-top: 5px;"
			>
			</el-input>
			<el-button class="commentButton" type="primary" style="margin-top: 5px;" @click="repaly">评论</el-button>
		</div>
		
	</div>
</template>

<script>
	import {request} from '../../network/request.js'
	import replay from './Replay.vue'
	export default {
		name: 'commentitem',
		props: ['commentItemData'],
		created() {
			this.userName = this.commentItemData.userName
			if(this.commentItemData.userImg != null){
				this.circleUrl = this.defaultUrl + this.commentItemData.userImg
			}
			this.time = this.commentItemData.commentTime
			this.comment = this.commentItemData.commentContent
			this.positiveCommentNum = this.commentItemData.commentPnum
			this.negativeCommentNum = this.commentItemData.commentNnum
			this.parentId = this.commentItemData.commentId
			this.isHavingReplay = this.commentItemData.isHavingReplay
			if(this.isHavingReplay == true){
				request({
					url: '/getRepaly',
					method: 'get',
					params: {
						parentId: this.parentId
					}
				}).then(res => {
					this.replayData = res
				}).catch( err => {
					console.log(err)
				})
			}
			let _this = this
			if(window.localStorage.getItem("token") != null){
				let commentAction = this.$store.state.a.commentActionData
				commentAction.forEach(function(x, index, a){//forEach()：对数组进行遍历循环，对数组中的每一项运行给定函数。这个方法没有返回值。参数都是function类型，默认有传参，参数分别为：遍历的数组内容；第对应的数组索引，数组本身。
					if(x.commentId == _this.commentItemData.commentId){
						_this.isPositiveActive = x.commentPositive
						_this.isNegativeActive = x.commentNegative
						return
					}
				})
			}

		},
		data() {
			return {
				userName: '亿观',
				textarea2: '',
				circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
				time: '2020-10-18 10:46',
				comment: '三天看完《女友全都是厉鬼》,简单说一说， 这本书前期非常不错,恐怖氛围做的也很好，有时还挺搞笑。但是中期就有点崩了，作者对不起这个书名，两个女鬼女角比工具人还工具人，基本跟主角没互动。李子，本书第一女主，被养鬼人分尸变成厉鬼，只会在主角遇到危险的时候出来-一瞬间又消失。小姿，暗恋主角到疯狂的女孩，在李子死后鼓起勇气准备跟主角表白，结果在去表白的路上被变态杀妻狂绑起来用乱砸......变成厉魂。每次出现就只有两只手，抓完怪又消失，几百章，主角对她说过的话好像只有她的名字,就是叫她出来打怪的时候。可怜...',
				positiveCommentNum: 0,
				negativeCommentNum: 0,
				replayFrame: false,
				parentId: 0,
				isHavingReplay: false,
				replayData: [],
				isPositiveActive: false,
				isNegativeActive: false
				
			}
		},
		components: {
			replay
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
								commentId: this.commentItemData.commentId
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
								commentId: this.commentItemData.commentId
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
			},
			isDispaly() {
				this.replayFrame = !this.replayFrame
			},
			repaly(){
				let n = this.textarea2.replace(/\s*/g,"")
				if(n == ""){
					this.$notify.error({
						title: '回复失败',
						message: '内容不能为空',
						offset: 100
					})
					return;
				}
				if(window.localStorage.getItem("token") != null){
					if(window.localStorage.getItem("userImg") == null){
						request({
							url: '/comment',
							method: 'post',
							data: {
								novelId: this.$route.params.id,
								commentContent: this.textarea2,
								isHavingReplay: 0,
								userName: window.localStorage.getItem("userName"),
								parentId: this.parentId
							}
						}).then(res => {
							let commentItemData2 = {
								userName: window.localStorage.getItem("userName"),
								userImg: null,
								commentTime: '0秒前',
								commentContent: this.textarea2,
								commentPnum: 0,
								commentNnum: 0,
								commentId: res,
								isHavingReplay:false
							}
							this.replayData.unshift(commentItemData2)
							this.textarea2 = ''
						}).catch( err => {
							console.log(err)
						})
					}else{
						request({
							url: '/comment',
							method: 'post',
							data: {
								novelId: this.$route.params.id,
								commentContent: this.textarea2,
								isHavingReplay: 0,
								userName: window.localStorage.getItem("userName"),
								userImg: window.localStorage.getItem("userImg"),
								parentId: this.parentId
							}
						}).then(res => {
							let commentItemData2 = {
								userName: window.localStorage.getItem("userName"),
								userImg: window.localStorage.getItem("userImg"),
								commentTime: '0秒前',
								commentContent: this.textarea2,
								commentPnum: 0,
								commentNnum: 0,
								commentId: res,
								isHavingReplay:false
							}
							this.replayData.unshift(commentItemData2)
							this.textarea2 = ''
						}).catch( err => {
							console.log(err)
						})
					}
					
				}else{
					this.$router.push('/login')
				}
			}
		}
	}
</script>

<style>
	@media screen and (min-width : 768px) {
		.CommentItem {
			width: 90%;
			margin-left: 5%;
			margin-bottom: 20px;
		}
		.CommentItem .el_divider3 {
			width: 100%;
			margin-top: 30px;
		}
		.CommentItem .UserId {
			position: absolute;
			font-size: 14px;
			font-weight: 600;
			/* color: #828282; */
			margin-left: 20px;
			/* margin-bottom: 20px; */
		}
		.CommentItem .UserComment {
			font-size: 14px;
			margin-left: 55px;
			margin-top: -18px;
			white-space: pre-line;
		}
		.CommentItem .CommentTime {
			margin-left: 55px;
			font-size: 13px;
			color: #828282;
		}
		.CommentItem .el-icon-caret-top {
			margin-left: 30px;
			font-size: 14px;
			color: #828282;
		}
		.CommentItem .el-icon-caret-top:hover {
			color: #66CCFF;
		}
		.CommentItem .el-icon-caret-bottom {
			margin-left: 20px;
			font-size: 14px;
			color: #828282;
		}
		.CommentItem .el-icon-caret-bottom:hover {
			color: #66CCFF;
		}
		.CommentItem .negativeCommentNum {
			font-size: 13px;
			color: #828282;
		}
		.CommentItem .positiveCommentNum {
			font-size: 13px;
			color: #828282;
		}
		.CommentItem .ReplyButton {
			margin-left: 30px;
			font-size: 13px;
			color: #828282;
		}
		.CommentItem .ReplyButton:hover {
			color: #66CCFF;
		}
		.CommentItem .portrait {
			width: 36px;
			height: 36px;
			border-radius: 18px;
		}
		.positiveActive{
			color: #66CCFF  !important;
		}
		.negativeActive{
			color: #66CCFF  !important;
		}
	}
	
	@media screen and (max-width : 768px) {
		.CommentItem {
			width: 90%;
			margin-left: 5%;
			margin-bottom: 20px;
		}
		.CommentItem .el_divider3 {
			width: 100%;
			margin-top: 30px;
		}
		.CommentItem .UserId {
			position: absolute;
			font-size: 14px;
			/* color: #828282; */
			font-weight: 600;
			margin-left: 20px;
			/* margin-bottom: 20px; */
		}
		.CommentItem .UserComment {
			font-size: 14px;
			line-height:20px;
			margin-left: 55px;
			margin-top: -18px;
			white-space: pre-line;
		}
		.CommentItem .CommentTime {
			margin-left: 55px;
			font-size: 13px;
			color: #828282;
		}
		.CommentItem .el-icon-caret-top {
			margin-left: 30px;
			font-size: 14px;
			color: #828282;
		}
		.CommentItem .el-icon-caret-top:hover {
			color: #66CCFF;
		}
		.CommentItem .el-icon-caret-bottom {
			margin-left: 20px;
			font-size: 14px;
			color: #828282;
		}
		.CommentItem .el-icon-caret-bottom:hover {
			color: #66CCFF;
		}
		.CommentItem .negativeCommentNum {
			font-size: 13px;
			color: #828282;
		}
		.CommentItem .positiveComentNum {
			font-size: 13px;
			color: #828282;
		}
		.CommentItem .ReplyButton {
			margin-left: 30px;
			font-size: 13px;
			color: #828282;
		}
		.CommentItem .ReplyButton:hover {
			color: #66CCFF;
		}
		.CommentItem .portrait {
			width: 36px;
			height: 36px;
			border-radius: 18px;
		}
		.positiveActive{
			color: #66CCFF !important;
		}
		.negativeActive{
			color: #66CCFF !important;
		}
	}
</style>
