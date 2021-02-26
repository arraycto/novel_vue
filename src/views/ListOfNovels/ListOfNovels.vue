<template>
  <div class="infinite-list-wrapper" style="overflow: auto;">
    <ul
      class="list"
      v-infinite-scroll="load"
			infinite-scroll-immediate=false
      infinite-scroll-disabled="disabled">
      <li v-for="(item,index) in records" class="list-item" :key="index"><Novel class="animated flipInX" :sortNovelData="item"></Novel></li>
    </ul>
    <p v-if="noMore"></p>
  </div>
</template>

<script>
	import {request} from '../../network/request.js'
	import Novel from "./Novel.vue"
	export default {
		name: 'listOfNovels',
    data () {
      return {
				count: 3,
				loading: false,
				records: [], //每页的数据
				total: 2, //总数
				size: 3,//每页的大小
				current: 1,//当前页数
				page: 0 //一共有多少页
      }
    },
		components: {
			Novel
		},
		computed: {
      noMore () {
				if(this.records.length >= this.total){
					this.$notify({
							title: '警告',
							message: '书籍已经加载完毕',
							type: 'warning'
						});
					}
        return this.records.length >= this.total
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
    methods: {
      load () {
				this.loading = true
        setTimeout(() => {
					request({
						url: '/sort',
						method: 'get',
						params: {
							type: this.$route.query.type,
							pagination: this.current,
							size: this.size
						}
					}).then(res => {
						this.current++
						this.records = this.records.concat(res.records)
						this.loading = false
					}).catch( err => {
						console.log(err)
					})
        }, 500)
      }
    },
		created() {
			request({
				url: '/sort',
				method: 'get',
				params: {
					type: this.$route.query.type,
					pagination: this.current,
					size: this.size
				}
			}).then(res => {
				this.current++
				this.records = res.records
				this.total = res.total
				this.page = res.page
			}).catch( err => {
				console.log(err)
			})
		}
	}
</script>

<style>
	@media screen and (min-width : 768px) {
		.infinite-list-wrapper {
			position: relative;
			top: 40px;
			height: 800px;
		}
		.infinite-list-wrapper p {
			left: 400px;
		}
	}
	@media screen and (max-width : 768px) {
		.infinite-list-wrapper {
			position: relative;
			top: 90px;
			height: 770px;
			overflow-x: hidden !important;
		}
		.infinite-list-wrapper p {
			left: 400px;
		}
	}
</style>
