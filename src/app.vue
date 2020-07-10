<template>
	<div id="app">
		<com-header></com-header>
		<!-- <transition name="fade" mode="out-in"> -->
		<router-view class="view"></router-view>
		<!-- </transition> -->
		<com-footer></com-footer>
	</div>
</template>
<script>
import ComHeader from './components/header';
import ComFooter from './components/footer';
export default {
	components: {
		ComHeader,
		ComFooter,
	},
};
</script>
<style lang="scss">
@import '@/styles/variable.scss';

* {
	margin: 0;
	padding: 0;
}
body {
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans',
		'Droid Sans', 'Helvetica Neue', sans-serif;
	font-size: 15px;
	background-color: lighten(#eceef1, 30%);
	margin: 0;
	color: #34495e;
	overflow-y: scroll;

	#app {
		width: 100%;
		min-height: 100vh;
    position: relative;
	}
	.view {
		width: $pageWidth;
		margin: 10px auto;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.2s ease;
	}

	.fade-enter,
	.fade-leave-active {
		opacity: 0;
	}
}

div {
	box-sizing: border-box;
}
</style>
