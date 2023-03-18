// 空间换时间 时间复杂度o(k)
// 大部分用于 autoComplete 搜索 输入法选项 分类 IP地址检索 电话号码检索

class PrefixTreeNode {
  constructor(value) {
    this.children = {};
    this.isEnd = null;
    this.value = value;
  }
}

class PrefixTree extends PrefixTreeNode {
  constructor() {
    super(null);
  }

  addWord(str) {
    const addWordHelper = (node, str) => {
      if (!str) return;
      if (!node.children[str[0]]) {
        node.children[str[0]] = new PrefixTreeNode(str[0]);
        if (str.length === 1) {
          node.children[str[0]].isEnd = true;
        } else if (str.length > 1) {
          addWordHelper(node.children[str[0]], str.slice(1));
        }
      } else {
        addWordHelper(node.children[str[0]], str.slice(1));
      }
    };
    addWordHelper(this, str);
  }
  predictWord(str) {
    let getRemainingTree = (str, tree) => {
      let node = tree;
      while (str && node) {
        node = node.children[str[0]];
        str = str.substr(1);
      }
      return node;
    };

    let allWords = [];

    let allWordsHelper = (stringSoFor, tree) => {
      for (const k in tree.children) {
        const child = tree.children[k];
        let newString = stringSoFor + child.value;
        if (child.isEnd) {
          allWords.push(newString);
        }
        allWordsHelper(newString, child);
      }
    };
    let remainingTree = getRemainingTree(str, this);
    if (remainingTree) {
      allWordsHelper(str, remainingTree);
    }
    return allWords;
  }
}

// const tree = new PrefixTree();
// tree.addWord('app');
// tree.addWord('apty');
// tree.addWord('app');
// tree.addWord('apple');
// tree.addWord('blob');
// console.log(tree);
// console.log(tree.predictWord('abc'));
