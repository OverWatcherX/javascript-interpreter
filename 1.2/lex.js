// lex.js
const Parser = require('jison').Parser;

const parser = new Parser(`
%lex
word                 \\w+

%%
\\s+                 /* skip whitespace */
{word}               return 'WORD'
<<EOF>>              return 'EOF'
/lex

%start file 
%%
file
    : words EOF { return $1 }
    ;

words 
    : WORD words { $$ = [$1].concat($2) }
    | WORD { $$ = [$1] }
    ;

`);

console.log(
  parser.parse(`
    hello javascript word
`)
);