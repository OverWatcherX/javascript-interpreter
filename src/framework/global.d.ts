
declare module '*.raw.jison' {
  const grammar: string;
  export default grammar;
}

declare module '*.jison' {
  const parser: {
    parse<T>(code: string): T
  };
  export default parser;
}

declare module 'jison' {
  export class Parser<T> {
    constructor(grammar: string)
    parse(code: string): T
  }
}

// mdx.d.ts
declare module '*.mdx' {
  let MDXComponent: () => JSX.Element
  export default MDXComponent
}

declare module '*' {
  const module: any
  export default module
}