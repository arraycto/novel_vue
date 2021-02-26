<template>
	<div class="myUpload">
		<el-divider class="el_divider"></el-divider>
		<div class="title1">我的上传</div>
		<el-button round size="mini" class="more">更多 ></el-button>
		<!-- <el-row type="flex" :gutter="10" justify="start">
		  <el-col :offset="offsetAdapt" :xs="8" :sm="8" :md="6" :lg="6" :xl="6"><div class="grid-content animated bounceIn"><MyNovel></MyNovel></div></el-col>
		  <el-col :xs="8" :sm="8" :md="6" :lg="6" :xl="6"><div class="grid-content animated bounceIn"><MyNovel></MyNovel></div></el-col>
		  <el-col :xs="8" :sm="8" :md="6" :lg="6" :xl="6"><div class="grid-content animated bounceIn"><MyNovel></MyNovel></div></el-col>
		  <el-col :xs="1" :sm="1" :md="6" :lg="6" :xl="6" class="hidden-sm-and-down"><div class="grid-content animated bounceIn"><MyNovel></MyNovel></div></el-col>
		</el-row> -->
		<div class="myUploadFlex" v-if="isHavingUpload">
			<div v-for="(item,index) in myUploadData" :key="index" class="flexSpace">
				<div class="grid-content animated bounceIn"><MyNovel :myUploadItemData="item"></MyNovel></div>
			</div>
		</div>
		<div style="margin-top: 20px;"></div>
	</div>
</template>

<script>
	import {request} from '../../network/request.js'
	import MyNovel from './MyNovel.vue'
	export default {
		name: 'MyUpload',
		data() {
			return {
				myUploadData: [],
				isHavingUpload: true
			}
		},
		components: {
			MyNovel
		},
		created() {
			if(window.screen.availWidth >= 768){
				request({
					url: '/myUploadPC',
					method: 'get'
				}).then(res => {
					if(res.length == 0){
						this.isHavingUpload = false
					}else{
						this.myUploadData = res
					}
				}).catch( err => {
					console.log(err)
				})
			}else{
				request({
					url: '/myUploadPhone',
					method: 'get'
				}).then(res => {
					if(res.length == 0){
						this.isHavingUpload = false
					}else{
						this.myUploadData = res
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
		.myUpload .el_divider {
			width: 95%;
			margin: 20px auto;
		}
		.myUpload .title1 {
			margin-left: 40px;
			font-size: 23px;
			font-weight: 600;
			margin-bottom: 20px;
		}
		.myUpload .more {
			position: absolute;
			right: 20px;
			margin-top: -45px;
			
		}
		.myUploadFlex {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			width: 90%;
			height: 225px;
			margin: 0 auto;
		}
		.flexSpace {
			margin-right: 75px;
		}
	}
	@media screen and (min-width : 768px) and (max-width: 1200px){
		.myUpload .el_divider {
			width: 95%;
			margin: 20px auto;
		}
		.myUpload .title1 {
			margin-left: 40px;
			font-size: 23px;
			font-weight: 600;
			margin-bottom: 20px;
		}
		.myUpload .more {
			position: absolute;
			right: 20px;
			margin-top: -45px;
			/* bottom: 260px; */
			
		}
		.myUploadFlex {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			width: 100%;
			height: 225px;
			margin: 0 auto;
		}
		.flexSpace {
			margin-right: 15px;
		}
	}
	
	@media screen and (max-width : 768px) {
		.myUpload .el_divider {
			width: 95%;
			margin: 20px auto;
		}
		.myUpload .title1 {
			margin-left: 40px;
			font-size: 23px;
			font-weight: 600;
			margin-bottom: 20px;
		}
		.myUpload .more {
			position: absolute;
			/* bottom: 20px; */
			right: 20px;
			bottom: 290px;		
		}
		.myUploadFlex {
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