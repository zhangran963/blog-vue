<template>
	<div class="markdown-container">
		<com-property :markdown="markdown"></com-property>
		<div class="content" v-html="markdownHTML" v-md-img v-md-my-router></div>
	</div>
</template>

<script>
import ComProperty from './property';
import { isObj, isStr } from '@/tools/utils/index';
import DMdImg from '@/directives/md-img';
import DMdMyRouter from '@/directives/md-my-router';

export default {
	asyncData({ store, route }) {
		const { params: { pathMatch = '' } = {} } = route;
		const mdPaths = pathMatch.split(/\/+/g).filter(Boolean);
		/* 解析路径, 获取文件内容 */
		store.dispatch('getMarkdown', mdPaths);
	},
	title() {
		/* 标题 */
		return this.markdown.title;
	},
	components: { ComProperty },
	directives: {
    'md-img': DMdImg,
    'md-my-router': DMdMyRouter
	},
	data() {
		return {
			markdownHTML: '',
		};
	},
	computed: {
		markdown() {
			let markdown = this.$store.state.markdown;
			if (isObj(markdown)) {
				return markdown;
			} else {
				return {};
			}
		},
	},
	mounted() {
		/* 内容 */
    this.markdownHTML = this.markdown.content;
    console.log('*** 页面接受到数据: ', this.markdown.title)
	},
};
</script>

<style lang="scss">
@import '../../styles/variable.scss';

$mdBorderRadius: 6px;
$codeColor: lightgoldenrodyellow;
$codeBgColor: #2d2d2d;

