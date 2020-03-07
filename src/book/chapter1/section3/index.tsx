
import React from 'react'
import { Section } from "../../../framework/components/book";
import { MarkdownDocument } from "../../../framework/components/markdown-document";

const document = () => <MarkdownDocument>
  {/* jsx-markdown */}
  # 第3节、造一个中文编程语言（实例）
  [[TOC]]
</MarkdownDocument>


export const section3: Section = {
  title: '第3节、语法分析',
  document,
}