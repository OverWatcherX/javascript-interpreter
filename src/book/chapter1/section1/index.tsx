import React from 'react'
import { Section } from "../../../framework/components/book";
import { MarkdownDocument } from "../../../framework/components/markdown-document";

const document = () => <MarkdownDocument>
  {/* jsx-markdown */}
  # 第1节、词法分析
</MarkdownDocument>


export const section1: Section = {
  title: '第1节、词法分析',
  document,
}