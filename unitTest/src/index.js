function convert(root) {
  const arr = []
  const queue = [root]
  const NodeToTreeNode = new Map()
  while (queue.length) {
    const node = queue.shift()
    const {
      id,
      name,
      children = []
    } = node

    const parentNode = NodeToTreeNode.get(node)
    const parentId = parentNode ? parentNode.id : 0
    const item = {
      id,
      name,
      parentId
    }
    arr.push(item)

    children.forEach(i => {
      NodeToTreeNode.set(i, node) // 映射 parent
      queue.push(i)
    })
  }
  return arr
}

const tree = {
  id: 1,
  name: 'A',
  children: [{
      id: 2,
      name: 'B',
      children: [{
          id: 4,
          name: 'D'
        },
        {
          id: 5,
          name: 'E'
        }
      ]
    },
    {
      id: 3,
      name: 'C',
      children: [{
        id: 6,
        name: 'F'
      }]
    }
  ]
}

console.log(convert(tree));