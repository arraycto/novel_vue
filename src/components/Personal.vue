<template>
	<el-badge is-dot hidden class="item">
		  <el-popover 
		    placement="bottom"
		    width="150"
		    :trigger="triggerMethods"
				:close-delay="closedelay">
		    <div class="demo-basic--circle" slot="reference" style="outline: 0 !important;">
		    	<div class="block">
						<!-- <el-avatar :size="size" :src="circleUrl" class="portrait"></el-avatar> -->
						<img :src="circleUrl" class="portrait">
					</div>
		    </div>
				<Message></Message>
		  </el-popover>
<!-- 		<div class="demo-basic--circle" @mouseenter="bigger" @mouseleave="smaller">
			<div class="block"><el-avatar :size="size" :src="circleUrl"></el-avatar></div>
		</div> -->
	</el-badge>

</template>

<script>
	import Message from "./personal-message/Message.vue"
	export default {
		name: 'personal',
		data () {
			return {
				closedelay:70,
				size: 35
			}
		},
		components: {
			Message
		},
		computed: {
			triggerMethods() {
				if(window.screen.availWidth >= 768){
					// src绑定图片地址时需要require
					return "hover"
				}else{
					return "click"
				}
			},
			circleUrl(){
				return this.$store.state.a.userImg
			}
		}
	}
</script>

<style>
	.portrait{
		transition: all .5s;
	}
	.block .portrait {
			width: 36px;
			height: 36px;
			border-radius: 18px;
	}
	.block .portrait:hover {
			width: 44px;
			height: 44px;
			border-radius: 22px;
	}
</style>
