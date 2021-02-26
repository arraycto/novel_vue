<template>
	<div class="personalPage">
		<BasicMessage></BasicMessage>
		<MyCollection></MyCollection>
		<MyUpload></MyUpload>
	</div>
</template>

<script>
	import BasicMessage from './BasicMessage.vue'
	import MyCollection from './MyCollection.vue'
	import MyUpload from './MyUpload.vue'
	export default {
		name: 'personalpage',
		components: {
			BasicMessage,
			MyCollection,
			MyUpload
		}
	}
</script>

<style>
	@media screen and (min-width : 768px) {
		.personalPage {
			position: absolute;
			left: 20%;
			width: 60%;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
		}
	}
	@media screen and (max-width : 768px) {
		.personalPage {
			position: absolute;
			left: 2%;
			width: 96%;
			margin-top: 30px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
		}
	}
</style>
