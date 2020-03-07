
import React from 'react'
import { Section } from "../../../framework/components/book";
import { MarkdownDocument } from "../../../framework/components/markdown-document";

const document = () => <MarkdownDocument>
  {/* jsx-markdown */}
  # 第4节、【实例】中文编程语言
  [[TOC]]
</MarkdownDocument>

export const section4: Section = {
  title: '第4节、【实例】造一个中文编程语言',
  document,
}