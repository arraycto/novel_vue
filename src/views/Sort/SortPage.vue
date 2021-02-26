<template>
	<div class="sort">
		<SortBar>
			<SortItem path="/sort/one"><router-link :to="{path:'/sort/one',query: {type:'都市青春'}}" tag="a" class="sortitem-1" style="text-decoration:none;">都市青春</router-link></SortItem>
			<SortItem path="/sort/two"><router-link :to="{path:'/sort/two',query: {type:'玄幻奇幻'}}" tag="a" class="sortitem-1" style="text-decoration:none;">玄幻奇幻</router-link></SortItem>
			<SortItem path="/sort/three"><router-link :to="{path:'/sort/three',query: {type:'灵异未知'}}" tag="a" class="sortitem-1" style="text-decoration:none;">灵异未知</router-link></SortItem>
			<SortItem path="/sort/four"><router-link :to="{path:'/sort/four',query: {type:'历史军事'}}" tag="a" class="sortitem-1" style="text-decoration:none;">历史军事</router-link></SortItem>
			<SortItem path="/sort/five"><router-link :to="{path:'/sort/five',query: {type:'科技无限'}}" tag="a" class="sortitem-1" style="text-decoration:none;">科技无限</router-link></SortItem>
			<SortItem path="/sort/six"><router-link :to="{path:'/sort/six',query: {type:'游戏竞技'}}" tag="a" class="sortitem-1" style="text-decoration:none;">游戏竞技</router-link></SortItem>
			<SortItem path="/sort/seven"><router-link :to="{path:'/sort/seven',query: {type:'仙侠武侠'}}" tag="a" class="sortitem-1" style="text-decoration:none;">仙侠武侠</router-link></SortItem>
			<SortItem path="/sort/eight"><router-link :to="{path:'/sort/eight',query: {type:'免费同人'}}" tag="a" class="sortitem-1" style="text-decoration:none;">免费同人</router-link></SortItem>			
		</SortBar>
		
		<div class="sortNovel">
			<router-view :key="$route.fullPath"></router-view>
		</div>
	</div>
</template>

<script>
	import SortBar from "./SortBar.vue"
	import SortItem from "./SortItem.vue"
	export default {
		name: 'sortpage',
		data() {
				return {
						
				}
		},
		methods: {
			
		},
		components: {
			SortBar,
			SortItem
		},
		created() {
			// console.log(this.$route.query.type)
		}
	}
</script>

<style>
	.sortitem-1 {
				color: #606060;
	}
</style>
