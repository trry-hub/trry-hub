<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vitepress'
import Typed from 'typed.js'
interface IconRow {
  title: string
  themeColor: string
  icon: string
  link?: string
  name?: string
  animateClass?: string
}

const router = useRouter()
const iconList = [
  {
    title: 'Blog',
    themeColor: '#428bca',
    icon: 'home',
    name: 'home',
    animateClass: 'animate__animated'
  },
  {
    title: 'GitHub',
    themeColor: '#333',
    icon: 'line-md:github',
    link: 'https://github.com/trry-github',
    // animateClass: 'animate__animated animate__fadeInUp'
  },
  {
    title: 'QQ',
    themeColor: '#0099ff',
    icon: 'qq',
    animateClass: 'animate__animated animate__fadeInUp'
  },
  {
    title: '掘金',
    themeColor: '#1e80ff',
    icon: 'i-tabler:brand-juejin',
    link: 'https://juejin.cn/user/2620826707309208',
    animateClass: 'animate__animated animate__fadeInUp'
  },
  {
    title: 'csdn',
    themeColor: '#fc5531',
    icon: 'csdn-logo',
    link: 'https://blog.csdn.net/weixin_40637683?spm=1000.2115.3001.5343',
    animateClass: 'animate__animated animate__fadeInUp'
  },
  {
    title: 'Diary',
    themeColor: '#e1306c',
    icon: 'line-md:heart',
    animateClass: 'animate__animated animate__fadeInUp'
  },
  {
    title: 'YouTube',
    themeColor: '#de463b',
    icon: 'i-ant-design:youtube-outlined',
    animateClass: 'animate__animated animate__fadeInUp'
  },
  {
    title: 'FaceBook',
    themeColor: '#3b5999',
    icon: 'line-md:facebook',
    animateClass: 'animate__animated animate__fadeInUp'
  }, {
    title: 'Twitter',
    themeColor: '#1da1f2',
    icon: 'line-md:twitter',
    animateClass: 'animate__animated animate__fadeInUp'
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
onMounted(() => {
  // 遍历iconList, 隔一段时间添加一个
  iconList.forEach((item: IconRow, index: number) => {
    setTimeout(() => {
      renderIconList.value.push(item)
    }, index * 199)
  })
})

function toTargetItem(row: IconRow) {
  if (row.link) {
    window.open(row.link)
  } else if (row?.name) {
    router.go('trry-github/guide/introduction')
  }
}

</script>
<template>
  <div class="home-preview">
    <div class="main">
      <transition-group tag="div" name="list" class="icon-list">
        <div v-for="(item, index) in renderIconList" @click="toTargetItem(item)" :key="item.title" :class="`item ${item.title === activeRow.title ? 'hover-active' : ''} ${item.animateClass}`" @mouseenter="onMouseEnter(item)" @mouseleave="onMouseLeave">
          <SvgIcon :name="item.icon" :key="index"></SvgIcon>
          <p class="tooltip" :key="index">{{ item.title }}</p>
        </div>
      </transition-group>
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
  height: 100vh;
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

  .icon-list {
    display: grid;
    grid-template-columns: repeat(v-bind('iconList.length'), auto);
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
  height: 100px;
  background-image: -webkit-linear-gradient(top,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.5) 100%);
  cursor: default;
  width: 100%;
  color: #fff;
  font-size: 20px;
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
