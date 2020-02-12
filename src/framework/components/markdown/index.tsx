import React from 'react'
import ReactMarkdown from 'react-markdown'

export type RawMarkdownSegment = JSX.Element | string | null | undefined

export type MarkdownSegment = JSX.Element | string

function findBaseIndent(segment: string): number {
  const baseLine = segment.split('\n').filter(line => line.trim().length > 0)[0]
  return (baseLine.match(/^\s*/) as string[])[0].length
}

function reIndentSegment(baseIndent: number, segment: string): string {
  return segment
    .split('\n')
    .map(line => line.replace(/^\s*/, indentStr => {
      const indent = indentStr.length;
      const targetIndent = Math.max(0, indent - baseIndent);
      return ' '.repeat(targetIndent);
    }))
    .join('\n');
}

export function standardizeMarkdownSegments(rawSegments: RawMarkdownSegment[] | RawMarkdownSegment): MarkdownSegment[] {
  const segments: MarkdownSegment[] = []
  let baseIndent: null | { value: number } = null

  for (const rawSegment of Array.isArray(rawSegments) ? rawSegments : [rawSegments]) {

    // 过滤掉无意义的空串 null 或者 undefined
    if (!rawSegment
      || (typeof rawSegment === 'string' && rawSegment.trim().length === 0)) {
        continue
    } else if (typeof rawSegment !== 'string') {
      segments.push(rawSegment)
      continue
    }

    // 获取基准缩进
    if (!baseIndent) {
      baseIndent = {
        value: findBaseIndent(rawSegment)
      }
    }

    // 用基准缩进重新缩进
    const segment = reIndentSegment(baseIndent.value, rawSegment)

    // 合并相邻的 string segment
    const top = segments[segments.length - 1]
    if (typeof top === 'string') {
      segments[segments.length - 1] = top + segment
    } else {
      segments.push(segment)
    }
  }

  return segments
}

export function createPureMarkdown(segments: MarkdownSegment[]): string {
  return segments.filter(segment => typeof segment === 'string').join('\n')
}

export interface MarkdownProps {
  children?: RawMarkdownSegment | RawMarkdownSegment[];
  segments?: MarkdownSegment[];
}

function renderSegment(segment: MarkdownSegment, key: any) {
  if (typeof segment === 'string') {
    return <ReactMarkdown
      key={key}
      source={segment}
    />
  }
  return segment
}

export function Markdown(props: MarkdownProps) {

  const segments = props.segments
    ? props.segments
    : standardizeMarkdownSegments(props.children)

  return <>
    {segments.map((segment, index) => renderSegment(segment, index))}
  </>
}