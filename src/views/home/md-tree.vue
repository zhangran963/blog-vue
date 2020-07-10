<template>
	<div class="md-tree-box">
		<!-- 返回按钮 -->
		<div class="return-box" :class="disablePrev && 'disabled'" @click="goBack">{{ title }}</div>
		<!-- 列表 -->
		<ul class="items">
			<li
				v-for="(item, i) of currItems"
				:key="i"
				class="item"
				:class="item.isDirectory && 'icon-arrow-right'"
				@click="openItem(item, i)"
			>
				{{ item.key }}
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: ['tree', "title"],
	data(vm) {
		return {
			deepIndexs: [],
		};
	},
	computed: {
		/* 禁用"返回上一层" */
		disablePrev() {
			return this.deepIndexs.length <= 0;
		},
		/* 数据深度 */
		deep() {
			return this.deepIndexs.length;
		},
		/* 当前显示的(某一层)数据 */
		currItems() {
			const currTree = this.tree || [];
			let res = [];
			if (this.deep === 0) {
				res = currTree;
			} else {
				res = this.deepIndexs.reduce((prev, curr, index) => {
					let currGroup = prev[curr];
					return currGroup.value;
				}, currTree);
			}
			return res;
		},
	},
	mounted() {
    },
  updated(){
    console.log('props',this.tree)
  },
	methods: {
		/* 打开 文件(夹) */
		openItem(item, i) {
			if (item.isDirectory) {
				this.deepIndexs = [...this.deepIndexs, i];
			} else {
				const href = `/markdown/${item.realPath}`;
				this.$router.push(href);
			}
		},
		/* 返回 */
		goBack() {
			if (this.disablePrev) return;
			let deepIndexs = this.deepIndexs.concat();
			deepIndexs.pop();
			this.deepIndexs = deepIndexs;
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../../styles/variable.scss';

$mainColor: #ffa7a7;
.md-tree-box {
	user-select: none;
	height: auto;
	min-height: 120px;
	max-height: 300px;
	border: 1px solid $mainColor;
	border-radius: $borderRadius-m;
	overflow-y: scroll;
  box-sizing: border-box;

	/* 返回 */
	.return-box {
		@include flex-row(center, center);
		position: sticky;
		top: 0;
		height: 36px;
		cursor: pointer;

		background-color: $mainColor;
		&.disabled {
			// color: $mainColor;
			background-image: none;
			cursor: default;
		}

		background-image: url('data:image/jpg;base64,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');
		background-position: left 10px center;
		background-size: 30px auto;
		background-repeat: no-repeat;
	}

	/* 列表 */
	.items {
		cursor: pointer;
		.item {
			padding: 0.5em;

			&:nth-child(odd) {
				background-color: #fff3cd;
			}
			&:nth-child(even) {
				background-color: #ffe8df;
			}
		}
	}
}
</style>
