<template>
	<div class="recommend">
		<span>推荐</span>
		
<!-- 		<el-row :gutter="10">
		  <el-col :xs="8" :sm="8" :md="6" :lg="6" :xl="6"><div class="grid-content animated slideInDown"><RecommendNovel :recommendItemData="recommendData0"></RecommendNovel></div></el-col>
		  <el-col :xs="8" :sm="8" :md="6" :lg="6" :xl="6"><div class="grid-content animated slideInDown"><RecommendNovel :recommendItemData="recommendData1"></RecommendNovel></div></el-col>
		  <el-col :xs="8" :sm="8" :md="6" :lg="6" :xl="6"><div class="grid-content animated slideInDown"><RecommendNovel :recommendItemData="recommendData2"></RecommendNovel></div></el-col>
		  <el-col :xs="1" :sm="1" :md="6" :lg="6" :xl="6" class="hidden-sm-and-down"><div class="grid-content animated slideInDown"><RecommendNovel :recommendItemData="recommendData3"></RecommendNovel></div></el-col>
		</el-row>
		
		<el-row :gutter="10">
		  <el-col :xs="8" :sm="8" :md="6" :lg="6" :xl="6"><div class="grid-content animated slideInUp"><RecommendNovel :recommendItemData="recommendData4"></RecommendNovel></div></el-col>
		  <el-col :xs="8" :sm="8" :md="6" :lg="6" :xl="6"><div class="grid-content animated slideInUp"><RecommendNovel :recommendItemData="recommendData5"></RecommendNovel></div></el-col>
		  <el-col :xs="8" :sm="8" :md="6" :lg="6" :xl="6"><div class="grid-content animated slideInUp"><RecommendNovel :recommendItemData="recommendData6"></RecommendNovel></div></el-col>
		  <el-col :xs="1" :sm="1" :md="6" :lg="6" :xl="6" class="hidden-sm-and-down"><div class="grid-content animated slideInUp"><RecommendNovel :recommendItemData="recommendData7"></RecommendNovel></div></el-col>
		</el-row> -->
		<div class="recommendFlex">
			<div class="recommendItemFlex" v-for="(item,index) in recommendData" :key="index">
				<div class="grid-content animated bounceIn">
					<RecommendNovel :recommendItemData="item"></RecommendNovel>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import RecommendNovel from './RecommendNovel.vue'
	import {request} from '../../network/request.js'
	export default {
		name: 'recommend',
		data() {
			return {
				recommendData: []
			}
		},
		components: {
			RecommendNovel
		},
		created() {
			if(window.screen.availWidth >= 768){
				request({
					url: '/recommendPC',
					method: 'get'
				}).then(res => {
					this.recommendData = res
				}).catch( err => {
					console.log(err)
				})
			}else {
				request({
					url: '/recommendPhone',
					method: 'get'
				}).then(res => {
					this.recommendData = res
				}).catch( err => {
					console.log(err)
				})
			}
			
		}
	}
</script>

<style>
	@media screen and (min-width : 768px) {
		.recommend {
			position: relative;
			top: 20px;
			width: 70%;
			margin: 0 auto;
		}
		.recommend span {
			font-size: 17px;
			font-weight: 600;
			color: #484848;
		}
		.grid-content {
			width: 160px;
			height: 225px;
			margin-top: 12px;
			margin-left: auto;
			margin-right: auto;
			border-radius: 8px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
			transition: all 0.5s;
		}
		.grid-content:hover {
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
			margin-top: 6px;
		}
		.recommendFlex{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
		}
		.recommendItemFlex {
			flex: 0 0 25%;
		}
	}
	
	@media screen and (max-width : 768px) {
		.recommend {
			position: relative;
			top: 60px;
			width: 90%;
			margin: 0 auto;
		}
		.recommend span {
			font-size: 22px;
			font-weight: 600;
			color: #484848;
		}
		.grid-content {
			width: 160px;
			height: 232px;
			margin-top: 30px;
			margin-left: auto;
			margin-right: auto;
			border-radius: 4px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
			transition: all 0.5s;
		}
		.grid-content:active {
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
			margin-top: 6px;
		}
		.recommendFlex{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
		}
		.recommendItemFlex {
			flex: 0 0 33.3%;
		}
	}
</style>
