import { getMDBySlug, markdownToHtml } from "../tools/md-tools";
import { isObj, isStr } from "../tools/utils";

/**
 * 根据路由获取文件内容
 * @param {string[]} mdPaths (markdown之后的)分段路由数组
 */
export async function getMarkdownContent(mdPaths) {
  let mdObj = getMDBySlug(mdPaths, [
    "title",
    "keys",
    "date",
    "createAt",
    "slug",
    "author",
    "content",
    "coverImage"
  ]);
  if (isObj(mdObj) && isStr(mdObj.content)) {
    mdObj.content = await markdownToHtml(mdObj.content || "");
  } else {
    mdObj = null;
  }
  return mdObj;
}
