<template>
	<div class="homeNovel" @click="toDetails" v-loading="loading"
					element-loading-background="rgba(250, 250, 250, 0.5)">
		<el-image
					class="novelImg"
					:src="url"
					fit="fill"></el-image>
		<div class="novelName">{{novelName}}</div>
		<div class="novelAuthor">{{author}}</div>
		<div class="novelIntroduction">简介：{{introduction}}</div>
		<span class="wordNumer">{{wordNumberAndType}}</span>
		<el-rate
			v-show = "isShowScore"
			v-model="score"
			disabled
			show-score
			class="novelScore"
			text-color="#ff9900"
			score-template="{value}">
		</el-rate>
		<span v-show = "!isShowScore" class="isShowScore">无评分</span>
	</div>
</template>

<script>
	export default {
		name: "novel",
		props: ['sortNovelData'],
		data(){
			return {
				id: '1',
				url: this.$store.state.a.defaultNovelImg,
				novelName: '',
				author: '',
				introduction: '',
				wordNumberAndType: '',
				score: 5,
				isShowScore: true,
				loading: true
			}
		},
		methods: {
			toDetails() {
				this.$router.push({
					path: '/detail/'+this.id
				})
			}
		},
		created() {
			setTimeout(() => {
				this.id = this.sortNovelData.novelId
				if(this.sortNovelData.novelImg != null){
					this.url = this.defaultUrl + this.sortNovelData.novelImg
				}
				this.novelName = this.sortNovelData.novelName
				this.author = this.sortNovelData.novelAuthor
				this.introduction = this.sortNovelData.novelIntroduction
				this.wordNumberAndType = this.sortNovelData.novelNum + '万字 | ' + this.sortNovelData.novelType
				if(this.sortNovelData.novelScore == 0){
					this.isShowScore = false
				}
				this.score = this.sortNovelData.novelScore
				this.loading = false
			},500)
		}
	}
</script>

<style>
	@media screen and (min-width : 768px) {
		.homeNovel {
			position: relative;
			margin: 20px auto;
			/* display: block; */
			background-color: #FFFAE8;
			border-radius: 8px;
			width: 50%;
			height: 245px;
			transition: all 0.8s;
		}
		.homeNovel:hover {
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
		}
		.novelImg {
			position: absolute;
			border-radius: 4px;
			left: 15%;
			top: 3%;
			width: 19%; 
			height: 94%;
		}
		.novelName {
			position: absolute;
			left: 50%;
			top: 5%;
			font-size: 30px;
			font-family:"Times New Roman",Georgia,Serif;
			font-weight: 700;
		}
		.novelAuthor {
			position: absolute;
			left: 50%;
			top: 22%;
			font-size: 20px;
			color: #66CCFF;
		}
		.novelIntroduction {
			position: absolute;
			left: 50%;
			top: 37%;
			font-size: 15px;
			color: #484848;
			margin-right: 20px;
			/* 多行文本溢出用省略号显示 */
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 5;
			overflow: hidden;
			white-space: pre-line;
		}
		.novelScore {
			position: absolute;
			left: 77%;
			bottom: 7%;
		}
		.wordNumer {
			position: absolute;
			left: 50%;
			bottom: 7%;
			font-size: 15px;
			color: #484848;
		}
		.isShowScore {
			position: absolute;
			left: 77%;
			bottom: 7%;
			font-size: 16px;
			color: #ff9900;
		}
	}
	
	@media screen and (max-width : 768px) {
		.homeNovel {
			position: relative;
			margin: 6px auto;
			/* display: block; */
			background-color: #FFFAE8;
			border-radius: 8px;
			width: 94%;
			height: 245px;
			transition: all 0.8s;
		}
		.homeNovel:active {
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
		}
		.novelImg {
			position: absolute;
			border-radius: 4px;
			left: 5%;
			top: 5%;
			width: 28%; 
			height: 90%;
		}
		.novelName {
			position: absolute;
			left: 40%;
			top: 5%;
			font-size: 30px;
			font-family:"Times New Roman",Georgia,Serif;
			font-weight: 700;
		}
		.novelAuthor {
			position: absolute;
			left: 40%;
			top: 22%;
			font-size: 20px;
			color: #66CCFF;
		}
		.novelIntroduction {
			position: absolute;
			left: 40%;
			top: 35%;
			font-size: 15px;
			color: #484848;
			margin-right: 10px;
			/* 多行文本溢出用省略号显示 */
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 4;
			overflow: hidden;
			white-space: pre-line;
		}
		.novelScore {
			position: absolute;
			left: 40%;
			bottom: 5%;
		}
		.wordNumer {
			position: absolute;
			left: 40%;
			bottom: 14%;
			font-size: 15px;
			font-weight: 600;
			color: #484848;
		}
		.isShowScore {
			position: absolute;
			left: 77%;
			bottom: 7%;
			font-size: 15px;
			color: #ff9900;
		}
	}
</style>
