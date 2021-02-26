# JavaScript-Array-reduce使用场景

## 累计计算
```
const numbers = [1, 2, 1, 3, 4, 4, 3, 2, 3, 6, 1.5]
const compute = (numbers, callback) => numbers.reduce((pre, cur) => callback(pre, cur))

console.log(compute(numbers, (pre, cur) => pre + cur))
// 30.5
console.log(compute(numbers, (pre, cur) => pre - cur))
// -28.5
console.log(compute(numbers, (pre, cur) => pre * cur))
// 15552
console.log(compute(numbers, (pre, cur) => pre / cur))
// 0.00006430041152263374
console.log(compute(numbers, (pre, cur) => pre % cur))
// 0
```

## 数组去重
```
const numbers = [1, 2, 1, 3, 4, 4, 3, 2, 3, 6, 1.5]
const compute = numbers => numbers.reduce((pre, cur) => {
  !pre.includes(cur) && pre.push(cur)
  return pre
}, [])

console.log(compute(numbers))
// [ 1, 2, 3, 4, 6, 1.5 ]
```

## 统计元素出现次数
```
const numbers = [1, 2, 1, 3, 4, 4, 3, 2, 3, 6, 1.5]
const compute = numbers => numbers.reduce((pre, cur) => {
  pre[cur] === undefined ? pre[cur] = 1 : pre[cur]++
  return pre
}, {})

console.log(compute(numbers))
// { '1': 2, '2': 2, '3': 3, '4': 2, '6': 1, '1.5': 1 }
```

## 筛选出某个条件出现的次数
```
const numbers = [1, 2, 1, 3, 4, 4, 3, 2, 3, 6, 1.5]
const compute = (numbers, callback) => numbers.reduce((pre, cur) => {
  callback(cur) && pre++
  return pre
}, 0)

console.log(compute(numbers, number => number === 2))
// 2
console.log(compute(numbers, number => number > 3))
// 3
console.log(compute(numbers, number => number > 3 && number < 6))
// 2
console.log(compute(numbers, number => number * 3 > 6))
// 6
```