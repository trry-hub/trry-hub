## chrome 搜索页样式

```css
/* --------全局样式------------ */

/**  右侧栏的样式-其实不开启更好看一些 */
#content_right {
    padding: 20px 15px 15px;
    border-radius: 5px;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}
#content_right:hover {
    background-position: 100% 0;
}

/****  可以加一些自己的背景图片,替换引号内的内容为可外链的图片即可  ****/
body[google] {
    background-repeat: repeat-y;
    background-size: 100%;
    background-attachment: fixed;

    /* background: linear-gradient(to right bottom, green, #fff, #e2efe1, rgb(255, 175, 132)), #e2efe1; */

    /* background-size: 200%; */
    transition: background-position 0.5s;

    /* background-image: url("https://s3.ax1x.com/2020/12/13/rZREan.jpg"); */
}

/* ---------- */

/* -------搜索区域内容--------- */

/* google 搜索icon */
.z1asCe svg {
    color: #ff6700;
}
.gLFyf,
.jKWzZXdEJWi__suggestions-inner-container .sbl1 span {
    /* color: #4e6ef2 !important; */
}

/* --------- */

/* --------搜索结果区域内容--------- */

/**  计数器的颜色样式 */
div .AC-CounterT {
    color: #fff !important;
    box-shadow: 1px 1px 0 0 rgba(158, 143, 143, 0.06), 7px 7px 18px 0 rgba(0, 0, 0, 0.03),
        1px 1px 0 0 rgba(255, 255, 255, 0.86), -7px -7px 26px 0 #fff;
    background-color: violet;
}
div .AC-CounterT::after {
    content: "";
    width: 22px;
    display: block;
    position: relative;
    top: 50%;
    left: 50%;
    filter: blur(3px);
    background: rgba(0, 0, 0, 0.02);
    box-shadow: 1px 1px 0 0 #fff, 1px 1px 1px 0 #fff,
        1px 1px 0 0 rgba(0, 0, 0, 0.13);
}

/* ---------- */

/* ---------底部区域----------- */

/* 当前选中的页码 */
#xjs tr .YyVfkd {
    background-color: #409eff;
    color: #fff;
}
#xjs tr .d6cvqb a span {
    margin-left: 0 !important;
    margin-right: 0 !important;
    text-align: center;
    padding: 0 15px;
}

/* -----结束了----- */
.YSlUOe,
.Xeztj,
.MGqjK {
    background-color: transparent !important;
}
div.AEprdc.vk_c {
    width: auto;
}
.LHJvCe,
.hide-focus-ring a span {
    color: #ff6700 !important;
}
#hdtb {
    border-bottom: 1px solid transparent !important;
    color: #fff !important;
}
.minidiv .sfbg {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    background: transparent !important;
}
.aajZCb {
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
    background: transparent !important;
}
.gb_Pc,
.gb_9d .gb_3e {
    display: flex !important;
    align-items: center;
}
.sbhl {
    background: rgba(255, 255, 255, 0.3) !important;
}
#rhs {
    display: none !important;
}
#rso .g,
.vk_c {
    width: unset;
    margin-left: 20px;
    overflow: hidden;
    padding: 10px 20px 15px;
    margin-top: 0;
    margin-bottom: 25px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.8);
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.1);
}
#rso .g:hover,
.uMdZh:hover {
    background: rgba(255, 255, 255, 0.3) !important;
    transition: all 0.3;
}
#rso .LnbJhc {
    display: none;
}
#rso .g:hover {
    z-index: 2;

    /* -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: all 0.1s; */
}
#rso .g a h3 span {
    color: #ff6700;
}
#rso .g a:visited h3 span {
    color: #00c17f;
}
#rso .hlcw0c {
    margin-bottom: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
    grid-template-areas: "xmain xmain";
}
.ULSxyf {
    padding-left: 15px;
    box-sizing: border-box;
    display: none !important;
}
#rso .hlcw0c .aCOpRe .f,
#rso .g .aCOpRe .f {
    color: #409eff;
    padding: 0 10px;
    border-radius: 5px;
}

/**  隐藏首页的大图标-修复可能导致外援样式异常  **/
body[baidu] #s_lg_img_new {
    display: none !important;
}
#wrapper #content_left .result,
#wrapper #content_left .c-container {
    border-radius: 25px;
}
#footcnt,
#brs,
.SJajHc,
#botstuff {
    display: none !important;
}
#xjs tr td {
    display: inline-block;
    margin: 0 5px;
    background-color: #f4f4f5;
    line-height: 30px;
    min-width: 30px;
    border-radius: 2px;
}
.AaVjTc a:link {
    color: #606266 !important;
}
#xjs tr td:hover a {
    color: #409eff !important;
    transition: all 0.3s;
}
.sfbg,
.RNNXgb,
.yg51vc {
    background: inherit !important;
}

/* 百度页面样式 */
#wrapper #content_left .result,
#wrapper #content_left .c-container {
    margin: 0;
    padding: 0;
}
#wrapper #s_tab {
    background-color: transparent;
}
#wrapper #content_left .result,
#wrapper #content_left .c-container {
    border-radius: 5px;
}
#wrapper #content_left .result,
#wrapper #content_left .c-container {
    width: unset;
    margin-left: 20px;
    overflow: hidden;
    padding: 10px 20px 15px;
    margin-top: 0;
    margin-bottom: 25px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.8);
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.1);
}
#wrapper #content_left .result:hover,
#wrapper #content_left .c-container:hover {
    z-index: 2;
    -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: all 0.1s;
}
```
