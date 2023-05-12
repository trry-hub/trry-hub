<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vitepress'
import Typed from 'typed.js'
interface IconRow {
  title: string
  themeColor: string
  icon: string
  link?: string
  path?: string
}

const router = useRouter()

// 获取根元素
var root = document.querySelector(':root');
// 获取根元素的样式对象
var style = getComputedStyle(root as Element);
// 获取 --main-color 的值
var mainColor = style.getPropertyValue('--vp-c-brand');

const iconList = [
  {
    title: 'Blog',
    themeColor: mainColor,
    // themeColor: '#428bca',
    icon: 'home',
    path: 'trry-github/src/leetcode/2021-10/29',
  },
  {
    title: 'GitHub',
    themeColor: '#333',
    icon: 'line-md:github',
    link: 'https://github.com/trry-github',
  },
  {
    title: 'QQ',
    themeColor: '#0099ff',
    icon: 'qq',
  },
  {
    title: '掘金',
    themeColor: '#1e80ff',
    icon: 'i-tabler:brand-juejin',
    link: 'https://juejin.cn/user/2620826707309208',
  },
  {
    title: 'csdn',
    themeColor: '#fc5531',
    icon: 'csdn-logo',
    link: 'https://blog.csdn.net/weixin_40637683?spm=1000.2115.3001.5343',
  },
  {
    title: 'Diary',
    themeColor: '#e1306c',
    icon: 'line-md:heart',
  },
  {
    title: 'YouTube',
    themeColor: '#de463b',
    icon: 'i-ant-design:youtube-outlined',
  },
  {
    title: 'FaceBook',
    themeColor: '#3b5999',
    icon: 'line-md:facebook',
  }, {
    title: 'Twitter',
    themeColor: '#1da1f2',
    icon: 'line-md:twitter',
  }
]
const activeRow = ref<IconRow>({
  title: '',
  themeColor: '',
  icon: ''
})

function onMouseEnter(row: IconRow) {
  activeRow.value = row
}
function onMouseLeave() {
  activeRow.value = {
    title: '',
    themeColor: '',
    icon: ''
  }
}

let renderIconList = ref<IconRow[]>([])

const renderIconListLength = computed(() => renderIconList.value.length)
onMounted(() => {
  // 遍历iconList, 隔一段时间添加一个
  iconList.forEach((item: IconRow, index: number) => {
    setTimeout(() => {
      renderIconList.value.push(item)
    }, index * 199)
  })

  setTimeout(() => {
    var typed = new Typed('.motto .typed', {
      strings: [
        '不要重复造轮子，要善于利用现有的资源和框架，提高开发效率和质量。',
        '前端不仅仅是页面，而是用户体验的艺术。',
        '不要为了做前端而做前端，而要为了解决用户的问题而做前端。',
        '学习是一种习惯，创新是一种能力，分享是一种快乐。',
        '前端无小事，用户至上。',
        '保持好奇心，不断探索新技术，不要让自己落后于时代。',
        '代码是给人看的，不是给机器看的，所以要写得清晰、规范、优雅。',
        '前端不只是实现设计稿，而是要用技术实现交互、动画、性能等更高层次的需求。',
        '前端开发不是一门单一的技术，而是一个涉及多方面知识的综合体系，要不断扩展自己的视野和能力。',
        '代码如诗，注释如画，让每一个细节都充满美感。',
      ],
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 5000,
      fadeOutDelay: 1000,
    });
  }, 199 * iconList.length + 1000);
})

function toTargetItem(row: IconRow) {
  if (row.link) {
    window.open(row.link)
  } else if (row?.path) {
    router.go(row.path)
  }
}

</script>
<template>
  <div class="home-preview">
    <div class="main">
      <div class="main-info">
        <p class="title">trry-blog</p>
        <p class="motto">
          <span class="typed"></span>
        </p>
      </div>
      <div class="icon-list">
        <transition-group name="list">
          <div v-for="(item, index) in renderIconList" @click="toTargetItem(item)" :key="item.title" :class="`item ${item.title === activeRow.title ? 'hover-active' : ''}`" @mouseenter="onMouseEnter(item)" @mouseleave="onMouseLeave">
            <SvgIcon :name="item.icon" :key="index"></SvgIcon>
            <p class="tooltip" :key="index">{{ item.title }}</p>
          </div>
        </transition-group>
      </div>
    </div>
    <div class="footer">
      <SvgIcon name="xin" class="xin" />不要等待，时机永远不会恰到好处。——拿破仑·希尔
    </div>
  </div>
</template>

<style scoped lang="scss">
$num: 10;

.list-item {
  display: inline-block;
  margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 3s;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.2);
}

.home-preview {
  min-height: 100vh;
  background-color: #348cb3;
  background-image: url('../../../public/images/base/bg.jpg');
  background-repeat: repeat-x;
  background-position: bottom left;
  background-size: 1500px auto;
  width: 100%;
  animation: move calc(#{$num} * 3s) linear infinite;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .main-info {
    .title {
      text-align: center;
      font-size: 50px;
      color: #fff;
      padding: 50px;
    }

    .motto {
      font-size: 20px;
      color: #fff;
      // text-align: center;
      padding-bottom: 60px;
    }
  }

  .icon-list {
    display: grid;
    grid-template-columns: repeat(v-bind(renderIconListLength), auto);
    justify-content: center;
    align-items: center;
    gap: 0 40px;

    .item {
      width: 65px;
      height: 65px;
      border-radius: 50%;
      box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
      background-color: #fff;
      transition: all 0.2s ease-in;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 10;
      cursor: pointer;
      transform-origin: center center;

      &:active {
        transform: scale(0.9);
      }

      .svg-icon {
        font-size: 30px;
        color: #333;
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      .tooltip {
        transform: scale(0);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        white-space: nowrap;
        text-align: center;
        font-size: 16px;
        padding: 5px 10px;
        background-color: v-bind('activeRow.themeColor');
        color: #fff;
        border-radius: 25px;
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
        position: absolute;
        top: 0;
        opacity: 0;

        &:after {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          background-color: #fff;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%) rotateZ(45deg);
          background-color: v-bind('activeRow.themeColor');
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      }

      &.hover-active {
        transform: scale(1.3);
        background-color: v-bind('activeRow.themeColor');

        .svg-icon {
          fill: #fff;
          color: #fff;
        }

        .tooltip {
          opacity: 1;
          top: -60px;
          background-color: #fff;
          text-shadow: 2px -2px 1px rgba(0, 0, 0, 0.4);
          transform: scale(1);
          background-color: v-bind('activeRow.themeColor');
        }
      }
    }
  }
}

.footer {
  height: 80px;
  background-image: -webkit-linear-gradient(top,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.5) 100%);
  cursor: default;
  width: 100%;
  color: #fff;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .xin {
    width: 25px;
    font-size: 25px;
    margin-right: 5px;
    fill: #fff;
  }
}

@keyframes move {
  0% {
    background-position-x: 0;
  }

  100% {
    background-position-x: -1500px;
  }
}

.home-preview h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.home-preview .items {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}

.home-preview .items .item {
  width: 100%;
  padding: 8px;
}

.home-preview .items .item p {
  padding: 24px;
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
}

.home-preview .items .item p :deep(img) {
  border: 1px solid var(--vp-c-divider);
}

@media (min-width: 640px) {
  .home-preview-block {
    padding: 0 48px;
  }

  .home-preview .items .item {
    width: calc(100% / 2);
  }
}

@media (min-width: 960px) {
  .home-preview-block {
    padding: 0 64px;
  }

  .home-preview .items .item {
    width: calc(100% / 3);
  }
}
</style>
