import remark from "remark";
import html from "remark-html";
import matter from "gray-matter";

const path = require("path");
const fs = require("fs");
const $root = process.cwd();
const $md = path.resolve($root, "src/markdown");

import { getDirTree, filterInTree } from "./File";

/**
 * 获取md树
 */
export function getMDTree() {
  const $mdPath = path.join($root, "src/markdown");
  return getDirTree($mdPath, /\.md$/g);
}

/**
 * 递归获取文件路径
 * [{ slug: 'path1/path2/...' }]
 */
export function getMDPaths() {
  const tree = getMDTree();
  return filterInTree(tree, /\.md$/g);
}

/**
 * 获取markdown文件的内容
 * @param {array} slugArr 相对于markdown文件夹下的路径
 */
export function getMDBySlug(slugArr, fields = []) {
  const lastSlug = slugArr.pop();
  const filename = `${lastSlug}.md`;
  const fullPath = path.resolve($md, ...slugArr, filename);
  let res = {};
  try {
    const fileContent = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(fileContent);

    fields.forEach(field => {
      /* slug代表路径(文件夹名) */
      if (field === "slug") {
        res[field] = filename;
      }
      if (field === "content") {
        res[field] = content;
      }

      if (data[field]) {
        res[field] = data[field];
      }
    });
  } catch (err) {
    console.log(err);
  }
  return res;
}

/**
 * markdown内容转换成html内容
 * @param {string} markdown
 */
export async function markdownToHtml(markdown) {
  const result = await remark()
    .use(html)
    .process(markdown);
  return result.toString();
}
