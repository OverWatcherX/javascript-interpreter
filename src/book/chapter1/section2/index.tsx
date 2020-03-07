
import React from 'react'
import { Section } from "../../../framework/components/book";
import { MarkdownDocument } from "../../../framework/components/markdown-document";

const document = () => <MarkdownDocument>
  {/* jsx-markdown */}
  # 第2节、词法分析
  [[TOC]]

  ## 从一个最简单的例子讲起
</MarkdownDocument>


export const section2: Section = {
  title: '第2节、词法分析',
  document,
}