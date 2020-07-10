<template>
	<header class="header">
		<div class="box">
      <router-link class="logo-box" to="/">
				<img class="logo" src="/public/imgs/logo.png" />
      </router-link>
			<router-link class="btn" to="/home"> Home主页 </router-link>
			<router-link class="btn" to="/list"> List列表 </router-link>
		</div>
	</header>
</template>

<script>
export default {
	data() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
@import '../styles/variable.scss';

.header {
  width: 100%;
  min-width: $pageWidth;
	background-color: $headerBgColor;
	/* 吸顶 */
	position: sticky;
	top: 0;
	z-index: 100;

	.box {
		padding: 12px 0;
		margin: 0 auto;
		max-width: $pageWidth;

		// border-left: 1px solid lightsalmon;
		// border-right: 1px solid lightsalmon;
		@include flex-row(justify-content, center);

		/* Logo */
		.logo-box {
			width: 60px;
			padding: 0 10px;
			margin-right: 10px;
			.logo {
				width: 100%;
			}
		}
		.btn {
			padding: 8px 12px;
			background-color: white;
			border-radius: 2px;
			outline: none;
			margin: 0 8px;
			min-width: 64px;
      text-decoration: none;
		}
	}
}
</style>
