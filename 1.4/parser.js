// lex.js
const Parser = require('jison').Parser;

const parser = new Parser(`
%lex
identifier                              ("_"|{letter})({letter}|{digit}|"_")*
letter                                  {lowercase}|{uppercase}
lowercase                               [a-z]
uppercase                               [A-Z]
digit                                   [0-9]
number                                  {integer}{fraction}?
fraction                                "."{digit}+
integer                                 {digit}+
symbol																	"+"|"*"|"("|")"
%%
\\s+                                    /* skip whitespace */
{number}                                return 'number'
{symbol}																return yytext 
{identifier}                            return 'name'
<<EOF>>                                 return 'EOF'
/lex

%left '+'
%left '*'

%start file 
%%
file
    : expression EOF { return $1 }
    ;

expression
    : number                      { $$ = { type: 'number', value: Number($1)} } 
    | name                        { $$ = { type: 'variable', name: $1 } }
    | expression '+' expression   { $$ = { type: '+', left: $1, right: $3 } }
    | expression '*' expression   { $$ = { type: '*', left: $1, right: $3 } } 
    | '(' expression ')'          { $$ = $2 } // <- 括号实际上在运算中没有用处，只是提升优先级
    ;
`);

function reduce(node) {
  if (node.type === 'number') {
    return node;
  } else if (node.type === 'variable') {
    return node;
  } else {
    const left = reduce(node.left)
    const right = reduce(node.right)

    if (left.type === 'number' && left.type === right.type) {
      if (node.type === '+') {
      return { type: 'number', value: left.value + right.value }
      } else if (node.type === '*') {
      return { type: 'number', value: left.value * right.value }
      }
    } else {
      return { type: node.type, left, right }
    }
  }
}

function execute(node, env) {
  if (node.type === 'number') {
    return node.value;
  } else if (node.type === '+') {
    return execute(node.left, env) + execute(node.right, env);
  } else if (node.type === '*') {
    return execute(node.left, env) * execute(node.right, env);
  } else if (node.type === 'variable') {
    const value = env[node.name]
    if (typeof value === 'number') {
      return value
    }
    throw new Error(`${node.name} 变量没找到`)
  }
}


const ast = parser.parse(`
  x * (3 * 4 + x)
`)
console.log(ast);

const reducedAst = reduce(ast)
console.log(reducedAst);

console.log(execute(reducedAst, { x: 1 }))