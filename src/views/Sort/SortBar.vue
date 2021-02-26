<template>
	<div class="sortbar">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'sortbar'
	}
</script>

<style>
	@media screen and (min-width : 768px){
		.sortbar {
			display: flex;
			position: fixed;
			width: 100%;
			right: 0;
			top: 53px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
			/* background-color: rgb(255,255,255); */
			/* justify-content:flex-end; */
		}
	}
	
	@media screen and (max-width : 768px){
		.sortbar {
			display: flex;
			flex-wrap: wrap;
			position: fixed;
			width: 100%;
			right: 0;
			top: 63px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
			/* background-color: rgb(255,255,255); */
			/* justify-content:flex-end; */
		}
	}
</style>
