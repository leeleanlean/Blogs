// 获取随机数组
let getRandomArr = (element) => {
  let arr = []
  for (let i = 1; i < 101; i++) {
    let number = parseInt(Math.random() * 100) + 1
    arr.push(number)
  }
  document.querySelector(`${element} .before`).innerHTML = `
  <p>排序前:</p>
  [${arr}]`
  return arr
}

/*
* 冒泡排序
* - 从开始或者结尾两两进行比较
* - 比较相邻的元素，根据大小交换位置；
* - 依次比较相邻的元素，直到排序完成
*/
let bubbleSort = () => {
  let arr = getRandomArr('.bubbleSort')
  let length = arr.length

  // 保存开始时间
  let startTime = new Date().getTime()
  document.querySelector('.bubbleSort .time .startTime').innerHTML = `开始时间: ${startTime}`

  // 开始排序
  for (let i = 0; i < length - 1; i++) {
    for (let k = 0; k < length - i - 1; k++) {
      if (arr[k] > arr[k+1]) {
        // 存储后面的数据
        let element = arr[k+1]
        // 交换元素
        arr[k+1] = arr[k]
        arr[k] = element
      }
    }
  }

  // 保存结束时间
  let endTime = new Date().getTime()
  document.querySelector('.bubbleSort .time .endTime').innerHTML = `结束时间: ${endTime}`

  // 设置DOM
  document.querySelector('.bubbleSort .after').innerHTML = 
  `
  <p>排序后:</p>
  [${arr}]
  `

  // 计算消耗时间
  let time = endTime - startTime
  document.querySelector('.bubbleSort .time .result').innerHTML = `消耗时间: ${time}`

}

/*
* 选择排序
* - 取出最小/最大值
* - 把最小/最大值放在开始/结尾
* - 取出排序后剩下数组中的最小/最大值
* - 把最小/最大值放在开始/结尾
* - 重复执行，知道排序结束
* 
*/
let selectionSort = () => {
  let arr = getRandomArr('.selectionSort')
  let length = arr.length

  // 保存开始时间
  let startTime = new Date().getTime()
  document.querySelector('.selectionSort .time .startTime').innerHTML = `开始时间: ${startTime}`

  // 开始排序
  let minIndex, element
  for (let i = 0; i < length - 1; i++) {
    minIndex = i
    for (k = i + 1; k < length; k++) {
      if (arr[k] < arr[minIndex]) {
        minIndex = k
      }
    }
    element = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = element
  }

  // 保存结束时间
  let endTime = new Date().getTime()
  document.querySelector('.selectionSort .time .endTime').innerHTML = `结束时间: ${endTime}`

  // 设置DOM
  document.querySelector('.selectionSort .after').innerHTML = 
  `
  <p>排序后:</p>
  [${arr}]
  `

  // 计算消耗时间
  let time = endTime - startTime
  document.querySelector('.selectionSort .time .result').innerHTML = `消耗时间: ${time}`
}

/*
* 插入排序
* 
*/
const insertionSort = () => {
  let arr = getRandomArr('.insertionSort')
  let length = arr.length

  // 保存开始时间
  let startTime = new Date().getTime()
  document.querySelector('.insertionSort .time .startTime').innerHTML = `开始时间: ${startTime}`
}
