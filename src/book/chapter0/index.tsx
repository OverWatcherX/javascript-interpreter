import React from 'react'
import { Chapter } from "../../framework/components/book";
import { MarkdownDocument } from "../../framework/components/markdown-document";
import { section1 } from './section1';

const document = () => <MarkdownDocument>
  {/* jsx-markdown */}
  # 第0章、前置知识
</MarkdownDocument>

export const chapter0: Chapter = {
  title: '第0章、前置知识',
  document,
  sections: [
    section1
  ]
}