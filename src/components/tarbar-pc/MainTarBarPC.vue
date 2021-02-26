<template>
	<TarBarPC class="tarbarpc">
		<!-- <TarBarItemPC @click="howToLink"><router-link to="/login" tag="a" style="text-decoration:none;"><Personal class="personal"></Personal></router-link></TarBarItemPC> -->
		<TarBarItemPC><div @click="howToLink"><Personal class="personal"></Personal></div></TarBarItemPC>
		<TarBarItemPC><div><router-link to="/home" tag="a" class="tarbaritempc" style="text-decoration:none;">主页</router-link></div></TarBarItemPC>
		<TarBarItemPC><div><router-link to="/sort" class="tarbaritempc" tag="a" style="text-decoration:none;">分类</router-link></div></TarBarItemPC>
		<TarBarItemPC><div><router-link to="/upload" class="tarbaritempc" tag="a" style="text-decoration:none;">上传</router-link></div></TarBarItemPC>
		<SearchBox class="searchbox"></SearchBox>
	</TarBarPC>
</template>

<script>
	import TarBarPC from "./TarBarPC.vue"
	import TarBarItemPC from "./TarBarItemPC.vue"
	import Personal from "../Personal.vue"
	import SearchBox from "../SearchBox.vue"
	export default {
		name: 'maintarbarpc',
		components:{
			TarBarPC,
			TarBarItemPC,
			Personal,
			SearchBox
		},
		methods: {
			howToLink() {
				if(window.localStorage.getItem("token") == null){
					this.$router.push('/login')
				}else{
					this.$router.push('/personal')
				}
			}
		}
	}
</script>

<style>
	@media screen and (min-width : 768px) {
		.personal {
			position: relative;
			top: 13px;
		}
		.tarbaritempc {
			position: relative;
			top: 20px;
			font-weight: 500;
			color: aliceblue;
		}
		.tarbaritempc:hover{
			color: #C8C8C8;
		}
		/deep/ .searchbox {
			position: absolute;
			flex: 3;
			/* top: 30px;
			right: 20px; */
		}
	}
	@media screen and (max-width : 768px) {
		.personal {
			position: relative;
			top: 10px;
		}
		.tarbaritempc {
			position: relative;
			top: 20px;
			font-weight: 500;
			color: aliceblue;
		}
		.tarbaritempc:hover{
			color: #C8C8C8;
		}
		/deep/ .searchbox {
			position: absolute;
			flex: 2.7;
			/* top: 30px;
			right: 20px; */
		}
	}
</style>
