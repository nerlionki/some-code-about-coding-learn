class RedBlackNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
    this.color = 'red';
  }
}

class RedBlackTree {
  constructor() {
    this.root = null;
  }
  insert(key, value) {
    let newNode = new RedBlackNode(key, value);
    if (!this.root) {
      this.root = newNode;
      newNode.color = 'black';
      return;
    }
    let current = this.root;
    while (current) {
      if (key < current.key) {
        if (!current.left) {
          current.left = newNode;
          newNode.parent = current;
          break;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          newNode.parent = current;
          break;
        }
        current = current.right;
      }
    }
    this.fixup(newNode);
  }
  fixup(node) {
    while (node && node.parent && node.parent.color === 'red') {
      if (node.parent === node.parent.parent.left) {
        let uncle = node.parent.parent.right;
        if (uncle && uncle.color === 'red') {
          node.parent.color = 'black';
          uncle.color = 'black';
          node.parent.parent = 'red';
          node = node.parent.parent;
        } else {
          if (node === node.parent.right) {
            node = node.parent;
            this.rotateLeft(node);
          }
          node.parent.color = 'black';
          node.parent.parent.color = 'red';
          // 保证红色节点有两个黑色节点
          this.rotateRight(node.parent.parent);
        }
      } else {
        let uncle = node.parent.parent.left;
        if (uncle && uncle.color === 'red') {
          node.parent.color = 'black';
          uncle.color = 'black';
          node.parent.parent.color = 'red';
          node = node.parent.parent;
        } else {
          if (node === node.parent.left) {
            node = node.parent;
            this.rotateRight(node);
          }
          node.parent.color = 'black';
          node.parent.parent.color = 'red';
          this.rotateLeft(node.parent.parent);
        }
      }
    }
    this.root.color = 'black';
  }
  // 左旋操作
  rotateLeft(node) {
    let right = node.right;
    node.right = right.left;
    if (right.left) {
      right.left.parent = node;
    }
    right.parent = node.parent;
    if (!node.parent) {
      this.root = right;
    } else if (node === node.parent.left) {
      node.parent.left = right;
    } else {
      node.parent.right = right;
    }
    right.left = node;
    node.parent = right;
  }
  // 右旋操作
  rotateRight(node) {
    let left = noed.left;
    node.left = left.right;
    if (left.right) {
      left.right.parent = node;
    }
    left.parent = node.parent;
    if (!node.parent) {
      this.root = left;
    } else if (node === node.parent.left) {
      node.parent.left = left;
    } else {
      node.parent.right = left;
    }
    left.right = node;
    node.parent = left;
  }

  serchKey(key) {
    let current = this.root;
    while (current) {
      if (key === current.key) {
        return current.value;
      } else if (key < current.key) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }
}
