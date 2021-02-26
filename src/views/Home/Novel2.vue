<template>
	<div class="homeNovel2">
		<el-image
					class="novelImg2"
					:src="url"
					fit="fill"></el-image>
		<div class="novelName2">{{novelName}}</div>
		<div class="novelAuthor2">{{author}}</div>
		<div class="novelIntroduction2">简介：{{introduction}}</div>
		<span class="wordNumer2">{{wordNumber}}万字 | {{type}}</span>
		<el-rate
			v-show = "isShowScore"
			v-model="score"
			disabled
			show-score
			class="novelScore2"
			text-color="#ff9900"
			score-template="{value}">
		</el-rate>
		<span v-show = "!isShowScore" class="isShowScore">无评分</span>
	</div>
</template>

<script>
	export default {
		name: "novel",
		props: ['carouselItemData'],
		created() {
			this.id = this.carouselItemData.novelId
			if(this.carouselItemData.novelImg != null){
				this.url = this.defaultUrl + this.carouselItemData.novelImg
			}
			this.novelName = this.carouselItemData.novelName
			this.author = this.carouselItemData.novelAuthor
			this.wordNumber = this.carouselItemData.novelNum
			this.type = this.carouselItemData.novelType
			this.introduction = this.carouselItemData.novelIntroduction
			if(this.carouselItemData.novelScore == 0){
				this.isShowScore = false
			}
			this.score = this.carouselItemData.novelScore
		},
		data(){
			return {
				id:'',
				url: this.$store.state.a.defaultNovelImg,
				novelName: '情与血',
				author: '兰帝魅晨',
				wordNumber: '145.67',
				type: '都市青春',
				introduction: '有些爱只能以血体现深度，有些情只能以血洗刷罪孽。也许你能看到会心的微笑，也许能看到渭然长叹的遗憾，也许能看到蓦然回首的追忆，也许能看到难以置信的离奇……也许还有愤怒，也许还有温馨，也许还有痛快淋漓的舒畅。也许，你看到的只是麻木的冷漠。生命旅途的真理是什么，有太多。为什么这么多？因为人生旅途里根本不存在唯一绝对正确的真理。',
				score: 5,
				isShowScore: true
			}
		}
	}
</script>

<style>
	@media screen and (min-width : 768px) {
		.homeNovel2 {
			position: relative;
			margin: 20px auto;
			/* display: block; */
			/* background-color: #FFFAE8; */
			
			width: 90%;
			height: 90%;
			transition: all 0.8s;
		}
		.novelImg2 {
			position: absolute;
			border-radius: 4px;
			left: 8%;
			top: 3%;
			width: 23%; 
			height: 94%;
		}
		.novelName2 {
			position: absolute;
			left: 45%;
			top: 5%;
			font-size: 30px;
			font-family:"Times New Roman",Georgia,Serif;
			font-weight: 700;
		}
		.novelAuthor2 {
			position: absolute;
			left: 45%;
			top: 22%;
			font-size: 20px;
			color: #66CCFF;
		}
		.novelIntroduction2 {
			position: absolute;
			left: 45%;
			top: 37%;
			font-size: 15px;
			color: #484848;
			/* 多行文本溢出用省略号显示 */
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 6;
			overflow: hidden;
			white-space: pre-line;
		}
		.novelScore2 {
			position: absolute;
			left: 77%;
			bottom: 7%;
		}
		.isShowScore {
			position: absolute;
			left: 77%;
			bottom: 7%;
			font-size: 16px;
			color: #ff9900;
		}
		.wordNumer2 {
			position: absolute;
			left: 45%;
			bottom: 7%;
			font-size: 15px;
			color: #484848;
		}
	}
	
	@media screen and (max-width : 768px) {
		.homeNovel2 {
			position: relative;
			margin: 20px auto;
			/* display: block; */
			/* background-color: #FFFAE8; */
			
			width: 96%;
			height: 90%;
			transition: all 0.8s;
		}
		.novelImg2 {
			position: absolute;
			border-radius: 4px;
			left: 1%;
			top: 4%;
			width: 34%; 
			height: 88%;
		}
		.novelName2 {
			position: absolute;
			left: 38%;
			top: 4%;
			font-size: 30px;
			font-family:"Times New Roman",Georgia,Serif;
			font-weight: 700;
		}
		.novelAuthor2 {
			position: absolute;
			left: 38%;
			top: 18%;
			font-size: 20px;
			color: #66CCFF;
		}
		.novelIntroduction2 {
			position: absolute;
			left: 38%;
			top: 30%;
			font-size: 15px;
			color: #484848;
			/* 多行文本溢出用省略号显示 */
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 6;
			overflow: hidden;
			white-space: pre-line;
		}
		.novelScore2 {
			position: absolute;
			left: 74%;
			bottom: 7%;
		}
		.isShowScore {
			position: absolute;
			left: 77%;
			bottom: 7%;
			font-size: 16px;
			color: #ff9900;
		}
		.wordNumer2 {
			position: absolute;
			left: 38%;
			bottom: 7%;
			font-size: 15px;
			color: #484848;
		}
	}
</style>
