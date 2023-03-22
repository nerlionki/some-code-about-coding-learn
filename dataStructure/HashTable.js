// 用开链表解决冲突

class ForwordListNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {
  constructor(bucketSize = 97) {
    this._bucketSize = bucketSize;
    this._size = 0;
    this._buckets = new Array(this._bucketSize);
  }

  hash(key) {
    let h = 0;
    for (let n = key.length, i = 0; i != n; i++) {
      h = (h << 5) | (h >> 27);
      h += key[i].charCodeAt();
    }
    return (h >>> 0) % this._bucketSize;
  }

  put(key, value) {
    let index = this.hash(key);
    let node = new ForwordListNode(key, value);
    if (!this._buckets[index]) {
      this._buckets[index] = node;
    } else {
      // 插入到链表头
      node.next = this._buckets[index];
      this._buckets[index] = node;
    }
    this._size++;
    return index;
  }

  delete(key) {
    let index = this.hash(key);
    if (!this._buckets[index]) {
      return false;
    }

    let dummy = new ForwordListNode(null, null);
    dummy.next = this._buckets[index];
    let cur = dummy.next,
      pre = dummy;
    while (cur) {
      if (cur.key === key) {
        pre.next = cur.next;
        cur = pre.next;
        this._size--;
      } else {
        pre = cur;
        cur = cur.next;
      }
    }
    this._buckets[index] = dummy;
    return true;
  }
  find(key) {
    let index = this.hash(key);
    if (!this._buckets[index]) {
      return false;
    }
    let p = this._buckets[index];
    while (p) {
      if (key === p.key) {
        return p.value;
      }
      p = p.next;
    }
    return null;
  }

  size() {
    return this._size;
  }

  isEmpty() {
    return this._size === 0;
  }
}
