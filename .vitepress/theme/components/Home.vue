<script setup lang="ts">
const iconList = [
  {
    title: 'Blog',
    themeColor: '#428bca',
    icon: 'home'
  },
  {
    title: 'GitHub',
    themeColor: '#333',
    icon: 'github'
  },
  // {
  //   title: 'QQ',
  //   icon: 'qq'
  // },
  {
    title: '掘金',
    themeColor: '#1e80ff',
    icon: 'tabler:brand-juejin'
  },
  {
    title: 'Diary',
    themeColor: '#e1306c',
    icon: 'xin'
  },
  {
    title: 'YouTube',
    themeColor: '#de463b',
    icon: 'ant-design:youtube-outlined'
  },
  {
    title: 'FaceBook',
    themeColor: '#3b5999',
    icon: 'facebook'
  }
]
</script>
<template>
  <div class="home-preview">
    <div class="main">
      <div v-for="item in iconList" :key="item.title" class="item-wrap">
        <div class="item" :class="item.icon">
          <SvgIcon :name="item.icon"></SvgIcon>
        </div>
        <div class="tooltip">{{ item.title }}</div>
      </div>
    </div>
    <footer class="footer">
      <SvgIcon name="xin" class="xin" />
      不要等待，时机永远不会恰到好处。——拿破仑·希尔
    </footer>
  </div>
</template>

<style scoped lang="scss">
$num: 10;
.home-preview {
  height: 100vh;
  transform: translate3d(0, 0, 0);
  background-color: #348cb3;
  background-image: url('../../../public/images/base/bg.jpg');
  background-repeat: repeat-x;
  background-position: bottom left;
  background-size: 1500px auto;
  opacity: 1;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  animation: move calc(#{$num} * 3s) linear infinite;
  z-index: calc(var(--vp-z-index-nav) + 1);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.main {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(6, auto);
  justify-content: center;
  align-items: center;
  gap: 0 40px;
  .item-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .item {
      width: 65px;
      height: 65px;
      border-radius: 50%;
      box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
      background-color: #fff;
      transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      display: flex;
      overflow: hidden;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 10;
      cursor: pointer;
      .svg-icon {
        font-size: 30px;
        color: #333;
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
      & + .tooltip {
        transform: scale(0);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
      &:hover {
        transform: scale(1.2);
        .svg-icon {
          fill: #fff;
          opacity: 1;
        }

        & + .tooltip {
          opacity: 1;
          top: -70px;
          background-color: #fff;
          text-shadow: 2px -2px 1px rgba(0, 0, 0, 0.4);
          transform: scale(1);
        }
      }

      &.home {
        &:hover {
          background-color: #428bca;
        }
        & + .tooltip {
          background-color: #428bca;
          &::after {
            background-color: #428bca;
          }
        }
      }
      &.github {
        &:hover {
          background-color: #333;
        }
        & + .tooltip {
          background-color: #333;
          &::after {
            background-color: #333;
          }
        }
      }
      &.qq {
        &:hover {
          background-color: #e32b0f;
        }
        & + .tooltip {
          background-color: #e32b0f;
          &::after {
            background-color: #e32b0f;
          }
        }
      }
      &.xin {
        &:hover {
          background-color: #e1306c;
        }
        & + .tooltip {
          background-color: #e1306c;
          &::after {
            background-color: #e1306c;
          }
        }
      }
      &.youtube {
        &:hover {
          background-color: #de463b;
        }
        & + .tooltip {
          background-color: #de463b;
          &::after {
            background-color: #de463b;
          }
        }
      }
      &.facebook {
        &:hover {
          background-color: #3b5999;
        }
        & + .tooltip {
          background-color: #3b5999;
          &::after {
            background-color: #3b5999;
          }
        }
      }
    }
    .tooltip {
      text-align: center;
      font-size: 24px;
      padding: 5px 15px;
      background-color: #348cb2;
      color: #fff;
      border-radius: 25px;
      box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
      position: absolute;
      top: 0;
      opacity: 0;
      transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      &:after {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: #fff;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%) rotateZ(45deg);
      }
    }
  }
}
.footer {
  height: 100px;
  background-image: -webkit-linear-gradient(
    top,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.5) 100%
  );
  cursor: default;
  width: 100%;
  color: #fff;
  font-size: 22px;
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