.markdown-container {
	/* 内容 */
	> .content {
    h1, h2, h3, h4, h5{
      margin-top: 24px;
      margin-bottom: 4px;
    }
		/* 适配markdown中的图片 */
		/* 样式好看, 带有阴影的图片 */
		padding-top: 20px;
		img {
			// width: -webkit-fill-available;
			max-width: calc(100% - 2 * 20px);
			border-radius: $mdBorderRadius;
			box-shadow: inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
			margin: 20px;
			box-sizing: border-box;
		}
		/* code样式 */
		code[class*='language-'],
		pre[class*='language-'] {
			border-radius: 4px;
		}
		/* 自定义(普通)code的样式 */
		code:not([class*='language-']) {
			color: $codeColor;
			background-color: $codeBgColor;
			padding: 3px 5px;
			border-radius: 6px;
			max-width: 100%;
			line-height: 1.8em;
			word-break: break-all;
			white-space: normal;

			/* 垂直居中 */
			position: relative;
			top: -0.15em;
		}

		/* 适当增加行间距 */
		p {
			line-height: 1.8em;
		}
		$paddingLeft: 18px;
		ul,
		ol {
			border-radius: 6px;
			padding: 0.5em;
			padding-left: $paddingLeft;
			li {
				line-height: 1.1em;
				list-style-type: none;
				list-style-position: outside;
				margin-bottom: 0.4em;

				&:last-child {
					margin-bottom: 0;
				}
			}
		}
		ul {
			li {
				position: relative;
				&::before {
					content: '';
					display: inline-block;
					height: 14px;
					width: 14px;
					position: absolute;
					top: 50%;
					transform: translate(-$paddingLeft, -50%);
					background: url('data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAFEElEQVRYhe2WaWxVVRDHf3Pfe+deEAwgLokQQQyiQkQ2BYH3CJSyKCpSESxLEK0CQrFUKm5PRPZ9MZKQuERQNCkoBMSUrYalIFAtSJUgIiEmKEqIROi794wf3mNtS2s/4BcnmeTek3P+//+ZyZkZ+N/+Y5OaHGrynDbREBsUmqdAfnSg55ElcvTfYjk1EWCU/sZnyy9LRH5ZImJ8tkR8Hq8JVrhGhyyu43Aye4fGAQre56S1uNdMQC0L1oKxyf+IX8NQUtMUWPB8CNuke/5FMRVZLK6VXrRCAdGh+nZ0iP7cdajO6jxY65cTkCI0pNwm18oRD9cW0SG6Rg9zNjZEF1dLQHqmdnF9BnnKI57P9bWhNG2wjsvIUHN+j2vB9SFik+76ybULGBnaIH2wzjdlFBqfzRKioQnolfaUdq9SgEkwxQS81vNp0tKzKKpl6OEFpJ912N9voPYH8BJgNHVzm/z2EhCLabjfQB1jhIMmwDRqROueWYQeGs4oY8n1fKZdyVcuNyagpSP8FFZKnYC53YeSo0JO4WJ8HGb3H6DjxXJMLUfO591NYBHuv6Eh30rA8SCge7ex3CKWArUcxzLOTdASuLFKAW7AM8CqokWscYQnO4+mHcriHqM5QoLMwndpL5CJMt9AHwDPZ6V1uBNLXiybQ9YyVyxNEXK2LuGoWOZ50BhhUJUpWLFK8uuFucMLOB7xKdm1kAd/WEsHz7LWDbE5bTQPRMcycMVq2XU+Bcs/l5LuWWSlvUCPiKXQUzYUf0a0aB7pXoLNxmdTWZjWy/Nl55V8Vy3FI3tro1CY11D6oLzVZgRrrqvL68BjCNOxxBBEYavARIGPTx9mavFaHsUhDqwp83n1vfXyW2Uc1eoF43ppexVmK/y9aL30+mSDthRhJcrdqS37Q5AxIF1Kx/bWLcAZG5Cz+CsprQq7WpXQ9fkLhzOq1Eod8kOWS0uPo5LEMpazjlIncKhbHeyrRiCvs9YPe0xEGY4yr9njfHBTU/KAQSgzRIiqoKpsEchDWQ3Et8+hC8JMR9gdgrx4gfxUGUeFlTAe0/Dkbvps7TAHTIL6YZfW0Qn82qgJ+4zSIByiVd++Mjei7DOW4of6yPza52jhCqeMsD+Wwz1Nu9DW+OxxfHZNjuqCeEzrVSsC07tqJ1GWKRzD8mLHV7gZZR7KSQnI3j6L20QYqsLkjrnJFrxzJusEpqnyUdsxbDN1mKLCA1he3bmQAs7yJsrDOIyaWCj5VxUwv5MeFSG3/UvsdRymqnKfKpN2z+CgwlyUW1U45MD+DhPxAYpmEAGaAo0V6mKZ0PFlAhXmAAm1jC+aiQp8kb1dLitG5VIQCThhEiQMZEQs35xYQbT4bbpFAja6Pl+ccrnXDSiKBDgXmlGAmICS7O3SxVgmu8o7e6eS+900hrnKUuPQybPc7gZ8fyVf+UpoyQOWlrxBO2sYgVLswQob4q6RO+QPgGXtFYdkKwbwLBeexOidkv/pPbr2dG2eF0vBvimsRnjHKKscYViVAkbulo0ftdEvcTiJzzpH6Dp4z+Xv2bPAJQOJ8S+P5RMHpAxYsLyVfmgjTBJhFbA8c498XaUAgMy9MiaOjo0jFY4ZbgKskww/QETBSZTf91SJ/AnkprxCq7QQVUYOqZtfEgGvgmGkulajmdD44DgXo+6lZsRrJsC1nMPS5NYMyQLY1FyXAr9fMwG1ysi3Ib7c1kwVAEspAVNrgvW//ef2D40V/vlFNs1dAAAAAElFTkSuQmCC')
						no-repeat;
					background-size: contain;
				}
			}
		}
		ol {
			li {
				list-style-type: decimal;
			}
		}
		/* 符号 > */
		blockquote {
			margin: 1em 0;
			p {
				line-height: 1.2em;
			}
		}
	}

  hr{
    margin: 14px 0;
  }

  /* 我的路由 */
  my-router{
    border: 1px dashed lightblue;
    border-radius: 2px;
    padding: 6px 12px;
    margin: 10px;
    cursor: pointer;
  }
}
</style>
