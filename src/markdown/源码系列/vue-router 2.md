---
title: "vue-router2的基本源码"
keys: "源码 vue-router"
createAt: "2020年11月13日 15:39"
---

[原教程地址](https://study.163.com/course/courseLearn.htm?courseId=1209644871#/learn/live?lessonId=1280184900&courseId=1209644871)

# 使用

``` js
/* main.js: Vue实例 */
import Vue from 'vue'
import App from './App'
import router from './router'

new Vue({
    el: '#app',
    router,
    template: `<div>
      <router-view></router-view>
    </div>`
})

/* router.js: 路由配置 */
import Vue from "vue";
import Router from "../self-router/index";
import HelloWorld from "@/components/HelloWorld";

Vue.use(Router);

export default new Router({
    routes: [{
            path: "/",
            name: "HelloWorld",
            component: HelloWorld
        },
        {
            path: "/test",
            name: "test",
            component: () => import("@/components/test")
        }
    ]
});
```

***

# 模拟vue-router

``` js
/**
 * 存储当前路径
 */
class HistoryRoute {
    constructor() {
        this.current = null;
    }
}

/**
 * 路由构造器
 */
export default class VueRouter {
    constructor(options) {
        this.mode = options.mdoe || "hash"; /* 模式 */
        this.routes = options.routes || []; /* 配置文件的路由 */
        this.routesMap = this.createMap(); /* 格式化成 {路径: 组件} 形式的路由 */
        this.history = new HistoryRoute(); /* 当前显示的路由 */
        this.init();
    }

    init() {
        if (this.mode === "hash") {
            /* 哈希模式 */
            location.hash ? "" : (location.hash = "/");
            window.addEventListener("load", () => {
                this.history.current = location.hash.slice(1);
            });
            window.addEventListener("hashchange", () => {
                this.history.current = location.hash.slice(1);
            });
        } else if (this.mode === "history") {
            /* history模式 */
        }
    }

    /**
     * 生成 {路径: 组件} 形式的路由
     */
    createMap() {
        return this.routes.reduce((prev, curr) => {
            prev[curr.path] = curr.component;
            return prev;
        }, {});
    }

    /**
     * 跳转页面
     */
    push(path, data) {
        window.location.hash = path;
    }

    /**
     * 注入每个组件中
     * @param {class} Vue Vue的构造器
     */
    static install(Vue) {
        Vue.mixin({
            beforeCreate() {
                const {
                    router: optRouter
                } = this.$options;
                if (optRouter) {
                    /* 有router, 是根组件, 只有根组件才有router属性 */
                    this._root = this;
                    this._router = optRouter; /* 路由实例 */
                    /* 监听 */
                    Vue.util.defineReactive(this, "current", this._router.history);
                } else {
                    /* 非根组件, 取父实例上的_root(递归后, 也是就是根实例) */
                    this._root = this.$parent._root;
                }

                /* 拓展$router属性, 不支持更改值 */
                Object.defineProperty(this, "$router", {
                    get() {
                        return this._root._router; /* 路由实例 */
                    }
                });
            }
        });

        Vue.component("router-view", {
            render(h) {
                /* 路径 */
                let current = this._self._root._router.history.current;
                /* 组件 */
                let routesMap = this._self._root._router.routesMap;
                /* 开始渲染 */
                return h(routesMap[current]);
            }
        });
    }
}
```
