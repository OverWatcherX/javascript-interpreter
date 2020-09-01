
type ENumber = { type: 'number', value: number }
type EOperation = { type: '+' | '*', left: Expression, right: Expression }
type Expression = ENumber | EOperation

1 + 2 * 3

const ast: Expression = {
  type: '+',
  left: { type: 'number', value: 1, },
  right: {
    type: '*',
    left: { type: 'number', value: 2, },
    right: { type: 'number', value: 3},
  }
}