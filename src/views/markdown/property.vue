<template>
	<div class="property-container">
		<p class="property-box">
			<span class="left">标题：</span>
			<span class="text">{{ title }}</span>
		</p>
		<p class="property-box">
			<span class="left">创建时间：</span>
			<span class="text">{{ createAt }}</span>
		</p>
		<p class="property-box">
			<span class="left">关键字：</span>
			<span class="item" v-for="(item, i) of keys" :key="i">{{ item }}</span>
		</p>
	</div>
</template>

<script>
import { isObj, isStr } from '@/tools/utils/index';
export default {
	props: ['markdown'],
	data() {
		return {};
	},
	computed: {
		title() {
			const { title = '' } = this.markdown;
			return title;
		},
		createAt() {
			const { createAt = '' } = this.markdown;
			return createAt;
		},
		keys() {
			if (isStr(this.markdown.keys)) {
				return this.markdown.keys.split(/\s+/g);
			} else {
				return [];
			}
		},
	},
	mounted() {
		
	},
};
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';

/* 关键字 */
.property-container {
	padding: 10px 0;
	border-top: 1px dashed;
	border-bottom: 1px dashed;
	display: grid;
	grid-template-columns: repeat(2, 44%);
	gap: 10%;

	.property-box {
		@include flex-row(flex-start, center);
		padding: 3px 0;
		/* 标题 */
		.left {
			display: inline-block;
			min-width: 60px;
		}

		.text,
		.item {
			word-wrap: break-word;
			word-break: break-all;
		}
		/* 单项 */
		.item {
			list-style-type: none;
			border: 1px solid;
			height: 18px;
			line-height: 18px;
			@include flex-row(center, center);
			margin: 0 6px 0 0;
			padding: 0 4px;
			font-size: 14px;
			border-radius: 2px;
		}
	}
}
</style>
