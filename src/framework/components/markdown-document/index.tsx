import React from 'react'
import { MarkdownProps, Markdown, standardizeMarkdownSegments, createPureMarkdown, MarkdownSegment } from '../markdown'
import './markdown.css'

interface MarkdownDocumentProps {
  children: MarkdownProps['children']
}

interface MarkdownHead {
  level: number,
  title: string,
}

function getMarkdownHeaders(text: string): MarkdownHead[] {
  return text
    .split('\n')
    .map(line => line.match(/^(#+)[ \t]+(.*)$/) as string[])
    .filter(header => header !== null)
    .map(([, prefix, title]) => ({ level: prefix.length, title }))
}

function createIndexBlock(headers: MarkdownHead[]) {
  return ['## 索引']
    .concat(headers.map(({ level, title }) => ' '.repeat((level - 1) * 4) + '* ' + title))
    .join('\n')
}

function withIndexBlock(segments: MarkdownSegment[]) {
  const pureMarkdown = createPureMarkdown(segments);
  const indexBlock = createIndexBlock(getMarkdownHeaders(pureMarkdown))
  return segments.map(segment => typeof segment === 'string' ? segment.replace(/\[\[toc\]\]/ig, indexBlock) : segment)
}

export function MarkdownDocument({ children }: MarkdownDocumentProps) {
  const segments = withIndexBlock(standardizeMarkdownSegments(children))

  return <div className="markdown">
    <Markdown segments={segments} />
  </div>
}