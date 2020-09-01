// lex.js
const Parser = require('jison').Parser;

const parser = new Parser(`
%lex
digit                                   [0-9]
number                                  {integer}{fraction}?
fraction                                "."{digit}+
integer                                 {digit}+
symbol																	"+"|"*"
%%
\\s+                                    /* skip whitespace */
{number}                                return 'number'
{symbol}																return yytext 
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
    : number 											{ $$ = Number($1) } // <- 公式(4)，
    | expression '+' expression  	{ $$ = $1 + $3 } // <- 公式(5)
    | expression '*' expression 	{ $$ = $1 * $3 } // <- 公式(6)
    | '(' expression ')' 					{ $$ = $2 }// <- 公式(7)
    ;
`);

console.log(
  parser.parse(`
  1 + 2 * 3
`)
);