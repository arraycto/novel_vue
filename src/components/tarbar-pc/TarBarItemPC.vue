<template>
	<div class="tarbaritem-pc">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'tarbaritempc'
	}
</script>

<style>
	.tarbaritem-pc {	
		flex: 1;
		font-size: 15px;
		height: 49px;
	}
</style>
