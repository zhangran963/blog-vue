export default {
  // HOME
  SET_TOTALREGISTER: (state, num) => {
    state.totalRegister = num;
  },
  SET_TOTALACTIVER: (state, num) => {
    state.totalActiver = num;
  },
  SET_TOPMOUTHACTIVER: (state, num) => {
    state.topMouthActiver = num;
  },
  SET_TODAYLOGIN: (state, num) => {
    state.todayLogin = num;
  },

  // project
  SET_ALLPROJECT: (state, list) => {
    state.projectList = list;
  },

  // current detail
  SET_DETAIL: (state, obj) => {
    state.detail = obj.item;
    state.totalCount = obj.total;
  },
  /* markdown树 */
  SET_MARKDOWNTREE(state, tree) {
    state.markdownTree = tree;
  },
  /* (某个)markdown文档内容 */
  SET_MARKDOWN: (state, obj) => {
    state.markdown = obj;
  }
};
