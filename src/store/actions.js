import { getAll } from "../api/home";
import { getProjectList, getItem } from "../api/detail";
import { getMarkdownContent } from "../api/markdown";
import { getMDTree } from "../tools/md-tools";

export default {
  getAllData({ commit }) {
    return getAll().then(res => {
      commit("SET_TOTALREGISTER", res.totalRegister);
      commit("SET_TOTALACTIVER", res.totalActiver);
      commit("SET_TOPMOUTHACTIVER", res.topMouthActiver);
      commit("SET_TODAYLOGIN", res.todayLogin);
    });
  },
  getAllProject({ commit }) {
    return getProjectList().then(res => {
      commit("SET_ALLPROJECT", res);
    });
  },
  fetchItem({ commit }, id) {
    return getItem(id).then(res => {
      commit("SET_DETAIL", res);
    });
  },

  /* 首页 */
  getHomeData({ commit }) {
    let tree = getMDTree();
    commit("SET_MARKDOWNTREE", tree);
    return getAll().then(res => {
      commit("SET_TOTALREGISTER", res.totalRegister);
      commit("SET_TOTALACTIVER", res.totalActiver);
      commit("SET_TOPMOUTHACTIVER", res.topMouthActiver);
      commit("SET_TODAYLOGIN", res.todayLogin);
    });
  },
  /* markdown页 */
  getMarkdown({ commit }, mdPaths) {
    return getMarkdownContent(mdPaths).then(res => {
      commit("SET_MARKDOWN", res);
    });
  }
};
