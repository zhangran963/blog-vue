const fs = require("fs");
const path = require("path");
const excludeNames = [
  "README.md",
  "node_modules",
  "package-lock.json",
  "package.json",
  "dist",
  /^\./g
];
import { isRegExp, isStr } from "./utils";

const maxDeep = 20; /* 最大查询深度 */
let deep = 0; /* 查询深度 */
/**
 * 递归解析文件夹路径;
 * 结构化文件路径
 * @param {url} dirPath
 * @param {RegExp} includeReg 文件(夹)的格式
 */
export function getDirTree(dirPath, includeReg) {
  try {
    fs.accessSync(dirPath, fs.constants.R_OK | fs.constants.W_OK);
    getDirTree.$root = getDirTree.$root || dirPath;
    deep++;

    if (deep < maxDeep) {
      let dirPathChild = null;
      try {
        dirPathChild = fs.readdirSync(dirPath);
      } catch (error) {
        dirPathChild = [];
      }

      /* 过滤某些不符合规则的文件 */
      dirPathChild = dirPathChild
        .filter(item => {
          return excludeNames.every(exItem => {
            let res = true;
            if (isRegExp(exItem)) {
              /* 不符合异常规则 */
              res = item.match(exItem) === null;
            } else if (isStr(exItem)) {
              /* 不符合异常字符串 */
              res = item !== exItem;
            }
            return res;
          });
        })
        .filter(item => {
          if (item.includes(".")) {
            return item.match(includeReg) !== null;
          } else {
            return true;
          }
        })
        .map(item => {
          /* 路径 */
          let fullPath = path.resolve(dirPath, item);

          try {
            /* 判断: 是否文件 */
            let stat = fs.statSync(fullPath);
            const mode = (stat.mode & parseInt("777", 8)).toString(8);
            const isDirectory = stat.isDirectory();

            /* 单项结构: 路径/是否文件/名称/子 */
            /* 644: 只有拥有者有读写权限；而属组用户和其他用户只有读权限 */
            /* 755: 拥有者有读、写、执行权限；而属组用户和其他用户只有读、执行权限 */
            return {
              fullPath,
              realPath: getRealPath(fullPath, getDirTree.$root),
              isDirectory,
              isFile: stat.isFile(),
              key: item,
              mode,
              value:
                isDirectory && mode === "755"
                  ? getDirTree(fullPath, includeReg)
                  : item
            };
          } catch (error) {
            return null;
          }
        });

      deep--;
      return dirPathChild;
    } else {
      deep--;
      return [];
    }
  } catch (error) {
    return null;
  }
}

/**
 * 在树中过滤合格的文件
 * @param {RegExp} reg 过滤用的正则表达式
 */
export function filterInTree(tree, reg) {
  /* 获取全部项目 */
  let treeArray = flatifyTree(tree);
  /* 过滤出 图片 */
  /* 注: 更改字符串的 RegExp.lastIndex 不生效 */
  return treeArray.filter(
    ({ fullPath = "" }) => fullPath && fullPath.match(reg)
  );
}

/**
 * 转换: 树>数组
 * @param {*} tree 结构树
 * @returns {Array<object>} 结果
 */
export function flatifyTree(tree) {
  let res = [];

  Array.isArray(tree) &&
    tree.forEach(item => {
      if (item.isFile) {
        res.push(item);
      } else if (Array.isArray(item.value)) {
        res = res.concat(flatifyTree(item.value));
      }
    });

  return res;
}

function getRealPath(fullPath, $root) {
  let [, noextPath = ""] = /(.+)\.(\w)+/g.exec(fullPath) || [];
  noextPath = noextPath.replace($root, "");
  return noextPath.replace(/^\/{0,}/g, "");
}
