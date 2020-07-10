/**
 * 在markdown文档中, 若截图带有阴影, 可以在属性中声明 no-shadow, 以使用截图自身的阴影;
 * 使用方式:
 * ![no-shadow 备注说明](https://databasing.oss-cn-beijing.aliyuncs.com)
 *
 *
 * 在markdown文档中, 默认添加[]中的注释到图片底部, 若[]中声明 no-title, 责不会生成;
 */

/* 关键字 */
const noShadowStr = "no-shadow";
const noTitleStr = "no-title";

export default {
  bind() {
    /* 调用1次, 绑定到元素时调用 */
  },
  inserted: function(el /* 绑定的DOM */, info, VNode) {
    /* DOM, info: {expression:键, value: 值, name: '名称', modifiers: {描述符: true}}, VNode */
    setTimeout(() => {
      /* 全部图片 */
      const imgEles = el.querySelectorAll(`img`);

      Array.from(imgEles).forEach(imgEle => {
        let originAltArr = imgEle.getAttribute("alt").split(/\s+/g);
        const hasNoShadow = originAltArr.includes(noShadowStr);
        const hasNoTitle = originAltArr.includes(noTitleStr);
        const newAlt = originAltArr
          .filter(item => ![noShadowStr, noTitleStr].includes(item))
          .join(" ");

        /* 是否包含 no-shadow 属性 */
        if (hasNoShadow) {
          /* 过滤掉关键字后合并, 恢复到alt属性中 */
          imgEle.setAttribute("alt", newAlt);
          /* 强制覆盖(默认)阴影 */
          imgEle.style.cssText = `margin: 0; max-width: 100%; box-shadow: none;`;
        }

        /* 是否包含 no-title 属性 */
        const parent = imgEle.parentNode;
        parent.style.cssText = `display: inline-block`;
        if (hasNoTitle) {
          console.log("禁用title");
        } else {
          /* 过滤掉关键字后合并, 恢复到alt属性中 */
          imgEle.setAttribute("alt", newAlt);

          /* 插入文本框 和 样式 */
          parent.innerHTML += `<span style="
            position: absolute; 
            bottom: ${hasNoShadow ? "12px" : "0px"}; 
            left: 50%; 
            transform: translateX(-50%);
            text-align: center;
            font-size: 1.12em;
            color: gray;
            ">
            ${newAlt}
          </span>`;

          parent.style.cssText += `position: relative;`;
        }
      });
    }, 0);
  },
  update() {},
  componentUpdated() {},
  unbind() {}
};
