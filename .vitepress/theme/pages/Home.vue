<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter, withBase } from 'vitepress'
import Typed from 'typed.js'

interface IconRow {
  title: string
  themeColor: string
  icon: string
  link?: string
  path?: string
}

type BackgroundMode = 'snow' | 'journey'

const router = useRouter()
const backgroundMode = ref<BackgroundMode>('snow')
const backgroundToggleText = computed(() => backgroundMode.value === 'snow' ? '取经' : '雪山')
const backgroundToggleIcon = computed(() => backgroundMode.value === 'snow' ? 'i-tabler:map' : 'i-tabler:mountain')
const homeBaseBackgroundImage = computed(() => `url("${withBase('/images/base/bg.jpg')}")`)
const journeyBackgroundImage = computed(() => `url("${withBase('/images/xiyou/bg.jpg')}")`)
const xiyouAsset = (fileName: string) => withBase(`/images/xiyou/${fileName}`)

const iconList = [
  {
    title: 'Blog',
    themeColor: '#428bca',
    icon: 'home',
    path: 'trry-hub/src/算法面试/LeetCode/2021-10/29',
  },
  {
    title: 'GitHub',
    themeColor: '#333',
    icon: 'line-md:github',
    link: 'https://github.com/trry-hub',
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

onMounted(() => {
  // 获取根元素
  var root = document.querySelector(':root');
  // 获取根元素的样式对象
  var style = getComputedStyle(root as Element);
  // 获取 --main-color 的值
  iconList[0].themeColor = style.getPropertyValue('--vp-c-brand');

  const savedBackground = localStorage.getItem('trry-home-background')
  if (savedBackground === 'snow' || savedBackground === 'journey') {
    backgroundMode.value = savedBackground
  }
})
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

function toggleBackground() {
  backgroundMode.value = backgroundMode.value === 'snow' ? 'journey' : 'snow'
  localStorage.setItem('trry-home-background', backgroundMode.value)
}

let renderIconList = ref<IconRow[]>([])
const hiddenIconList = computed(() => iconList.slice(renderIconList.value.length))
const iconEnterStep = 110

onMounted(() => {
  iconList.forEach((item: IconRow, index: number) => {
    setTimeout(() => {
      requestAnimationFrame(() => {
        renderIconList.value.push(item)
      })
    }, index * iconEnterStep)
  })

  setTimeout(() => {
    new Typed('.motto .typed', {
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
  }, iconEnterStep * iconList.length + 620);
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
  <div :class="`home-preview home-preview--${backgroundMode}`">
    <button class="background-toggle" type="button" @click="toggleBackground">
      <SvgIcon :name="backgroundToggleIcon" />
      <span>{{ backgroundToggleText }}</span>
    </button>
    <div class="main">
      <div class="main-info">
        <p class="title">trry-blog</p>
        <p class="motto">
          <span class="typed"></span>
        </p>
      </div>
      <div class="icon-list">
        <transition-group name="list" tag="div" class="icon-track">
          <div v-for="(item, index) in renderIconList" @click="toTargetItem(item)" :key="item.title" :class="`item ${item.title === activeRow.title ? 'hover-active' : ''}`" @mouseenter="onMouseEnter(item)" @mouseleave="onMouseLeave">
            <SvgIcon :name="item.icon" :key="index"></SvgIcon>
            <p class="tooltip" :key="index">{{ item.title }}</p>
          </div>
          <span v-for="item in hiddenIconList" :key="`placeholder-${item.title}`" class="icon-placeholder" aria-hidden="true"></span>
        </transition-group>
        <div class="journey-scene" aria-hidden="true">
          <div class="walker walker--wukong">
            <img :src="xiyouAsset('wk.png')" alt="">
          </div>
          <div class="walker walker--bajie">
            <img :src="xiyouAsset('bj.png')" alt="">
          </div>
          <div class="walker walker--tang">
            <img :src="xiyouAsset('ts.png')" alt="">
          </div>
          <div class="walker walker--shaseng">
            <img :src="xiyouAsset('ss.png')" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <SvgIcon name="xin" class="xin" />不要等待，时机永远不会恰到好处。——拿破仑·希尔
    </div>
  </div>
</template>

<style scoped lang="scss">
$num: 10;
$journey-bg-width-from-height: 244.27480916vh;

.list-enter-active,
.list-leave-active,
.list-move {
  transition:
    opacity 460ms ease,
    transform 620ms cubic-bezier(0.2, 0.86, 0.2, 1);
  will-change: opacity, transform;
}

.list-leave-active {
  position: absolute;
  pointer-events: none;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translate3d(0, 12px, 0) scale(0.94);
}

.home-preview {
  --journey-bg-width: max(100vw, #{$journey-bg-width-from-height});
  min-height: 100vh;
  height: 100%;
  background-color: #348cb3;
  background-image: v-bind('homeBaseBackgroundImage');
  background-repeat: repeat-x;
  background-position: bottom left;
  background-size: 1500px auto;
  width: 100%;
  animation: move calc(#{$num} * 3s) linear infinite;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  transition: background-color 420ms ease;
}

.home-preview::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  background-image:
    linear-gradient(180deg, rgba(37, 95, 97, 0.12) 0%, rgba(192, 139, 78, 0.1) 58%, rgba(67, 35, 16, 0.16) 100%),
    v-bind('journeyBackgroundImage');
  background-position: center bottom, center bottom;
  background-size: cover, var(--journey-bg-width) auto;
  background-repeat: no-repeat, repeat-x;
  transition: opacity 520ms ease;
  will-change: background-position;
  z-index: 0;
}

.home-preview--journey {
  background-color: #c58b4f;
  background-image: none;
  animation: none;
}

.home-preview--journey::before {
  opacity: 1;
  animation: journey-bg-move 32s linear infinite;
}

.background-toggle {
  position: fixed;
  top: 24px;
  right: 28px;
  z-index: 30;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 38px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, 0.58);
  border-radius: 999px;
  color: #fff;
  background: rgba(255, 255, 255, 0.14);
  box-shadow: 0 12px 28px rgba(20, 58, 72, 0.18);
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition:
    transform 240ms ease,
    background-color 240ms ease,
    box-shadow 240ms ease;

  &:hover {
    transform: translate3d(0, -2px, 0);
    background: rgba(255, 255, 255, 0.22);
    box-shadow: 0 16px 34px rgba(20, 58, 72, 0.24);
  }

  .svg-icon {
    font-size: 18px;
  }
}

.journey-scene {
  position: absolute;
  top: calc(100% + 104px);
  left: 50%;
  z-index: 2;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 10px;
  opacity: 0;
  transform: translate3d(-50%, 14px, 0);
  pointer-events: none;
  transition:
    opacity 520ms ease,
    transform 520ms cubic-bezier(0.16, 1, 0.3, 1);
}

.home-preview--journey .journey-scene {
  opacity: 1;
  transform: translate3d(-50%, 0, 0);
}

.walker {
  width: 160px;
  height: 146px;
  overflow: hidden;
  transform: translate3d(0, 0, 0);

  img {
    display: block;
    width: 1280px;
    max-width: none;
    height: auto;
    animation: journey-walk 1.15s steps(8) infinite;
  }
}

.walker--tang {
  width: 116px;
  height: 164px;
  transform: translate3d(0, 10px, 0);

  img {
    width: 928px;
  }
}

.walker--wukong {
  width: 160px;
  height: 146px;
}

.walker--bajie {
  width: 160px;
  height: 146px;

  img {
    width: 1280px;
  }
}

.walker--shaseng {
  width: 160px;
  height: 146px;

  img {
    width: 1280px;
  }
}

.main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  .main-info {
    text-align: center;

    .title {
      font-size: 50px;
      color: #fff;
      padding: 50px 0;
      margin: 0;
    }

    .motto {
      height: 32px;
      font-size: 20px;
      line-height: 32px;
      color: #fff;
      padding-bottom: 136px;
      margin: 0;
      overflow: hidden;
      white-space: nowrap;

      :deep(.typed),
      :deep(.typed-cursor) {
        display: inline-block;
        line-height: 32px;
        vertical-align: top;
      }
    }
  }

  .icon-list {
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;

    .icon-track {
      display: grid;
      grid-template-columns: repeat(8, 65px);
      justify-content: center;
      align-items: center;
      gap: 20px 40px;
      position: relative;
    }

    .icon-placeholder {
      width: 65px;
      height: 65px;
      opacity: 0;
      pointer-events: none;
    }

    .item {
      width: 65px;
      height: 65px;
      border-radius: 50%;
      box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
      background-color: #fff;
      transition:
        transform 300ms cubic-bezier(0.16, 1, 0.3, 1),
        background-color 300ms ease,
        box-shadow 300ms ease;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 10;
      cursor: pointer;
      transform-origin: center center;
      backface-visibility: hidden;
      will-change: transform;

      &:active {
        transform: translate3d(0, -4px, 0) scale(1.04);
      }

      .svg-icon {
        font-size: 30px;
        color: #333;
        transition:
          color 260ms ease,
          fill 260ms ease,
          transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
      }

      .tooltip {
        left: 50%;
        top: -48px;
        transform: translate3d(-50%, 8px, 0) scale(0.94);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transition:
          opacity 240ms ease,
          transform 300ms cubic-bezier(0.16, 1, 0.3, 1),
          background-color 240ms ease;
        white-space: nowrap;
        text-align: center;
        font-size: 16px;
        padding: 5px 10px;
        background-color: v-bind('activeRow.themeColor');
        color: #fff;
        border-radius: 25px;
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
        position: absolute;
        opacity: 0;
        pointer-events: none;

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
          transition: background-color 240ms ease;
        }
      }

      &.hover-active {
        transform: translate3d(0, -6px, 0) scale(1.08);
        background-color: v-bind('activeRow.themeColor');
        box-shadow: 0 18px 24px rgba(0, 0, 0, 0.18);

        .svg-icon {
          fill: #fff;
          color: #fff;
        }

        .tooltip {
          opacity: 1;
          background-color: #fff;
          text-shadow: 2px -2px 1px rgba(0, 0, 0, 0.4);
          transform: translate3d(-50%, -4px, 0) scale(1);
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
  position: relative;
  z-index: 2;
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

@media (prefers-reduced-motion: reduce) {
  .home-preview,
  .home-preview--journey::before,
  .walker img,
  .main .icon-list .item,
  .footer {
    animation: none;
  }

  .main .icon-list .item,
  .footer {
    opacity: 1;
  }
}

@media (max-width: 960px) {
  .main .icon-list .icon-track {
    grid-template-columns: repeat(3, 65px);
  }

  .main .main-info .motto {
    padding-bottom: 72px;
  }

  .journey-scene {
    top: calc(100% + 64px);
    transform: translate3d(-50%, 10px, 0) scale(0.56);
    transform-origin: center top;
  }

  .home-preview--journey .journey-scene {
    transform: translate3d(-50%, 0, 0) scale(0.56);
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

@keyframes journey-bg-move {
  0% {
    background-position: center bottom, 0 bottom;
  }

  100% {
    background-position: center bottom, calc(0px - var(--journey-bg-width)) bottom;
  }
}

@keyframes journey-walk {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-100%);
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
</style>
