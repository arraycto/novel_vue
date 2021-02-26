<template>
	<div>
		<div style="position:fixed; width:100%; height:100%; z-index:-1;" v-show="putaway2">
			<img :src="count" :height="putawayImg" width="100%"/>
		</div>
		<div class="closeBackgroudImg" style="height: 52px; overflow: hidden; ">
			<img :src="count" width="100%" v-show="!putaway2"/>	
		</div>
	</div>

</template>

<script>
	export default {
		name: 'backgroundimg',
		data() {
			return{
				putaway2: "ture"
			}
		},
		computed:{
			count(){
				if(window.screen.availWidth >= 768){
					// src绑定图片地址时需要require
					return require("../assets/img-pc/" + this.$store.state.a.imgnum + ".jpg")
				}else{
					return require("../assets/img-mobile/" + this.$store.state.a.imgnum + ".png")
				}

			},
			putawayImg(){
				this.putaway2 = this.$store.state.a.putaway
				if(this.$store.state.a.putaway){
					return "100%"
				}else{
					return "10%"
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style>
</style>
