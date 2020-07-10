<template>
	<div id="home">
		<!-- 目录块 -->
		<section class="catalog-box">
			<template v-for="(tree, index) of markdownTree">
				<!-- 过滤markdown根元素上的文件 -->
				<template v-if="tree.isDirectory">
					<com-md-tree :key="index" :tree="tree.value" :title="tree.key"></com-md-tree>
				</template>
			</template>
		</section>

		<ul class="number-box">
			<li>
				注册总人数： <span class="red"> {{ totalRegister }} </span>
			</li>
			<li>
				登录激活总人数： <span class="red">{{ totalActiver }} </span>
			</li>
			<li>
				最高月活人数： <span class="red"> {{ topMouthActiver }} </span>
			</li>
			<li>
				今日登录人数： <span class="red"> {{ todayLogin }} </span>
			</li>
		</ul>
	</div>
</template>
<script>
import { init } from '../../api/home';
import { mapGetters } from 'vuex';
import ComMdTree from './md-tree';

export default {
	// 服务端路由进来时，就会触发这个函数
	// 触发请求，服务端获取数据，存到vuex中
	asyncData({ store, route }) {
		// 触发 action 后，会返回 Promise
		return store.dispatch('getHomeData');
	},
	name: 'home',
	title: 'Home',
	components: {
		ComMdTree,
	},
	data() {
		return {
			markdownTree: null,
		};
	},
	computed: {
		// 使用对象展开运算符将 getter 混入 computed 对象中
		...mapGetters(['totalRegister', 'topMouthActiver']),
		totalActiver() {
			return this.$store.getters.totalActiver;
		},
		todayLogin() {
			return this.$store.getters.todayLogin;
		},
	},
	mounted() {
		const state = this.$store.state;
		this.markdownTree = state.markdownTree;
	},
};
</script>

<style scoped lang="scss">
#home {
	.title {
		color: #f36;
		font-size: 20px;
		text-align: center;
		margin-bottom: 20px;
	}
	.description {
		margin-bottom: 20px;
		font-weight: bolder;
	}
	
  .number-box {
		font-size: 18px;
    padding: 20px 0 10px;
    li{
      list-style-type: none;
    }
		.red {
			color: #f36;
		}
	}

  .catalog-box{
    display: grid;

    grid-template-columns: repeat(3, 32%);
    row-gap: 10px;
    justify-content: space-between;
  }
}
</style>
