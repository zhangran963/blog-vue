---
title: "模拟Koa源码demo"
keys: "源码 Koa"
createAt: "2020年7月12日 13:54"
---

[原教程地址](https://aotu.io/notes/2020/05/18/koa-demo/)

# 简易Moa的实例

* 主要模拟部分在 `Moa` 文件夹
* 次要模拟部分在 `Moa-router` 文件夹
* 应用执行部分在 `moa.js`
***

## 执行文件(总文件)

``` js
const Moa = require('./Moa/index');

/* 实现Moa类 */
const app = new Moa();
const Router = require('./Moa-router/index');

/* 实现Router类 */
const router = new Router();

/* 实现.use方法 */
/* 先公共处理 */
app.use(async (ctx, next) => {
    ctx.body = '*****';
    await next();
});

/* 再路由处理 */
router.get('/', async (ctx) => {
    ctx.body += 'index page';
});
router.get('/12345', async (ctx) => {
    ctx.body += ctx.request.url;
});
router.get('*', async (ctx) => {
    ctx.body += '404404404404';
});

app.use(router.routes());

const port = 3002;
app.listen(port, () => {
    console.log('* 已启动:', `http://localhost:${port}` );
});
```

## Moa类

``` js
const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');

/**
 * Moa类
 */
module.exports = class Moa {
    constructor() {
        /* 存储用于 app.use 的函数数组 */
        this._middleWares = [];
    }

    /* 函数: 注册中间件 */
    use(fn = () => {}) {
        if (typeof fn === 'function') {
            this._middleWares.push(fn);
        }
    }

    /* 启动服务 */
    listen(port = 3002, cb = () => {}) {
        /* "串行执行中间件"函数 */
        /* 中间件: 生成(中间件函数数组)串行化函数 */
        const middleWaresHandler = Moa.compose(this._middleWares);
        http
            .createServer(async (req, res) => {
                if (req.url === '/favicon.ico') {
                    res.writeHead(200);
                    return res.end();
                }

                /* 创建ctx对象 */
                let ctx = Moa.createContext(req, res);

                /* 中间件: 执行 */
                await middleWaresHandler(ctx);

                /* ctx.body是存储对象, 最后手动执行res.end() */
                res.setHeader('Content-Type', 'application/json; charset=utf-8');
                res.writeHead(200);
                res.end(ctx.body);
            })
            .listen(port, cb);
    }

    static createContext(req, res) {
        /* 继承 ctx.__proto__ === {get body(){}, set body(){}} */
        let ctx = Object.create(context);
        ctx.request = Object.create(request);
        ctx.response = Object.create(response);

        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;

        return ctx;
    }

    /**
     * 串行化中间件
     * 标识static, 使其能 Moa.compose, 而不是 实例.compose
     * @param {function[]} middleWares 中间件函数数组
     */
    static compose(middleWares = []) {
        /* 每个请求需要执行的 中间件总函数 */
        return function(ctx) {
            /* 起始函数: 0 */
            return dispatch(0);

            function dispatch(index) {
                /* 当前函数 */
                const fn = middleWares[index];
                // console.log('* fn', fn)
                if (typeof fn === 'function') {
                    return Promise.resolve(
                        fn(ctx, function next() {
                            return dispatch(index + 1);
                        })
                    );
                } else {
                    return Promise.resolve();
                }
            }
        };
    }
};
```

## context.js

``` js
/**
 * ctx实例的继承源
 */
module.exports = {
    get body() {
        const _body = this.response.body
        return _body;
    },
    set body(value) {
        this.response.body = value;
    },
};
```

## request.js

``` js
/**
 * ctx.request 的继承源
 * ctx.request = Object.create(require('request.js'));
 */
module.exports = {
    get url() {
        return this.req.url;
    },
    get method() {
        return this.req.method.toLowerCase();
    },
};
```

## response.js

``` js
/* Symbol值当做键, 保证 外部不能直接读取 */
const bodyKey = Symbol('body的key值');
/**
 * ctx.response 的继承源
 * ctx.response = Object.create(require('response.js'));
 */
module.exports = {
    [bodyKey]: null,
    get body() {
        return this[bodyKey];
    },
    set body(value) {
        this[bodyKey] = value;
    },
};
```

## router.js

``` js
/**
 * MoaRouter类
 */
module.exports = class Router {
    constructor() {
        this.stacks = [];
        this.defStack = null;
    }

    /* 注册路由 */
    _register(path, method, callback) {
        const stack = {
            path,
            method: method.toLowerCase(),
            callback
        };
        if (path === '*') {
            this.defStack = stack;
        } else {
            this.stacks.push(stack);
        }
    }

    /* get */
    get(path, callback) {
        this._register(path, 'get', callback);
    }

    /* post */
    post(path, middleware) {
        this._register(path, 'post', middleware);
    }

    routes() {
        /* app.use()的对象 */
        return async (ctx, next) => {
            /* 查找条件: 路径和方法 */
            const url = ctx.req.url === '/index' ? '/' : ctx.req.url;
            const method = ctx.request.method;
            let route = this.stacks.find((item) => item.path === url && item.method === method.toLowerCase());

            /* 找到(合格的方法)方法, 执行 */
            if (typeof route === 'object' && typeof route.callback === 'function') {
                await route.callback(ctx, next);
            } else if (this.defStack) {
                await this.defStack.callback(ctx, next);
            } else {
                await next();
            }
        };
    }
}
```

***
***

## 结果
![no-shadow 访问根目录/](https://databasing.oss-cn-beijing.aliyuncs.com/markdown/20200712183535.png)

![no-shadow 访问/12345](https://databasing.oss-cn-beijing.aliyuncs.com/markdown/20200712165939.png)

![no-shadow 访问/aaaa](https://databasing.oss-cn-beijing.aliyuncs.com/markdown/20200712170049.png)
