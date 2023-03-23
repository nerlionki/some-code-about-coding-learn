class Graph {
  constructor() {
    this.AdjList = new Map();
  }

  addVertex(vertex) {
    if (!this.AdjList.has(vertex)) {
      this.AdjList.set(vertex, []);
    } else {
      throw 'vertex already exist!';
    }
  }

  addEdge(vertex, node) {
    if (this.AdjList.has(vertex)) {
      if (this.AdjList.has(node)) {
        let arr = this.AdjList.get(vertex);
        if (!arr.includes(node)) {
          arr.push(node);
        }
      } else {
        throw `Can't add non-existing vertex ->'${node}'`;
      }
    } else {
      throw `You should add '${vertex}' first`;
    }
  }

  createVisitedObject() {
    let map = {};
    for (const key of this.AdjList.keys()) {
      map[key] = false;
    }
    return map;
  }

  // 广度优先
  bfs(initalNode) {
    let visited = this.createVisitedObject();
    let queue = [];
    visited[initalNode] = true;
    queue.push(initalNode);
    while (queue.length) {
      let current = queue.shift();
      console.log(current);

      let arr = this.AdjList.get(current);
      for (const eleme of arr) {
        if (!visited[eleme]) {
          visited[eleme] = true;
          queue.push(eleme);
        }
      }
    }
  }

  // 深度优先 递归方式进行
  dfs(initalNode) {
    let visited = this.createVisitedObject();
    this.dfsHelper(initalNode, visited);
  }

  dfsHelper(node, visited) {
    visited[node] = true;
    console.log(node);
    let arr = this.AdjList.get(node);
    for (const eleme of arr) {
      if (!visited[eleme]) {
        this.dfsHelper(eleme, visited);
      }
    }
  }
}
