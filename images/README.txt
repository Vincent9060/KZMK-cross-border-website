images 文件夹说明：

你可以把项目中的本地图片放到这里，例如：
- banner-1.jpg
- banner-2.jpg
- banner-3.jpg
- product-1.jpg
- product-2.jpg
- product-3.jpg
- product-4.jpg

当前代码为了开箱即用，默认使用了在线图片链接。
如果你想切换为本地图片，只需要修改以下位置：

1. index.html
   - 三个 Banner 背景图 URL

2. js/lang.js
   - productsData 中每个产品的 image 字段

例如：
image: "../images/product-1.jpg"
或首页：
background-image: linear-gradient(...), url('../images/banner-1.jpg');

建议图片尺寸：
- Banner：1600 x 800 以上
- 产品图：800 x 800 或 900 x 700
