<template>
	<div>
		<div class="title animated fadeInDown hidden-xs-only">亿观的扫书站</div>
		<MainTabBarPC class="animated fadeInDown"></MainTabBarPC>
		<ReplaceImg></ReplaceImg>
		<keep-alive include='homepage'>
			<router-view></router-view>
		</keep-alive>
		
	</div>
</template>

<script>
	import MainTabBarPC from "./tarbar-pc/MainTarBarPC.vue"
	import ReplaceImg from "./tarbar-pc/ReplaceImg.vue"
	export default {
		name: 'Layout',
		components: {
			MainTabBarPC,
			ReplaceImg
		}
	}
</script>

<style scoped>
	.title {
		position: absolute;
		top: 7px;
		left: 22%;
		font-size: 30px;
		text-shadow: 5px 5px 5px black, 0px 0px 2px black; 
		color: white;
	}
</style>
