/**
 * 二叉树特性
 *
 * 1.左子树上的所有节点的值均小于或等于它根节点的值
 * 2.右子树上的所有节点的值均大于或等于它根节点的值
 * 3.左、右子树也分别为二叉树
 */

class Node {
  constructor(data) {
    this.left = null;
    this.right = null;
    this.value = data;
  }
}
class BSTree {
  constructor() {
    this.root = null;
  }
  insertNode(root, newNode) {
    if (newNode.value < root.value) {
      !root.left ? (root.left = newNode) : this.insertNode(root.left, newNode);
    } else {
      !root.right
        ? (root.right = newNode)
        : this.insertNode(root.right, newNode);
    }
  }
  insert(value) {
    let newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }
  removeNode(root, value) {
    if (!root) {
      return null;
    }
    if (value < root.left) {
      root.left = this.removeNode(root.left, value);
      return root;
    } else if (value > root.right) {
      root.right = this.removeNode(root.right, value);
      return root;
    } else {
      if (!root.left && !root.right) {
        root = null;
        return root;
      }
      if (root.left && !root.right) {
        root = root.left;
        return root;
      }
      if (root.right && !root.left) {
        root = root.right;
        return root;
      }
      let minRight = this.findMinNode(root.right);
      root.value = minRight.value;
      root.right = this.removeNode(root.right, minRight.value);
      return root;
    }
  }
  remove(value) {
    if (this.root) {
      this.removeNode(this.root, value);
    }
  }
  findMinNode(root) {
    if (!root.left) {
      return root;
    } else {
      return this.findMinNode(root.left);
    }
  }
  searchNode(root, value) {
    if (!root) {
      return null;
    }
    if (root.value > value) {
      return this.searchNode(root.left, value);
    }
    if (root.value < value) {
      return this.searchNode(root.right, value);
    }
    return root;
  }

  // 前序遍历
  preOrder(root) {
    if (root) {
      console.log(root.value);
      this.preOrder(root.left);
      this.preOrder(root.right);
    }
  }

  // 中序遍历
  inOrder(root) {
    if (root) {
      this.inOrder(root.left);
      console.log(root.value);
      this.inOrder(root.right);
    }
  }

  // 后序遍历
  postOrder(root) {
    if (root) {
      this.postOrder(root.left);
      this.postOrder(root.right);
      console.log(root.value);
    }
  }
}
/**
 * 前序遍历、中序遍历和后序遍历是二叉树遍历的三种基本方法。

前序遍历：先访问根节点，再访问左子树，最后访问右子树。在前序遍历序列中，根节点永远是第一个被访问的节点。

中序遍历：先访问左子树，再访问根节点，最后访问右子树。在中序遍历序列中，根节点总是在左子树和右子树之间。

后序遍历：先访问左子树，再访问右子树，最后访问根节点。在后序遍历序列中，根节点总是最后一个被访问的节点。

这三种遍历方式都能够遍历整个二叉树，并且每个节点都会被且仅被访问一次。它们的主要区别在于遍历顺序不同，因此适用于不同的场合。

- 前序遍历通常用来复制整棵树。
- 中序遍历通常用来对排序二叉树进行排序操作。
- 后序遍历通常用来释放整棵树所占据的内存空间。

当然，在具体应用中，它们也可以相互转化使用，具体取决于问题的需求。
 * 
 */
