const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {

 
  configureWebpack: {
    module: {
      rules: [
        {
          test: /.html$/,
          loader: "vue-template-loader",
          exclude: /index.html/,
          options: {
            transformAssetUrls: {
              video: ['src', 'poster'],
              source: 'src',
              img: 'src',
              image: 'xlink:href'
            }
          }
        },
        //Make sure to add a loader that can process the asset files
        // {
        //   test: /\.(png|jpg|jpeg|gif)$/,
        //   loader: 'file-loader',
        //   options: {
        //     name: '[name].[ext]',
        //     outputPath : 'images/',
        //     publicPath : function(path){
        //         return '../' + path;
        //     }
        //     /* es2015ならば
        //     publicPath : path => '../' + path
        //     で書けます。*/
        //   }
        // },
      ]
    }
  }
}
