<template>
	<el-input class="length"
		placeholder="请输入内容"
		v-model="input"
		maxlength="30"
		clearable>
		<el-button slot="append" icon="el-icon-search" class="search-icon" @click="searchresult"></el-button>
	</el-input>
</template>

<script>
	import {request} from '../network/request.js'
	export default {
		name: 'SearchBox',
		data() {
		      return {
		        input: ''
		      }
		},
		methods: {
			searchresult() {
				request({
					url: '/search',
					method: 'get',
					params: {
						name: this.input
					}
				}).then(res => {
					this.$store.commit('changeSearchData',res)
					this.$router.push('/search')
				}).catch( err => {
					console.log(err)
				})
				
			}
		}
	}
</script>

<style>
	@media screen and (min-width : 1200px) {
		.search-icon {
			height: 10px;
		}
		.length {
			width:280px;
			top: 9px;
			right: 20px;
		}
	}
	@media screen and (min-width : 768px) and (max-width: 1200px){
		.search-icon {
			height: 10px;
		}
		.length {
			width:200px;
			top: 9px;
			right: 20px;
		}
	}
	@media screen and (max-width : 768px) {
		.search-icon {
			height: 10px;
		}
		.length {
			width:200px;
			top: 9px;
			/* right: 20px; */
		}
	}
</style>
