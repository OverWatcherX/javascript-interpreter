
import React from 'react'
import { Section } from "../../../framework/components/book";
import { MarkdownDocument } from "../../../framework/components/markdown-document";

const document = () => <MarkdownDocument>
  {/* jsx-markdown */}
  # 第4节、【实例】中文编程语言
  [[TOC]]

  ## 前言
  这一节是带大家做一个完整的实例，让我们一起造一个中文编程语言。然后让大家感受一下，造中文编程语言的难度有多低从而避免被网上的民科忽悠。编程语言并不是使用的并不是英文进行编程，一定要清楚，编程语言是使用符号进行标称。这个符号可以使英文、中文、汉语拼音，甚至是我们可以自定义乱码进行编程。所以一切纠结用什么英文还是中文编程都是没有任何意义的。

</MarkdownDocument>

export const section4: Section = {
  title: '第4节、【实例】中文编程语言',
  document,
}