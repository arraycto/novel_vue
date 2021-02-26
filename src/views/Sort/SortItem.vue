<template>
	<div class="sortitem" :class="{active1:isActive}">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'sortitem',
		props:{
			path:String
		},
		computed: {
			isActive() {
				// 当前哪个路由处于活跃，就显示相关属性
				return this.$route.path.indexOf(this.path) !==-1
			}
		}
	}
</script>

<style>
	@media screen and (min-width : 768px) {
		.sortitem {
			flex: 1;
			font-size: 16px;
			/* height: 49px; */
			line-height:3;
			text-align: center;
		}
		.active1 {
			background-color: rgb(255,247,232);
			font-weight: 600;
		}
	}
	@media screen and (max-width : 768px) {
		.sortitem {
			flex:1 1 auto;
			font-size: 16px;
			/* height: 49px; */
			line-height:3;
			text-align: center;
			width: 25%;
		}
		.active1 {
			background-color: rgb(255,247,232);
			font-weight: 600;
		}
	}
</style>
