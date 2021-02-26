<template>
	  <el-carousel :interval="4000" :type="carouselType" :height="carouselHegiht" @change="activeIndex">
	    <el-carousel-item v-for="(item,index) in carouselData" :key="index" @click.native="toDetails(index+1)">
	      <!-- <h3 class="medium">{{ item }}</h3> -->
				<Novel2 :carouselItemData="item" ref="toNovel2"></Novel2>
	    </el-carousel-item>
	  </el-carousel>
</template>

<script>
	import Novel2 from "./Novel2.vue"
	import {request} from '../../network/request.js'
	export default {
		name: 'carousel',
		data() {
			return {
				id: '1',
				key1: '',
				key2: '',
				carouselData: []
			}
		},
		components: {
			Novel2
		},
		created() {
			request({
				url: '/carousel',
				method: 'get'
			}).then(res => {
				this.carouselData = res
			}).catch( err => {
				console.log(err)
			})
		},
		methods: {
			activeIndex(key1,key2) {
				setTimeout(() => {
							this.key1 = key1
							this.key2 = key2
						}, 200)				
			},
			toDetails(item) {
				if(this.key1 == item-1){
					this.$router.push({
						path: '/detail/'+this.$refs.toNovel2[item-1].id
					})
				}
			}
		},
		computed: {
			carouselType() {
				if(window.screen.availWidth >= 768){
					// src绑定图片地址时需要require
					return "card"
				}else{
					return ""
				}
			},
			carouselHegiht() {
				if(window.screen.availWidth >= 768){
					// src绑定图片地址时需要require
					return "300px"
				}else{
					return "220px"
				}
			}
		}
	}
</script>

<style>
	@media screen and (min-width : 768px) {
		.el-carousel__item  {
			border-radius: 16px;
			transition: all 0.8s;
		}
		.el-carousel__item:hover  {
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
		}
		.el-carousel__item:nth-child(2n) {
			background-color: #99a9bf;
		}
		
		.el-carousel__item:nth-child(2n+1) {
			background-color: #d3dce6;
		}
	}
	
	@media screen and (max-width : 768px) {
		.el-carousel__item  {
			transition: all 0.8s;
		}
		.el-carousel__item:hover  {
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
		}
		.el-carousel__item:nth-child(2n) {
			background-color: #99a9bf;
		}
		
		.el-carousel__item:nth-child(2n+1) {
			background-color: #d3dce6;
		}
	}
</style>
