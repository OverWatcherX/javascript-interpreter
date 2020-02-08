<template>
  <div id="app">
    <div class="app-header">
      <img class="app-logo" src="./loogo.png" />
      <div class="app-header-title">不懂编译也能造JavaScript解释器</div>
      <div class="link" @click="goTo('https://zhuanlan.zhihu.com/javascript-interpreter')">知乎专栏</div>
      <div class="link" @click="goTo('https://github.com/OverWatcherX/javascript-interpreter')">Github</div>
    </div>
    <div class="app-body">
      <div class="nav">
        <router-link tag="div" class="link" v-for="[title, path] in chapters" :key="path" :to="path">{{title}}</router-link>
      </div>
      <div class="page-container">
        <div class="page-header">
          <div class="page-title">{{ $route.meta.title }}</div>
          <div class="page-link link" @click="goTo($route.meta.zhihu)">{{ $route.meta.zhihu }}</div>
        </div>
        <div class="page-body">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { chapters } from './router'
/* eslint-disable */
export default {
  name: 'app',
  data() {
    return {
      input: '0',
      result: '',
      chapters: chapters.map(([title, path]) => [title, path]),
    }
  },
  methods: {
    goTo(url) {
      window.open(url, '_blank');
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

html, body, #app {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}

#app {
  font-size: 16px;
  display: flex;
  flex-direction: column;
}

.app-header {
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #EFEFEF;
  border-bottom: 1px solid #EFEFEF;
}

.app-header > div {
  margin-right: 8px;
}

.app-logo {
  width: 16px;
  height: 16px;
}

.link {
  color: #0099cc;
  cursor: pointer;
}

.app-body {
  display: flex;
  flex: 1 1 auto;
}

.nav {
  flex: 0 0 auto;
  border-right: 1px solid #EFEFEF;
  overflow-y: auto;
}

.nav .link {
  width: 180px;
  padding: 10px;
  border-bottom: 1px solid #EFEFEF;
}

.page-container {
  flex: 1 1 auto;
  overflow: auto;
}

.page-header {
  padding: 10px;
}

.page-title {
  font-size: 32px;
  line-height: 32px;
}

.page-link {
  padding-top: 10px;
}

.page-body {
  padding: 10px;
}
</style>
