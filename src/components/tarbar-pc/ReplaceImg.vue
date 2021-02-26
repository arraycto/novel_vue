<template>
	<div>
		<el-switch
		  v-model="value1"
			@change="putaway"
			class="imgswitch hidden-xs-only"
			active-color="#484848"
			inactive-color="#A0A0A0">
		</el-switch>
		<i class="el-icon-refresh-right" @click="replaceImg"></i>
	</div>

</template>

<script>
	export default {
		name: 'replaceimg',
		data() {
			return {
				value1: true
			}
		},
		methods:{
			putaway(){
				this.$store.commit('putawayImg',this.value1)
			},
			replaceImg(){
				this.$store.commit('replace')	
			}
		}
	}
</script>

<style>
	@media screen and (min-width : 768px) {
		.imgswitch {
		/* 	position: fixed;
			left: 10px;
			top: -33px;
			z-index: 10; */
			/* position: fixed; */
			left: 5px;
			top: -30px;
			z-index: 10;
		}
		.el-icon-refresh-right{
			position: absolute;
			/* left: 80px; */
			margin-left: 20px;
			top: 19px;
			font-size: 25px;
		}
		.el-icon-refresh-right:hover{
			color: rgb(92,182,255);
		}
	}
	@media screen and (max-width : 768px) {
		.el-icon-refresh-right{
			position: absolute;
			/* left: 80px; */
			right: 12px;
			top: 19px;
			font-size: 25px;
		}
		.el-icon-refresh-right:hover{
			color: rgb(92,182,255);
		}
	}
</style>
