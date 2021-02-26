<template>
	<div class="detailPage" >
		<div class="details" v-loading="loading"
					element-loading-background="rgba(250, 250, 250, 0.7)">
			<el-image
						class="novelImg5"
						:src="url"
						fit="fill"></el-image>
			<span class="novelName5">{{novelName}}<span class="novelAuthor5">{{author}}</span></span>
			<div class="novelType">类型: {{type}}</div>
			<div class="novelData">
				<span class="novelData1">总点赞: </span>
				<span class="novelData2">{{thumbsUp}}</span>
				<span class="novelData3">总收藏: </span>
				<span class="novelData4">{{collectionNumber}}</span>
				<span class="novelData5">总字数: </span>
				<span class="novelData6">{{wordNumber}}万</span>
			</div>
			
			<div class="userActions">
				<span class="el-icon-thumb" :class="{thumbActive:isThumbActive}" @click="thumbup"></span>
				<span class="el-icon-star-on star" :class="{collectionActive:isCollectionActive}" @click="collection"></span>
				<el-rate
					v-model="averageScore"
					v-show = "isShowScore"
					show-score
					disabled
					class="novelScore5"
					text-color="#ff9900">
				</el-rate>
				<span v-show = "!isShowScore" class="isShowScore2">无评分</span>
			</div>
			<div class="userEvaluate">
				<span class="userEvaluate_span">我的评价</span>
				<el-rate
					v-model="userScore"
					show-score
					class="userScore"
					text-color="#ff9900">
				</el-rate>
				<el-button round size="mini" class="userEvaluateButton" @click="userEvaluate">保存</el-button>
			</div>
			<el-divider class="el_divider"></el-divider>
			
			<div class="title1">作品简介</div>
			<div class="novelIntroduction5">{{introduction}}</div>
			
			<el-divider class="el_divider2"></el-divider>
			<div class="title3">扫书</div>
			<div class="novelIntroduction6">{{note}}</div>
			
			<el-divider class="el_divider2"></el-divider>
			<div class="comment">
				<div class="title2">评论</div>
				<el-input
					type="textarea"
					placeholder="请文明用语"
					v-model="textarea1"
					maxlength="150"
					show-word-limit
					resize="none"
					class="commentInput"
					minlength="1"
				>
				</el-input>
				<el-button class="commentButton" type="primary" @click="comment">评论</el-button>
				<commentItem v-for="item in commentData" :key="item.commentId" :commentItemData="item"></commentItem>
			</div>
		</div>
	
	</div>
</template>

