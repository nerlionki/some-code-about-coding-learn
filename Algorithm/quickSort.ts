// 快速排序采用分治方法，选取一个基点，将小于基点的数放在基点左侧，把大于基点的数放在基点右侧，针对左右分区进行相同操作，直至排序完成
const quickSort1: (arr: number[]) => number[] = arr => {
  if (arr.length < 2) {
    return arr.slice();
  }
  let pivot = arr[Math.floor(Math.random() * arr.length)];
  let left: number[] = [];
  let middle: number[] = [];
  let right: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (element < pivot) {
      left.push(element);
    } else if (element === pivot) {
      middle.push(element);
    } else {
      right.push(element);
    }
  }
  return quickSort1(left).concat(middle, quickSort1(right));
};

// in-place 指使用O(1)空间在输入的空间进行原地操作
// in-place优化 采用双指针遍历，但发现右边小于基准点值时，将值赋值到起始位置。当左边有大于基准的点时将该值赋值到之前右边空出来的位置 直到i不在小于j
const quickSort2: (arr: number[], start?: number, end?: number) => void = (
  arr,
  start,
  end
) => {
  start = start ? start : 0;
  end = end ? end : arr.length - 1;
  if (start >= end) {
    return;
  }
  let value = arr[start];
  let i = start;
  let j = end;
  while (i < j) {
    while (i < j && arr[j] >= value) {
      j--;
    }
    if (i < j) {
      arr[i++] = arr[j];
    }
    while (i < j && arr[i] <= value) {
      i++;
    }
    if (i < j) {
      arr[j--] = arr[i];
    }
  }
  arr[i] = value;
  quickSort2(arr, start, i - 1);
  quickSort2(arr, i + 1, end);
};

// 尾递归优化
const quickSort3: (arr: number[], stack: number[]) => void = (
  arr,
  stack = [0, arr.length - 1]
) => {
  let start = stack[0];
  let end = stack[1];
  let value = arr[start];
  let i = start;
  let j = end;
  while (i < j) {
    while (i < j && arr[j] >= value) {
      j--;
    }
    if (i < j) {
      arr[i++] = arr[j];
    }
    while (i < j && arr[i] <= value) {
      i++;
    }
    if (i < j) {
      arr[j--] = arr[i];
    }
  }
  arr[i] = value;
  stack.shift();
  stack.shift();
  if (i + 1 < end) {
    stack.unshift(i + 1, end);
  }
  if (start < i - 1) {
    stack.unshift(start, i - 1);
  }
  if (stack.length === 0) {
    return;
  }
  return quickSort3(arr, stack);
};

// 如果对已经有序的数组进行排序，恰好每次pivot选取都是第一个或是最后一个，那么每次都有一个区域是空的，递归层数变为n（数组的长度），时间复杂度变为O(n²)
// 可以采用三数取中的pivot优化方案

// ts-ignore
const getThirdIndex = (a: number[], from: number, to: number): number => {
  let t_array: [number, number][] = new Array();
  const increment = 200 + ((to - from) & 15); //保证取值在200-215之间
  let j = 0;
  from += 1;
  to -= 1;
  for (let i = from; i < to; i += increment) {
    t_array[j] = [i, a[i]];
    j++;
  }
  t_array.sort((a, b) => {
    // return compareFn(a[1],b[1])
    return a[1] - b[1];
  });
  // t_array.length >> 1 右移动1位，取数组中位数
  return t_array[t_array.length >> 1][0];
};

// 早期V8引擎在快速排序时，数组长度小于等于1000时，选取折半位置的元素作为pivot点看，超过1000时采用上述getThirdIndex方法选取pivot点
