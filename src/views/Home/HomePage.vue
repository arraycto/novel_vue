<template>
	<div>
		<Carousel></Carousel>
		<Recommend></Recommend>
	</div>
</template>

<script>
	import Carousel from "./Carousel.vue"
	import Recommend from "./Recommend.vue"
	export default {
		name: 'homepage',
    data () {
      return {

      }
    },
		components: {
			Carousel,
			Recommend
		}
	}
</script>

<style>

</style>
