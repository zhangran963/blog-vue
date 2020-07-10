<template>
  <footer id="footer">
    <div class="top">
      <div class="content">
        <div class="left top-item">
          <h2>合作伙伴</h2>
          <hr>
          <ul>
            <li>大煎饼铺子</li>
            <li>铁匠炉子</li>
          </ul>
        </div>
        <div class="center top-item">
          <h2>FAQ</h2>
          <hr>
          <ul>
            <li>如何搭建一个vue ssr环境？</li>
          </ul>
        </div>
        <div class="right top-item">
          <h2>联系方式</h2>
          <hr>
          <ul>
            <li>邮箱：<a class="emailLink" target="_blank" href="mailto:zhangran963@gmail.com">zhangran963@gmail.com</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="content">Copyright© 2020 - {{nowYear}} | Author <a class="authorLink" href="https://github.com/zhangran963">ran</a> | All Rights Reserved | Power by <a class="vueLink" href="javascript:;">Vue</a> & <a class="vueLink" href="javascript:;">SSR</a></div>
    </div>
  </footer>
</template>
<script>
  export default {
    name: 'MyFooter',
    created() {
      this.nowYear = new Date().getFullYear()
    }
  }
</script>
<style lang="scss" scoped>
@import "@/styles/variable.scss";

#footer{
  width: 100%;
  min-width: $pageWidth;

  /** footer吸底 */

  .content{
    width: $pageWidth;
    margin: 0 auto;
  }

  .top{
    min-height: 116px;
    .content{
      display: grid;
      grid-template-columns: 230px auto auto;
    }
  } 
}
</style>


<style scoped lang="stylus">
  #footer
    background-color #222
    color #ccc
    clear both
    .top
      width 100%
      text-align center
      .top-item
        display inline-block
        width 280px
        text-align left
        vertical-align top
        .emailLink
          color #f66
          text-decoration none
        h2
          font-size 18px
          font-weight normal
          margin-top 20px
          height 26px
        hr
          width 90%
          border 1px dashed #333
        ul
          font-size 14px
          color #777
          text-indent 20px
          line-height 2
    .bottom
      height 60px
      line-height 60px
      text-align center
      color #777
      background-color #000
      border-top 1px solid #444
      .authorLink
        color #f36
      .vueLink
        color #42b983
</stylescss>
