import React from 'react'
import { Book } from "../framework/components/book";
import { MarkdownDocument } from "../framework/components/markdown-document";
import { chapter1 } from './chapter1';
import logo from './images/logo.png';
import icon from './images/favicon.ico';

const document = () => <MarkdownDocument>
  {/* jsx-markdown */}
  # 前言
  [[TOC]]

  ## 这个专栏是什么？

  如这个专栏的标题所示，这是一个教前端造 JavaScript 解释器的一本「电子小书」，旨在从「程序语言」这个宏观的角度来看待 JavaScript 这门语言是怎么设计、构造以及实现的。

  有这个想法是因为前端虽有大量编程语言相关的应用，从各类编译到 JavaScript 的编程语言、各类模板语言、 Babel 和 Uglify 等转换器甚至还有 WebAssembly 这样的「底层语言」，但广大程序员小伙伴在「编程语言」层面上的基础还是有欠缺的。并且本身这些学科都晦涩难懂，而且大部分教材也是典型的「不讲人话」，所以我希望能在这个领域能帮大家做一个不算深入，但是比较全面介绍和实践。

  同时也是为了填我之前几篇文章开的坑，包括太监文 「前端要以正确的姿势学习编译原理（上篇）」里面承诺的下篇，以及在 「微信小程序也要强行热更代码，鹅厂不服你来肛我呀」承诺 IR 以及协程都会在这本小书里面补上。

  最后，如我上一段说的，这是一本「电子小书」，而不是一个系列教程或者博客，所以我会用「一年时间」以「一本书」的质量标准来要求我写的内容，也是对自己那么多年瞎折腾的一个总结和交代。

  ## 这本书会写什么？

  我的目标是「科普编程语言」，给只有前端基础的小伙伴讲懂基本的编程语言和编译原理知识；
  我的方法是「动手实践」，用 JavaScript 实现一个完整的 JavaScript 的解释器；
  我的原则是「说人话」，不需要 JavaScript 这门语言以外的基础；
  我的理念是「即时反馈」，从一个最小的原型开始，保证每学习一步都能够看得到效果；


  ## 我希望读者能反馈什么？

  毕竟一个人要搞一个那么大的阵仗，所以也是需要大家给我反馈，一起帮忙改进，这也是互联网最大的优势，所以我希望大家能够给我类似如下的反馈：

  1. 我发现文章里面有错误
  2. 我这里没有看懂
  3. 我这里看懂了但是不会用
  4. 我觉得我有更好的例子和更好的实现方式


  ## 启程出发

  最后，让我们一起整装待发，一起体验一回我们程序员的浪漫~
</MarkdownDocument>

export const book: Book = {
  name: '不懂编译原理也能造 JavaScript 解释器',
  logo, icon,
  description: {
    title: '前言',
    document
  },
  chapters: [chapter1],
}