<script>
	import {request} from '../../network/request.js'
	import commentItem from './CommentItem.vue'
	export default {
		name: 'detail',
		data(){
			return {
				url: this.$store.state.a.defaultNovelImg,
				novelName: '情与血',
				author: '兰帝魅晨',
				wordNumber: 145.67,
				collectionNumber: 20,
				thumbsUp: 30,
				type: '都市青春',
				introduction: '有些爱只能以血体现深度，有些情只能以血洗刷罪孽。也许你能看到会心的微笑，也许能看到渭然长叹的遗憾，也许能看到蓦然回首的追忆，也许能看到难以置信的离奇……也许还有愤怒，也许还有温馨，也许还有痛快淋漓的舒畅。也许，你看到的只是麻木的冷漠。生命旅途的真理是什么，有太多。为什么这么多？因为人生旅途里根本不存在唯一绝对正确的真理。',
				averageScore: 5,
				userScore: 0,
				textarea1: '',
				note: '作者作品介绍这是一个现实，冰冷而残酷的世界。人们为着自己的利益而忙忙碌碌。也许有正义，但再火热而纯粹的正义也终将被现实的琐屑所磨灭。所以总门腐化了，一点一点。毕竟人总是要生活的。各个部门依然在为正义而努力，但同时也会为自己去争取利益。这样的正义，已不再纯粹。有个跑龙套的。他为了正义而放弃了女友，最后又因为女友而背弃了正义。总门门主是正义的化身。至少曾经是。可是，当他死后，谁来接手他的事业呢。他为自己寻找接班人，却找不到满意的。所以他不想死。于是他和自己的敌人做了交易最后还是死了。中学时的陈依，目睹了自己的女同学被流氓强奸。却依然和他们混在一起。因为担心她的名誉受损。再后来，有了交情，有了羁绊。他为了救这些他曾经恨不能杀死的混混而拔枪射击，冒着生命危险。很多事情就是如此，不是泾渭分明的黑白二色，而是冰冷灰暗的灰色。就如同男主陈依自己的颜色一样。可是就算是这样的世界，也总会有些令人感动的坚持。比如说黑刃全身烧伤后依然坐车回家。比如律师坚持一生的复仇。也许说不上善良，也说不上正义。但至少，足够火热而长久。所以陈依偶尔也会犯傻。我喜欢这个角色。兰大塑造的主角我一般都很喜欢。他们也许在某一点上比陈依还让我有好感。比如说陈佑的精神洁癖，对未婚妻的坚守。残韧对可夕的那一句无耻的我爱你。依韵对紫杉的痛宰。但综合来说，还是最喜欢陈依。喜欢他的单调，重复。有着八双一模一样的鞋。他就如同情与血中这个世界的缩影。也许冰冷，也许现实，也许冷漠，甚至残酷。但也有热血。就如同他在十三师娘面前跪下说出那句天地正气一般。冰冷色调下的暖色。我觉得这是对这本书最好的注解',
				isShowScore: true,
				isThumbActive: false,
				isCollectionActive: false,
				commentData: [],
				loading: true
			}
		},
		components: {
			commentItem
		},
		methods: {
			checkComment(n){
				n = n.replace(/\s*/g,"")
				if(n == ""){
					this.isError = true
					this.commentInputStyle = this.commentInputError
					this.$notify.error({
						title: '输入不能为空',
						message: '用户名不存在',
						offset: 100
					})
				}else{
					this.isError = false
				}
			},
			checkComment1(){
				this.commentInputStyle = {}
			},
			comment(){
				let n = this.textarea1.replace(/\s*/g,"")
				if(n == ""){
					this.$notify.error({
						title: '评论失败',
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
								commentContent: this.textarea1,
								isHavingReplay: 0,
								userName: window.localStorage.getItem("userName")
							}
						}).then(res => {
							let commentItemData1 = {
								userName: window.localStorage.getItem("userName"),
								userImg: null,
								commentTime: '0秒前',
								commentContent: this.textarea1,
								commentPnum: 0,
								commentNnum: 0,
								commentId: res,
								isHavingReplay:false
							}
							this.commentData.unshift(commentItemData1)
						}).catch( err => {
							console.log(err)
						})
					}else{
						request({
							url: '/comment',
							method: 'post',
							data: {
								novelId: this.$route.params.id,
								commentContent: this.textarea1,
								isHavingReplay: 0,
								userName: window.localStorage.getItem("userName"),
								userImg: window.localStorage.getItem("userImg")
							}
						}).then(res => {
							let commentItemData1 = {
								userName: window.localStorage.getItem("userName"),
								userImg: window.localStorage.getItem("userImg"),
								commentTime: '0秒前',
								commentContent: this.textarea1,
								commentPnum: 0,
								commentNnum: 0,
								commentId: res,
								isHavingReplay:false
							}
							this.commentData.unshift(commentItemData1)
							this.textarea1 = ''
						}).catch( err => {
							console.log(err)
						})
					}
					
				}else{
					this.$router.push('/login')
				}
				
			},
			thumbup(){
				if(window.localStorage.getItem("token") != null){
					request({
						url: '/thumbsup',
						method: 'get',
						params: {
							novelId: this.$route.params.id
						}
					}).then(res => {
						this.isThumbActive = !this.isThumbActive
					}).catch( err => {
						console.log(err)
					})
				}else{
					this.$router.push('/login')
				}
			},
			collection(){
				if(window.localStorage.getItem("token") != null){
					request({
						url: '/collection',
						method: 'get',
						params: {
							novelId: this.$route.params.id
						}
					}).then(res => {
						this.isCollectionActive = !this.isCollectionActive
					}).catch( err => {
						console.log(err)
					})
				}else{
					this.$router.push('/login')
				}
			},
			userEvaluate(){
				if(window.localStorage.getItem("token") != null){
					request({
						url: '/userScore',
						method: 'get',
						params: {
							novelId: this.$route.params.id,
							userScore: this.userScore
						}
					}).then(res => {
						
					}).catch( err => {
						console.log(err)
					})
				}else{
					this.$router.push('/login')
				}
			}
			
		},
		created() {
			//验证token
			if (window.localStorage.getItem("token") != null) {
						new Promise((resolve,reject) => {
							//判断token是否过期
							request({
								url: '/verification',
								method: 'post'
							}).then(res => {
								if(res.status == 201){//token过期
									window.localStorage.clear()
									store.commit('updataUserName')
									store.commit('updataImg')
									resolve(false)//token过期
								}
								resolve(true)//token未过期
							})
							
						}).then( resolve => {
								if(resolve == true){
									return request({
														url: '/detail/'+this.$route.params.id,
														method: 'post'
													}).then(res => {
														if(res == null){
															this.$notify.error({
																title: '加载失败',
																message: '请稍后重试',
																offset: 100
															})
														}else{
															if(res.novel.novelImg != null){
																this.url = this.defaultUrl + res.novel.novelImg
															}
															this.novelName = res.novel.novelName
															this.author = res.novel.novelAuthor
															this.wordNumber = res.novel.novelNum
															this.type = res.novel.novelType
															this.introduction = res.novel.novelIntroduction
															this.note = res.novel.novelNote
															this.collectionNumber =  res.novel.novelCollection
															this.thumbsUp = res.novel.novelThumbsup
															if(res.novel.novelScore == 0){
																this.isShowScore = false
															}
															this.averageScore = res.novel.novelScore
															if(res.userAction == null){
																this.isThumbActive = false
																this.isCollectionActive = false
																this.userScore = 0
															}else{
																this.isThumbActive = res.userAction.userThumbsup
																this.isCollectionActive = res.userAction.userCollection
																if(res.userAction.userScore != null){
																	this.userScore = res.userAction.userScore
																}
																
															}
															this.$store.commit('updataCommentActionData',res.commentAction)
														}
													}).catch( err => {
														console.log(err)
													})
								}else{
									return request({
														url: '/detail_unlisted/'+this.$route.params.id,
														method: 'post'
													}).then(res => {
															if(res.novel.novelImg != null){
																this.url = this.defaultUrl + res.novelImg
															}
															this.novelName = res.novelName
															this.author = res.novelAuthor
															this.wordNumber = res.novelNum
															this.type = res.novelType
															this.introduction = res.novelIntroduction
															this.note = res.novelNote
															this.collectionNumber =  res.novelCollection
															this.thumbsUp = res.novelThumbsup
															if(res.novelScore == 0){
																this.isShowScore = false
															}
															this.averageScore = res.novelScore
															this.isThumbActive = false
															this.isCollectionActive = false
															this.userScore = 0
														
													}).catch( err => {
														console.log(err)
													})
								}
									
						}).then( resolve => {
							request({
								url: '/getComment',
								method: 'get',
								params: {
									novelId: this.$route.params.id
								}
							}).then(res => {
								this.commentData = res
								this.loading = false
							}).catch( err => {
								console.log(err)
							})
							// setTimeout(() => {
										
							// 		}, 500)
						})
						
			}else{
				request({
					url: '/detail_unlisted/'+this.$route.params.id,
					method: 'post'
				}).then(res => {
						if(res.novelImg != null){
							this.url = this.defaultUrl + res.novelImg
						}
						this.novelName = res.novelName
						this.author = res.novelAuthor
						this.wordNumber = res.novelNum
						this.type = res.novelType
						this.introduction = res.novelIntroduction
						this.note = res.novelNote
						this.collectionNumber =  res.novelCollection
						this.thumbsUp = res.novelThumbsup
						if(res.novelScore == 0){
							this.isShowScore = false
						}
						this.averageScore = res.novelScore
						this.isThumbActive = false
						this.isCollectionActive = false
						this.userScore = 0
					
				}).catch( err => {
					console.log(err)
				})
			
			request({
				url: '/getComment',
				method: 'get',
				params: {
					novelId: this.$route.params.id
				}
			}).then(res => {
				this.commentData = res
				this.loading = false
			}).catch( err => {
				console.log(err)
			})
		}
			
			
			
			
			
		}
	}
</script>

<style>
	@import '../../assets/css/detail.css'
</style>
