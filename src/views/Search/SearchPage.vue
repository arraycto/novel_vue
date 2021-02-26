<template>
	<div class="search">
			<Novel v-for="item in searchData" :key="item.novelId" :sortNovelData ="item"></Novel>
	</div>	
</template>

<script>
	import Novel from '../ListOfNovels/Novel.vue'
	export default {
		name: 'searchpage',
		data() {
			return {
				
			}
		},
		computed:{
			searchData(){
				if(this.$store.state.a.searchData.length === 0){
					this.$notify.error({
						title: '搜索失败',
						message: '未找到该作者或该小说',
						offset: 100
					})
				}
				return this.$store.state.a.searchData
			}
		},
		components:{
			Novel
		}
	}
</script>

<style>
	.search{
		position: relative;
		/* top: 40px; */
		height: 900px;
		/* margin-top: 40px; */
		overflow-y: scroll;
	}
</style>
