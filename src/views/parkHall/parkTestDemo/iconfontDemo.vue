<template>
    <div>
        <div class="main markdown">
            <h1>IconFont图标</h1>

            <ul class="icon_lists clear">
                <li>
                    <i class="icon iconfont icon-tuozhuai"></i>
                    <div class="name">拖拽</div>
                    <div class="fontclass">.icon-tuozhuai</div>
                </li>

                <li>
                    <i class="icon iconfont icon-guangbo"></i>
                    <div class="name">广播</div>
                    <div class="fontclass">.icon-guangbo</div>
                </li>

                <li>
                    <i class="icon iconfont icon-xiazai"></i>
                    <div class="name">下载</div>
                    <div class="fontclass">.icon-xiazai</div>
                </li>

                <li>
                    <i class="icon iconfont icon-touxiang1-copy"></i>
                    <div class="name">头像</div>
                    <div class="fontclass">.icon-touxiang1-copy</div>
                </li>

                <li>
                    <i class="icon iconfont icon-shuoming"></i>
                    <div class="name">说明</div>
                    <div class="fontclass">.icon-shuoming</div>
                </li>

                <li>
                    <i class="icon iconfont icon-tishi"></i>
                    <div class="name">提示 (4)</div>
                    <div class="fontclass">.icon-tishi</div>
                </li>

                <li>
                    <i class="icon iconfont icon-riqi"></i>
                    <div class="name">日期</div>
                    <div class="fontclass">.icon-riqi</div>
                </li>

                <li>
                    <i class="icon iconfont icon-tuijianren"></i>
                    <div class="name">推荐人</div>
                    <div class="fontclass">.icon-tuijianren</div>
                </li>

                <li>
                    <i class="icon iconfont icon-delete"></i>
                    <div class="name">delete</div>
                    <div class="fontclass">.icon-delete</div>
                </li>

                <li>
                    <i class="icon iconfont icon-faburen"></i>
                    <div class="name">发布人</div>
                    <div class="fontclass">.icon-faburen</div>
                </li>

                <li>
                    <i class="icon iconfont icon-collect2"></i>
                    <div class="name">爱心</div>
                    <div class="fontclass">.icon-collect2</div>
                </li>

                <li>
                    <i class="icon iconfont icon-shafa"></i>
                    <div class="name">沙发</div>
                    <div class="fontclass">.icon-shafa</div>
                </li>

                <li>
                    <i class="icon iconfont icon-gouxuan"></i>
                    <div class="name">勾选</div>
                    <div class="fontclass">.icon-gouxuan</div>
                </li>

                <li>
                    <i class="icon iconfont icon-queren"></i>
                    <div class="name">确认</div>
                    <div class="fontclass">.icon-queren</div>
                </li>

                <li>
                    <i class="icon iconfont icon-shijian"></i>
                    <div class="name">时间</div>
                    <div class="fontclass">.icon-shijian</div>
                </li>

                <li>
                    <i class="icon iconfont icon-dizhi"></i>
                    <div class="name">地址</div>
                    <div class="fontclass">.icon-dizhi</div>
                </li>

                <li>
                    <i class="icon iconfont icon-liulan"></i>
                    <div class="name">浏览</div>
                    <div class="fontclass">.icon-liulan</div>
                </li>

                <li>
                    <i class="icon iconfont icon-piaozhong"></i>
                    <div class="name">票种</div>
                    <div class="fontclass">.icon-piaozhong</div>
                </li>

                <li>
                    <i class="icon iconfont icon-pinglun"></i>
                    <div class="name">评论</div>
                    <div class="fontclass">.icon-pinglun</div>
                </li>

                <li>
                    <i class="icon iconfont icon-riqi1"></i>
                    <div class="name">日期</div>
                    <div class="fontclass">.icon-riqi1</div>
                </li>

                <li>
                    <i class="icon iconfont icon-shijian1"></i>
                    <div class="name">时间</div>
                    <div class="fontclass">.icon-shijian1</div>
                </li>

                <li>
                    <i class="icon iconfont icon-wenben"></i>
                    <div class="name">文本</div>
                    <div class="fontclass">.icon-wenben</div>
                </li>

                <li>
                    <i class="icon iconfont icon-biaoqing"></i>
                    <div class="name">表情</div>
                    <div class="fontclass">.icon-biaoqing</div>
                </li>

                <li>
                    <i class="icon iconfont icon-tupian1"></i>
                    <div class="name">图片</div>
                    <div class="fontclass">.icon-tupian1</div>
                </li>

            </ul>

            <h2 id="font-class-">font-class引用</h2>

            <hr>

            <p>font-class是unicode使用方式的一种变种，主要是解决unicode书写不直观，语意不明确的问题。</p>
            <p>与unicode使用方式相比，具有如下特点：</p>

            <ul>
                <li>兼容性良好，支持ie8+，及所有现代浏览器。</li>
                <li>相比于unicode语意明确，书写更直观。可以很容易分辨这个icon是什么。</li>
                <li>因为使用class来定义图标，所以当要替换图标时，只需要修改class里面的unicode引用。</li>
                <li>不过因为本质上还是使用的字体，所以多色图标还是不支持的。</li>
            </ul>

            <p>使用步骤如下：</p>

            <h3 id="-fontclass-">第一步：引入项目下面生成的fontclass代码：</h3>

            <pre><code class="lang-js hljs javascript"><span class="hljs-comment">&lt;link rel="stylesheet" type="text/css" href="./iconfont.css"&gt;</span></code></pre>

            <h3 id="-">第二步：挑选相应图标并获取类名，应用于页面：</h3

            <pre><code class="lang-css hljs">&lt;<span class="hljs-selector-tag">i</span> <span
                class="hljs-selector-tag">class</span>="<span class="hljs-selector-tag">iconfont</span> <span
                class="hljs-selector-tag">icon-xxx</span>"&gt;&lt;/<span
                class="hljs-selector-tag">i</span>&gt;</code></pre>

            <blockquote>
                <p>"iconfont"是你项目下的font-family。可以通过编辑项目查看，默认是"iconfont"。</p>
            </blockquote>
        </div>
    </div>
</template>

<style lang='less' scoped>
    @import "../../../assets/font/demo.css";
</style>
