<template>
	<div class="pointer-container">
		鼠标箭头样式

		<ul class="items">
			<li class="item" v-for="(item, index) of pointers" :key="index" :style="item.style">
				<code>{{ item.style }}</code>
				<pre>{{ item.description }}</pre>
			</li>
		</ul>

    <hr>

    <h2>如下是MDN:cursor文档中的示例</h2>
		<table class="standard-table">
			<tbody>
				<tr>
					<th>类型</th>
					<th>CSS值</th>
					<th></th>
					<th>描述</th>
				</tr>
				<tr style="cursor: auto;">
					<td rowspan="3">General</td>
					<td><code>auto</code></td>
					<td></td>
					<td>
						<p>
							浏览器根据当前内容决定指针样式<br />
							例如当是内容是文字时使用text样式
						</p>
					</td>
				</tr>
				<tr style="cursor: default;">
					<td><code>default</code></td>
					<td><img alt="default.gif" src="/@api/deki/files/3438/=default.gif" style="height: 26px; width: 26px;" /></td>
					<td>默认指针，通常是箭头。</td>
				</tr>
				<tr style="cursor: none;">
					<td><code>none</code></td>
					<td></td>
					<td>无指针被渲染</td>
				</tr>
				<tr style="cursor: context-menu;">
					<td rowspan="5" style="cursor: auto;">链接及状态</td>
					<td><code>context-menu</code></td>
					<td>
						<img
							alt="context-menu.png"
							src="/@api/deki/files/3461/=context-menu.png"
							style="height: 26px; width: 26px;"
						/>
					</td>
					<td>指针下有可用内容目录。</td>
				</tr>
				<tr style="cursor: help;">
					<td><code>help</code></td>
					<td><img alt="help.gif" src="/@api/deki/files/3442/=help.gif" style="height: 26px; width: 26px;" /></td>
					<td>指示帮助</td>
				</tr>
				<tr style="cursor: pointer;">
					<td><code>pointer</code></td>
					<td><img alt="pointer.gif" src="/@api/deki/files/3449/=pointer.gif" style="height: 26px; width: 26px;" /></td>
					<td>悬浮于连接上时，通常为手</td>
				</tr>
				<tr style="cursor: progress;">
					<td><code>progress</code></td>
					<td>
						<img alt="progress.gif" src="/@api/deki/files/3450/=progress.gif" style="height: 26px; width: 26px;" />
					</td>
					<td>程序后台繁忙，用户仍可交互 (与<code>wait相反</code>).</td>
				</tr>
				<tr style="cursor: wait;">
					<td><code>wait</code></td>
					<td><img alt="wait.gif" src="/@api/deki/files/3457/=wait.gif" style="height: 26px; width: 26px;" /></td>
					<td>程序繁忙，用户不可交互 (与<code>progress相反</code>).图标一般为沙漏或者表。</td>
				</tr>
				<tr style="cursor: cell;">
					<td rowspan="4" style="cursor: auto;">选择</td>
					<td><code>cell</code></td>
					<td><img alt="cell.gif" src="/@api/deki/files/3434/=cell.gif" style="height: 26px; width: 26px;" /></td>
					<td>指示单元格可被选中</td>
				</tr>
				<tr style="cursor: crosshair;">
					<td><code>crosshair</code></td>
					<td>
						<img alt="crosshair.gif" src="/@api/deki/files/3437/=crosshair.gif" style="height: 26px; width: 26px;" />
					</td>
					<td>交叉指针，通常指示位图中的框选</td>
				</tr>
				<tr style="cursor: text;">
					<td><code>text</code></td>
					<td><img alt="text.gif" class="default" src="/files/3809/text.gif" style="height: 26px; width: 26px;" /></td>
					<td>指示文字可被选中</td>
				</tr>
				<tr style="cursor: vertical-text;">
					<td><code>vertical-text</code></td>
					<td>
						<img
							alt="vertical-text.gif"
							src="/@api/deki/files/3456/=vertical-text.gif"
							style="height: 26px; width: 26px;"
						/>
					</td>
					<td>指示垂直文字可被选中</td>
				</tr>
				<tr style="cursor: alias;">
					<td rowspan="7" style="cursor: auto;">拖拽</td>
					<td><code>alias</code></td>
					<td><img alt="alias.gif" src="/@api/deki/files/3432/=alias.gif" style="height: 26px; width: 26px;" /></td>
					<td>复制或快捷方式将要被创建</td>
				</tr>
				<tr style="cursor: copy;">
					<td><code>copy</code></td>
					<td>
						<img
							alt="copy.gif"
							class="default"
							src="/@api/deki/files/3436/=copy.gif"
							style="height: 26px; width: 26px;"
						/>
					</td>
					<td>指示可复制</td>
				</tr>
				<tr style="cursor: move;">
					<td><code>move</code></td>
					<td><img alt="move.gif" src="/@api/deki/files/3443/=move.gif" style="height: 26px; width: 26px;" /></td>
					<td>被悬浮的物体可被移动</td>
				</tr>
				<tr style="cursor: no-drop;">
					<td><code>no-drop</code></td>
					<td>
						<img
							alt="no-drop.gif"
							class="lwrap"
							src="/@api/deki/files/3445/=no-drop.gif"
							style="float: left; height: 26px; width: 33px;"
						/>
					</td>
					<td>
						当前位置不能扔下<br />
						<a class="external" href="https://bugzilla.mozilla.org/show_bug.cgi?id=275173" rel="noopener"
							>bug&nbsp;275173</a
						>Windows或Mac OS X中 "no-drop 与not-allowed相同".
					</td>
				</tr>
				<tr style="cursor: not-allowed;">
					<td><code>not-allowed</code></td>
					<td>
						<img
							alt="not-allowed.gif"
							src="/@api/deki/files/3446/=not-allowed.gif"
							style="height: 26px; width: 26px;"
						/>
					</td>
					<td>不能执行</td>
				</tr>
				<tr id="grab">
					<td><code>grab</code></td>
					<td><img alt="grab.gif" class="default" src="/@api/deki/files/3440/=grab.gif" /></td>
					<td>
						<p>可抓取</p>

						<p>译者注:grab和grabbing在比较后期才被支持，见浏览器兼容表</p>
					</td>
				</tr>
				<tr>
					<td><code>grabbing</code></td>
					<td><img alt="grabbing.gif" class="default" src="/@api/deki/files/3441/=grabbing.gif" /></td>
					<td>抓取中</td>
				</tr>
				<tr style="cursor: all-scroll;">
					<td rowspan="15" style="cursor: auto;">重设大小及滚动</td>
					<td><code>all-scroll</code></td>
					<td>
						<img alt="all-scroll.gif" src="/@api/deki/files/3433/=all-scroll.gif" style="height: 26px; width: 26px;" />
					</td>
					<td>
						元素可任意方向滚动 （平移）.<br />
						<a class="external" href="https://bugzilla.mozilla.org/show_bug.cgi?id=275174" rel="noopener"
							>bug&nbsp;275174</a
						>Windows中, "<em>all-scroll</em> 与 <em>move相同</em>".
					</td>
				</tr>
				<tr style="cursor: col-resize;">
					<td><code>col-resize</code></td>
					<td>
						<img alt="col-resize.gif" src="/@api/deki/files/3435/=col-resize.gif" style="height: 26px; width: 26px;" />
					</td>
					<td>元素可被重设宽度。通常被渲染为中间有一条竖线分割的左右两个箭头</td>
				</tr>
				<tr style="cursor: row-resize;">
					<td><code>row-resize</code></td>
					<td>
						<img alt="row-resize.gif" src="/@api/deki/files/3451/=row-resize.gif" style="height: 26px; width: 26px;" />
					</td>
					<td>
						<p>元素可被重设高度。通常被渲染为中间有一条横线分割的上下两个箭头</p>
					</td>
				</tr>
				<tr style="cursor: n-resize;">
					<td><code>n-resize</code></td>
					<td>
						<img
							alt="Example of a resize towards the top cursor"
							src="/files/4083/n-resize.gif"
							style="border-style: solid; border-width: 0px; height: 26px; width: 26px;"
						/>
					</td>
					<td rowspan="8" style="cursor: auto;">
						某条边将被移动。例如元素盒的东南角被移动时<code>使用se-resize</code>
					</td>
				</tr>
				<tr style="cursor: e-resize;">
					<td><code>e-resize</code></td>
					<td>
						<img
							alt="Example of a resize towards the right cursor"
							src="/files/4085/e-resize.gif"
							style="height: 26px; width: 26px;"
						/>
					</td>
				</tr>
				<tr style="cursor: s-resize;">
					<td><code>s-resize</code></td>
					<td>
						<img
							alt="Example of a resize towards the bottom cursor "
							src="/files/4087/s-resize.gif"
							style="height: 26px; width: 26px;"
						/>
					</td>
				</tr>
				<tr style="cursor: w-resize;">
					<td><code>w-resize</code></td>
					<td>
						<img
							alt="Example of a resize towards the left cursor"
							src="/files/4089/w-resize.gif"
							style="height: 26px; width: 26px;"
						/>
					</td>
				</tr>
				<tr style="cursor: ne-resize;">
					<td><code>ne-resize</code></td>
					<td>
						<img
							alt="Example of a resize towards the top-right corner cursor"
							src="/files/4091/ne-resize.gif"
							style="height: 26px; width: 26px;"
						/>
					</td>
				</tr>
				<tr style="cursor: nw-resize;">
					<td><code>nw-resize</code></td>
					<td>
						<img
							alt="Example of a resize towards the top-left corner cursor"
							src="/files/4093/nw-resize.gif"
							style="height: 26px; width: 26px;"
						/>
					</td>
				</tr>
				<tr style="cursor: se-resize;">
					<td><code>se-resize</code></td>
					<td>
						<img
							alt="Example of a resize towards the bottom-right corner cursor"
							src="/files/4097/se-resize.gif"
							style="height: 26px; width: 26px;"
						/>
					</td>
				</tr>
				<tr style="cursor: sw-resize;">
					<td><code>sw-resize</code></td>
					<td>
						<img
							alt="Example of a resize towards the bottom-left corner cursor"
							src="/files/4095/sw-resize.gif"
							style="height: 26px; width: 26px;"
						/>
					</td>
				</tr>
				<tr style="cursor: ew-resize;">
					<td><code>ew-resize</code></td>
					<td>
						<img alt="3-resize.gif" class="default" src="/files/3806/3-resize.gif" style="height: 26px; width: 26px;" />
					</td>
					<td rowspan="4" style="cursor: auto;">指示双向重新设置大小</td>
				</tr>
				<tr style="cursor: ns-resize;">
					<td><code>ns-resize</code></td>
					<td>
						<img alt="6-resize.gif" class="default" src="/files/3808/6-resize.gif" style="height: 26px; width: 26px;" />
					</td>
				</tr>
				<tr style="cursor: nesw-resize;">
					<td><code>nesw-resize</code></td>
					<td><img alt="1-resize.gif" class="default" src="/files/3805/1-resize.gif" /></td>
				</tr>
				<tr style="cursor: nwse-resize;">
					<td><code>nwse-resize</code></td>
					<td>
						<img alt="4-resize.gif" class="default" src="/files/3807/4-resize.gif" style="height: 26px; width: 26px;" />
					</td>
				</tr>
				<tr style="cursor: zoom-in;">
					<td rowspan="2">缩放</td>
					<td><code>zoom-in</code></td>
					<td><img alt="zoom-in.gif" class="default" src="/@api/deki/files/3459/=zoom-in.gif" /></td>
					<td rowspan="2" style="cursor: auto;">
						<p>指示可被放大或缩小</p>
					</td>
				</tr>
				<tr style="cursor: zoom-out;">
					<td><code>zoom-out</code></td>
					<td><img alt="zoom-out.gif" class="default" src="/@api/deki/files/3460/=zoom-out.gif" /></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	data() {
		return {
			pointers: [
				{
					style: { cursor: 'default' },
					description: `
        默认值
        `,
				},
				{
					style: { cursor: `url('/public/imgs/star.png') 16 16, auto` },
					description: `
        自定义图片;
        图片位置, 默认在左上角;
        指定x y值(正数), 使偏移点居图片中心;
        `,
				},
				{
					style: { cursor: `cursor: url(one.svg), url(two.svg) 5 5, 'progress'` },
					description: `
        cursor: url(one.svg), url(two.svg) 5 5, progress;
        指定两个图像, 如果两个图像都无法加载，则返回progress关键字值
        `,
				},
			],
		};
	},
};
</script>

<style lang="scss" scoped>
.pointer-container {
  
}

.items {
	.item {
		margin: 10px;
		padding: 10px 0;
		border: 1px dashed;
	}
}



tr{
  td:nth-child(1){
    width: fit-content;
    code{
      white-space: nowrap;
    }
  }
}
</style>
