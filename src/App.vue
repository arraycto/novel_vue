<template>
  <div id="app">
		<BackgroudImg></BackgroudImg>
		<Layout></Layout>
  </div>
</template>

<style>
	
</style>

<script>
	import Layout from "./components/Layout.vue"
	import BackgroudImg from "./components/BackgroundImg.vue"
  export default {
		name: 'App',
		components:{
			Layout,
			BackgroudImg
		},
		data() {
			return{
				
			}
		},
		created() {
			this.$store.commit('updataUserName')
			this.$store.commit('updataImg')
		}
  };
</script>