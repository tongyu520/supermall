module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views"
        /* 由于router和store只在main.js里引用，且其他地方只需要 this.$router就可以，所以不需要 */
      }
    }
  },
  publicPath:'/dist/'  //为了部署到服务器，将打包后的dist文件夹放在www下。
};
