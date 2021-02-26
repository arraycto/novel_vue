<template>
	<div id="tab-bar">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'tarbarpc'
	}
</script>

<style>

	@media screen and (min-width : 768px){
		#tab-bar {
			display: flex;
			position: fixed;
			width: 50%;
			left: 50%;
			right: 0;
			top: 0;
			/* justify-content:flex-end; */
		}
	}
	@media screen and (max-width : 768px){
		#tab-bar {
			display: flex;
			position: fixed;
			width: 90%;
			left: 2%;
			right: 8%;
			top: 0;
			/* justify-content:flex-end; */
		}
	}
</style>
