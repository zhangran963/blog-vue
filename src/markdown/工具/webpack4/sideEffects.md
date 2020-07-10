---
title: "sideEffects"
keys: "webpack webpack4 sideEffects"
description: ""
created: "2020年7月23日 10:27"
---

## sideEffects

[说明](https://webpack.js.org/configuration/optimization/#optimizationsideeffects)


* 坑: 直接设置成false, 不能生成css文件

``` json
sideEffects: false,
```

* 忽略某些包含css的文件

``` json
sideEffects: [
    "*.vue",
    "*.css"
]
```
