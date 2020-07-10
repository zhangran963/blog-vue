/**
 * 在markdown文档中, 需要定向到vue页面中;
 * 使用方式: <my-router redirect immediate href="路径"></my-router>
 */

import { isBool } from "@/tools/utils";

export default {
  bind() {
    /* 调用1次, 绑定到元素时调用 */
  },
  inserted: function(el /* 绑定的DOM */, info, VNode) {
    /* DOM, info: {expression:键, value: 值, name: '名称', modifiers: {描述符: true}}, VNode */
    setTimeout(() => {
      /* 全部图片 */
      const myRouterEle = el.querySelector(`my-router`);
      if (myRouterEle) {
        function getBoolAttribute(key = "") {
          let value = myRouterEle.getAttribute(key);
          return isBool(value) ? value : value === null ? false : true;
        }

        /* 是否: 立即跳转 */
        /**
         * 无: null = 默认不跳转, 点击跳转
         * 键: null = 立即跳转
         * 键值(其他) = 立即跳转
         * 键值(布尔) = 原
         */

        let redirect = getBoolAttribute("redirect");
        let immediate = getBoolAttribute("immediate");

        const callback = () => {
          const url = myRouterEle.getAttribute("href");
          /* 立即执行 */
          if (redirect) {
            window.location.replace(url);
          } else {
            window.location.href = url;
          }
        };

        /* 是否立即执行 */
        if (immediate) {
          callback();
        } else {
          myRouterEle.onclick = function(event) {
            callback();
          };
        }
      }
    }, 0);
  },
  update() {},
  componentUpdated() {},
  unbind() {}
};
