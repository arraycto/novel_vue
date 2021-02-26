<template>
	<div class="upload">
		<Basic></Basic>
	</div>
</template>

<script>
	import Basic from './Basic.vue'
	export default {
		name: 'upload',
		components: {
			Basic
		}
	}
</script>

<style>
	@media screen and (min-width : 768px) {
		.upload {
			position: absolute;
			width: 100%;
			height: 90%;
			top: 80px;
			overflow-x: hidden; 
			overflow-y: auto;
		}
	}

</style>
