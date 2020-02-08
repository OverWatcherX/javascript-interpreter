import VueRouter from "vue-router";
import Chapter0 from "./chapter0/app.vue";
import SpecialExample from "./special-example/app";

export const chapters = [
  [
    '第0章、前置知识',
    '/chapter0',
    Chapter0,
    'https://zhuanlan.zhihu.com/p/104644442',
  ],
  [
    '额外的例子',
    '/special-example',
    SpecialExample
  ]
];

const routes = chapters.map(([title, path, component, zhihu]) => ({
  path,
  component,
  meta: { title, zhihu }
}));

export const router = new VueRouter({
  routes
});