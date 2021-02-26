<template>
	<div class="myCollection">
		<el-divider class="el_divider"></el-divider>
		<div class="title1">我的收藏</div>
		<el-button round size="mini" class="more">更多 ></el-button>
<!-- 		<el-row type="flex" :gutter="10" justify="start">
		  <el-col :offset="offsetAdapt" :xs="8" :sm="8" :md="6" :lg="6" :xl="6"><div class="grid-content animated bounceIn"><RecommendNovel></RecommendNovel></div></el-col>
		  <el-col :xs="8" :sm="8" :md="6" :lg="6" :xl="6"><div class="grid-content animated bounceIn"><RecommendNovel></RecommendNovel></div></el-col>
		  <el-col :xs="8" :sm="8" :md="6" :lg="6" :xl="6"><div class="grid-content animated bounceIn"><RecommendNovel></RecommendNovel></div></el-col>
		  <el-col :xs="1" :sm="1" :md="6" :lg="6" :xl="6" class="hidden-sm-and-down"><div class="grid-content animated bounceIn"><RecommendNovel></RecommendNovel></div></el-col>
		</el-row> -->
		<div class="myCollectionFlex" v-if="isHavingCollection">
			<div v-for="(item,index) in myCollectionData" :key="index" class="flexSpace">
				<div class="grid-content animated bounceIn"><MyNovel :myUploadItemData="item"></MyNovel></div>
			</div>
		</div>
	</div>
</template>

<script>
	import {request} from '../../network/request.js'
	import MyNovel from './MyNovel.vue'
	export default {
		name: 'myCollection',
		data() {
			return {
				myCollectionData: [],
				isHavingCollection: true
			}
		},
		components: {
			MyNovel
		},
		created() {
			if(window.screen.availWidth >= 768){
				request({
					url: '/myCollection',
					method: 'get',
					params: {
						num: 4
					}
				}).then(res => {
					if(res.length == 0){
						this.isHavingCollection = false
					}else{
						this.myCollectionData = res
					}
				}).catch( err => {
					console.log(err)
				})
			}else{
				request({
					url: '/myCollection',
					method: 'get',
					params: {
						num: 3
					}
				}).then(res => {
					if(res.length == 0){
						this.isHavingCollection = false
					}else{
						this.myCollectionData = res
					}
				}).catch( err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style>
	@media screen and (min-width : 1200px) {
		.myCollection .el_divider {
			width: 95%;
			margin: 20px auto;
		}
		.myCollection .title1 {
			margin-left: 40px;
			font-size: 23px;
			font-weight: 600;
			margin-bottom: 20px;
		}
		.myCollection .more {
			position: absolute;
			/* bottom: 20px; */
			right: 20px;
			margin-top: -45px;
			
		}
		.grid-content {
			width: 160px;
			height: 225px;
			margin-top: 12px;
			border-radius: 4px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
			transition: all 0.5s;
		}
		.grid-content:hover {
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
			margin-top: 6px;
		}
		.myCollectionFlex {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			width: 90%;
			margin: 0 auto;
			height: 225px;
		}
		.flexSpace {
			margin-right: 85px;
		}
	}
	
	@media screen and (min-width : 768px) and (max-width: 1200px){
		.myCollection .el_divider {
			width: 95%;
			margin: 20px auto;
		}
		.myCollection .title1 {
			margin-left: 40px;
			font-size: 23px;
			font-weight: 600;
			margin-bottom: 20px;
		}
		.myCollection .more {
			position: absolute;
			right: 20px;
			margin-top: -45px;
			
		}
		.grid-content {
			width: 160px;
			height: 225px;
			margin-top: 12px;
			border-radius: 4px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
			transition: all 0.5s;
		}
		.grid-content:hover {
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
			margin-top: 6px;
		}
		.myCollectionFlex {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			width: 90%;
			height: 225px;
			margin: 0 auto;
		}
		.flexSpace {
			margin-right: 15px;
		}
	}
	
	@media screen and (max-width : 768px) {
		.myCollection .el_divider {
			width: 95%;
			margin: 20px auto;
		}
		.myCollection .title1 {
			margin-left: 40px;
			font-size: 23px;
			font-weight: 600;
			margin-bottom: 20px;
		}
		.myCollection .more {
			position: absolute;
			/* bottom: 20px; */
			right: 20px;
			margin-top: -45px;
			
		}
		.grid-content {
			width: 160px;
			height: 235px;
			margin-top: 12px;
			border-radius: 4px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
			transition: all 0.5s;
		}
		.grid-content:active {
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
			margin-top: 6px;
		}
		.myCollectionFlex {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			width: 100%;
			height: 235px;
			margin: 0 auto;
		}
		.flexSpace {
			margin-right: 10px;
		}
	}
</style>
