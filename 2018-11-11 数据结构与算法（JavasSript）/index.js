// 获取随机数
const randomArray = (total, name) => {
  return new Promise((resolve, reject) => {
    if (total && total > 0) {
      let arr = []
      for (let i = 0; i < total; i++) {
        const random = parseInt(Math.random() * total + 1)
        arr.push(random)
      }
      params = {
        arr,
        name
      }
      resolve(params)
    } else {
      reject('参数有误')
    }
  })
}

/**
 * 数列排序 - 冒泡排序
 * 比较两个相邻的元素，大的放后面，小的放前面。
 */
randomArray(10, '冒泡排序').then(obj => {
  let { arr, name } = obj
  console.log('* 数列排序 - 冒泡排序：--------------------------------------------------')
  console.time('总耗时')
  console.log('排序前', arr)
  for (let i = 0; i < arr.length - 1; i++) {
    // 循环遍历，每次少遍历一次
    for (let k = 0; k < arr.length - i - 1; k++) {
      if (arr[k] > arr[k + 1]) {
        let element = arr[k]
        arr[k] = arr[k + 1]
        arr[k + 1] = element
      }
    }
  }
  console.log('排序后', arr)
  console.timeEnd('总耗时')
  console.log('----------------------------------------------------------')
})

/**
 * 数列排序 - 选择排序
 * 选择剩余数组中最大或者最小值，和最后一个或者第一个元素做比较
 */
randomArray(10, '选择排序').then(obj => {
  let { arr, name } = obj
  console.log('* 数列排序 - 选择排序：--------------------------------------------------')
  console.time('总耗时')
  console.log('排序前', arr)
  for (let i = 0; i < arr.length - 1; i++) {
    // 遍历剩余的元素
    for (k = i + 1; k < arr.length; k++) {
      if (arr[i] > arr[k]) {
        let first = arr[i]
        arr[i] = arr[k]
        arr[k] = first
      }
    }
  }
  console.log('排序后', arr)
  console.timeEnd('总耗时')
  console.log('----------------------------------------------------------')
})

/**
 * 数列排序 - 插入排序
 * 
 */
randomArray(50, '插入排序').then(obj => {
  let { arr, name } = obj
  console.log('* 数列排序 - 插入排序：--------------------------------------------------')
  console.time('总耗时')
  console.log('排序前', arr)
  for (let i = 1; i < arr.length; i++) {
    // 保存当前元素
    let element = arr[i]
    // 获取上一个元素的index
    let k = i - 1
    while (arr[k] > element) {
      // 当前一个元素大于当前元素时，设置当前元素为上一个
      arr[k + 1] = arr[k]
      // 递减遍历
      k--
    }
    // 重置当前元素
    arr[k + 1] = element
  }
  console.log('排序后', arr)
  console.timeEnd('总耗时')
  console.log('----------------------------------------------------------')
})

/**
 * 列表搜索 - 线性搜索
 * 从头至尾按顺序重复查找
 */
randomArray(10, '线性搜索').then(obj => {
  let { arr, name } = obj
  console.log('* 列表搜索 - 线性搜索：--------------------------------------------------')
  console.time('总耗时')
  console.log('Array:', arr)

  // 搜索关键词
  const search = 10
  let result = false
  // 遍历列表线性比对查找
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === search) {
      result = true
      break
    }
  }
  result ? console.log(`found-${search}: yes`) : console.log(`found-${search}: none`)

  console.timeEnd('总耗时')
  console.log('----------------------------------------------------------')
})

/**
 * 列表搜索 - 二分搜索
 * 从有序数组中搜索元素，每次取中间的元素进行匹配
 */
randomArray(10, '二分搜索').then(obj => {
  let arr = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  console.log('* 列表搜索 - 二分搜索：--------------------------------------------------')
  console.time('总耗时')
  console.log('Array:', arr)

  // 搜索关键词
  const search = 6
  // 递归执行二分查找法
  const binarySearch = (arr, search) => {
    if (!arr || !search) {
      console.log('参数有误')
      return false
    }
    let length = arr.length
    let center_index = parseInt(arr.length / 2)
    let center = arr[center_index]
    let _arr = []
    console.count('二分查找的次数')
    if (center === search) {
      console.log(`找到了 - ${search}`)
      return false
    } else if (center > search) {
      _arr = arr.slice(0, center_index)
      binarySearch(_arr, search)
    } else {
      _arr = arr.slice(center_index, arr.length)
      binarySearch(_arr, search)
    }
  }
  binarySearch(arr, search)
  console.timeEnd('总耗时')
  console.log('----------------------------------------------------------')
})

/**
 * 数据结构 - 列表
 * 1、存储在内存中分散的位置
 * 2、通过指标进行访问
 * 3、数据的替换只需替换指针即可
 */

/**
 * 数据结构 - 数组
 * 1、存储在内存中连续的位置
 * 2、通过索引进行访问
 * 3、操作数据成本较高
 */

/**
 * 数据结构 - 栈
 * 1、垂直堆叠的结构
 * 2、添加数据放置到最后（推入）
 * 3、取出数据从最后添加的开始（弹出）
 * 4、后进先出
 */

/**
 * 数据结构 - 堆
 * 1、树形结构
 * 2、实现优先队列时使用
 * 3、优先队列 - 能够自由的添加数据，从最小值开始取出的结构
 * 4、子类数值总是大于父类
 * 5、添加首先放在末尾，与父类进行比较，父类较大则互换
 * 6、重复向上
 * 7、取出从最上面取出
 * 8、取出一个后需要重新组织
 * 9、将末尾的移动到顶部
 * 10、与子类进行比较，取出最小的放在顶部
 * 11、重复向下
 */

/**
* 数据结构 - 队列
* 1、类似于一群排队等候的结构
* 2、添加数据放置到最后（入队）
* 3、取出数据从最早添加的开始（出队）
* 4、先进先出
*/

/**
* 数据结构 - 哈希表
* 1、准备一个数组存储数据
* 2、使用哈希函数（将数据转换为固定长度值的函数）计算密钥的哈希值
* 3、取出哈希值除以数组长度的余数（mod操作）
* 4、将数据存储在数组余数索引位置
* 5、重复操作
* 6、如果余数位置有数据，以列表的形势存储现有数据（链式方法）
* 7、查找数据：
* 8、数组中哈希值除以数组长度的余数的索引位置
* 9、如果获取到的数据不匹配，需要在列表上执行线性搜索
*/

/**
* 数据结构 - 二叉查找树
* 1、所有节点都比左子树中的节点大（最小节点左子树的末尾）
* 2、所有节点都比右子树中的节点小（最大节点右子树的末尾）
* 3、添加节点 - 从顶端开始比较，小于子左树查找，大于子右树查找，直至末尾添加新节点
* 4、搜索节点 - 从顶端开始比较，小于从子树左侧查找，大于从子树右侧查找，直至匹配到
* 5、删除节点
*    - 没有子树直接删除
*    - 有一个子树直接删除，将子节点移动至删除位置
*    - 有二个子树直接删除，从子树中找到最大节点移动至删除位置
*
*/
