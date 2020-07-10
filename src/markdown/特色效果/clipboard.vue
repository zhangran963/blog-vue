<template>
	<div class="clipboard-container">
		<h3>clipboard</h3>

		<p class="line">
			<input class="input" type="text" placeholder="复制值" v-model="text" /><span class="btn" @click="copyHandler"
				>复制</span
			>
		</p>

		<p class="line">
			<span class="btn" @click="readHandler">读取剪切板的值</span>
      <code class="read-res-box" ref="readResBox"></code>
		</p>
	</div>
</template>

<script>
export default {
	data() {
		return {
			text: '文本',
		};
	},
	methods: {
		/**
		 * 复制
		 */
		copyHandler() {
			navigator.clipboard
				.writeText(this.text)
				.then((_) => {
					console.log(`copyHandler.then: 成功`);
				})
				.catch((err) => {
					console.log(`copyHandler.catch: `, err);
				});
    },
    
    /**
     * 读取
     */
    readHandler(){
      navigator.clipboard.readText().then(text => {
        this.$refs.readResBox.innerText = text
        // console.log(`readText.then: `, this.$refs.readResBox)
      })
    }
	},
};
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';

.clipboard-container {
	.line {
		@include flex-row(flex-start, stretch);
    margin: 10px 0;
		.input,
		.btn {
			@include flex-row(center, center);
			height: 30px;
			line-height: 30px;
			box-sizing: border-box;
			border: 1px solid darkcyan;
			padding: 0 10px;
		}
		$radius: 2px;
		.input {
			border-right: none;
			border-radius: 0;

			border-top-left-radius: $radius;
			border-bottom-left-radius: $radius;
		}
		.btn {
			border-top-right-radius: $radius;
			border-bottom-right-radius: $radius;
      min-width: fit-content;
		}

    .read-res-box{
      border: 1px dashed darkcyan;
    }
	}
}
</style>
