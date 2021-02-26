<template>
	<div
		class="recommendNovel" 
		@click="toDetails"
		>
		<el-image
					class="recommendNovelImg"
					:src="url"
					v-loading="loading"
					element-loading-background="rgba(250, 250, 250, 1)"
					fit="fill"></el-image>
		<div class="novelName4">{{novelName}}</div>
		<div class="wordNumer4">{{wordNumberAndType}}</div>
	</div>
</template>

<script>
	export default {
		name: 'recommendnovel',
		props: ['recommendItemData'],
		created() {
			
			setTimeout(() => {
				this.id = this.recommendItemData.novelId
				if(this.recommendItemData.novelImg != null){
					this.url = this.defaultUrl + this.recommendItemData.novelImg
				}
				this.novelName = this.recommendItemData.novelName
				this.wordNumberAndType = this.recommendItemData.novelNum + ' | ' + this.recommendItemData.novelType
				this.loading = false
			},300)
			
		},
		data() {
			return {
				id: '1',
				url: this.$store.state.a.defaultNovelImg,
				novelName: '',
				wordNumberAndType: '',
				loading: true
			}
		},
		methods: {
			toDetails() {
				this.$router.push({
					path: '/detail/'+this.id
				})
			}
		}
	}
</script>

<style scoped>
	.recommendNovel {
		flex: 1;
		position: relative;
		text-align: center;
	}
	.recommendNovelImg {
		position: relative;
		border-radius: 8px;
		top: 5px;
		width: 140px;
		height: 180px;
	}
	.wordNumer4 {
		font-size: 13px;
		color: #484848;
	}
	.novelName4 {
		margin-top: 3px;
		font-size: 15px;
		font-weight: 600;
	}
</style>
