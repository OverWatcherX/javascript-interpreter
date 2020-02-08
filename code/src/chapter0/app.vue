
<template>
<div>
  简易表达式计算器测试
  input: <textarea v-model="input" />
  <button @click="calculate">运算</button>
  output: {{ result }}
</div>
</template>

<script>
import Parser from './calculator.jison'

export default {
  data() {
    return {
      input: '1 + 2 * 3',
      result: 0,
    }
  },
  methods: {
    calculate() {
      this.result = Parser.parse(this.input);
    }
  }
}
</script>