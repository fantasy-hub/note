/**
 * @动态规划
 */
// 爬楼梯
// 时间复杂度：O(n)
// 空间复杂度：O(n)
const climbStairs = (n) => {
  if (n < 2) return 1
  const dp = [1, 1]
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
}

// 爬楼梯
// 时间复杂度 O(n)
// 空间复杂度 O(1)
const climbStairs = (n) => {
  if (n < 2) return 1
  let dp0 = 1
  let dp1 = 1
  for (let i = 2; i <= n; i++) {
    const dp2 = dp0 + dp1
    dp0 = dp1
    dp1 = dp2
  }
  return dp1
}

// 打家劫舍
// 时间复杂度：O(n)
// 空间复杂度：O(n)
const rob = (nums) => {
  if (!nums.length) return 0
  const dp = [0, nums[0]]
  for (let i = 2; i <= nums.length; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i - 1], dp[i - 1])
  }
  return dp[dp.length - 1]
}

// 打家劫舍
// 时间复杂度：O(n)
// 空间复杂度：O(1)
const rob = (nums) => {
  if (!nums.length) return 0
  let dp0 = 0
  let dp1 = nums[0]
  for (let i = 2; i <= nums.length; i++) {
    let dp2 = Math.max(dp0 + nums[i - 1], dp1)
    dp0 = dp1
    dp1 = dp2
  }
  return dp1
}

// 最长回文字串-中心扩散
// 时间复杂度 O(n ^ 2)
// 空间复杂度 O(1)
const longestPalindrome = (s) => {
  if (s.length < 2) return s
  let l = 0
  let r = 0
  const palindrome = (m, n) => {
    while (m > -1 && n < s.length && s[m] === s[n]) {
      m--
      n++
    }
    if (n - m > r - l) {
      l = m
      r = n
    }
  }
  for (let i = 0; i < s.length; i++) {
    palindrome(i, i)
    palindrome(i, i + 1)
  }
  return s.substring(l + 1, r)
}

// 最长回文字串-动态规划
// 时间复杂度 O(n ^ 2)
// 空间复杂度 O(n ^ 2)
const longestPalindrome = (s) => {
  const n = s.length
  const dp = Array.from(new Array(n), () => new Array(n).fill(false))
  let l = 0
  let r = 0
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      dp[i][j] = s[i] === s[j] && (j - i < 2 || dp[i + 1][j - 1])
      if (dp[i][j] && j - i > r - l) {
        l = i
        r = j
      }
    }
  }
  return s.substring(l, r + 1)
}

// 最大子数组和
// 时间复杂度 O(n)
// 空间复杂度 O(1)
const maxSubArray = (nums) => {
  let res = nums[0]
  let pre = 0
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i]
    pre = Math.max(pre + n, n)
    res = Math.max(res, pre)
  }
  return res
}

// 不同路径
// 时间复杂度 O(m * n)
// 空间复杂度 O(m * n)
const uniquePaths = (m, n) => {
  const f = Array.from(new Array(m).fill(0), () => new Array(n).fill(0))
  for (let i = 0; i < m; i++) {
    f[i][0] = 1
  }
  for (let j = 0; j < n; j++) {
    f[0][j] = 1
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      f[i][j] = f[i - 1][j] + f[i][j - 1]
    }
  }
  return f[m - 1][n - 1]
}


/**
 * @指针
 */
// 合并两个有序数组
// 时间复杂度 O(m + n)
// 空间复杂度 O(1)
const merge = (nums1, m, nums2, n) => {
  let p1 = m - 1
  let p2 = n - 1
  let len = m + n - 1
  let cur
  while (p1 >= 0 || p2 >= 0) {
    if (p1 === -1) {
      cur = nums2[p2--]
    } else if (p2 === -1) {
      cur = nums1[p1--]
    } else if (nums1[p1] > nums2[p2]) {
      cur = nums1[p1--]
    } else {
      cur = nums2[p2--]
    }
    nums1[len--] = cur
  }
  return nums1
}

// 三数之和
// 时间复杂度 O(n ^ 2)
// 空间复杂度 O(log n)
const threeSum = (nums) => {
  nums.sort((a, b) => a - b)
  const n = nums.length
  const res = []
  for (let f = 0; f < n; f++) {
    if (f > 0 && nums[f] === nums[f - 1]) continue
    let target = -1 * nums[f]
    let t = n - 1
    for (let s = f + 1; s < n; s++) {
      if (s > f + 1 && nums[s] === nums[s - 1]) continue
      while (t > s && nums[s] + nums[t] > target) t--
      if (s === t) break
      if (nums[s] + nums[t] === target) res.push([nums[f], nums[s], nums[t]])
    }
  }
  return res
}

// 下一个排列
// 时间复杂度 O(n)
// 空间复杂度 O(1)
const nextPermutation = (nums) => {
  let i = nums.length - 2
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--
  }
  if (i >= 0) {
    let j = nums.length - 1
    while (j >= 0 && nums[i] >= nums[j]) {
      j--
    }
    [nums[i], nums[j]] = [nums[j], nums[i]]
  }
  let l = i + 1
  let r = nums.length + 1
  while (l < r) {
    [nums[l], nums[r]] = [nums[r], nums[l]]
    l++
    r--
  }
}


/**
 * @链表
 */
// 反转链表
// 时间复杂度 O(n)
// 空间复杂度 O(1)
const reverseList = (head) => {
  let p1 = head
  let p2 = null
  while (p1) {
    let next = p1.next
    p1.next = p2
    p2 = p1
    p1 = next
  }
  return p1
}

// 两数相加
// 时间复杂度 O(m + n)
// 空间复杂度 O(1)
const addTwoNumbers = (l1, l2) => {
  const l3 = new ListNode(0)
  let p1 = l1
  let p2 = l2
  let p3 = l3
  let carry = 0
  while (p1 || p2) {
    const v1 = p1 ? p1.val : 0
    const v2 = p2 ? p2.val : 0
    const v3 = v1 + v2 + carry
    carry = Math.floor(v3 / 10)
    p3.next = new ListNode(v3 % 10)
    p3 = p3.next
    if (p1) p1 = p1.next
    if (p2) p2 = p2.next
  }
  if (carry) p3.next = new ListNode(carry)
  return l3.next
}

// 环形链表
// 时间复杂度 O(n)
// 空间复杂度 O(1)
const hasCycle = (head) => {
  let p1 = head
  let p2 = head
  while (p1 && p2 && p2.next) {
    p1 = p1.next
    p2 = p2.next.next
    if (p1 === p2) return true
  }
  return false
}

// 环形链表2
// 时间复杂度 O(n)
// 空间复杂度 O(1)
const detectCycle = (head) => {
  let p1 = head
  let p2 = head
  while (p1 && p2 && p2.next) {
    p1 = p1.next
    p2 = p2.next.next
    if (p1 === p2) {
      let p3 = head
      while (p1 !== p3) {
        p1 = p1.next
        p3 = p3.next
      }
      return p1
    }
  }
  return null
}

// 合并两个有序链表
// 时间复杂度 O(m + n)
// 空间复杂度 O(1)
const mergeTwoLists = (l1, l2) => {
  const l3 = new ListNode(0)
  let p1 = l1
  let p2 = l2
  let p3 = l3
  while (p1 && p2) {
    if (p1.val < p2.val) {
      p3.next = p1
      p1 = p1.next
    } else {
      p3.next = p2
      p2 = p2.next
    }
    p3 = p3.next
  }
  if (p1) p3.next = p1
  if (p2) p3.next = p2
  return l3.next
}

// 排序链表
// 时间复杂度 O(n * log n)
// 空间复杂度 O(1)
const sortList = (head) => {
  if (!head) return null
  let len = 0
  let n = head
  while (n) {
    n = n.next
    len++
  }

  const list = new ListNode(0, head)
  for (let subLen = 1; subLen < len; subLen <<= 1) {
    let p1 = list
    let p2 = list.next
    while (p2) {
      let l1 = p2
      for (let i = 1; i < subLen && p2 && p2.next; i++) {
        p2 = p2.next
      }

      let l2 = p2.next
      p2.next = null
      p2 = l2
      for (let i = 1; i < subLen && p2 && p2.next; i++) {
        p2 = p2.next
      }

      let next = null
      if (p2) {
        next = p2.next
        p2.next = null
      }

      p1.next = merge(l1, l2)
      while (p1.next) {
        p1 = p1.next
      }

      p2 = next
    }
  }
  return list.next
}

// 二叉树展开为链表-先序遍历
// 时间复杂度 O(n)
// 空间复杂度 O(n)
const flatten = (root) => {
  if (!root) return null
  const l = new TreeNode(0)
  let p = l
  const s = [root]
  while (s.length) {
    const n = s.pop()
    p.left = null
    p.right = n
    p = p.right
    if (n.right) s.push(n.right)
    if (n.left) s.push(n.left)
  }
  return l.right
}

// 二叉树展开为链表-寻找前驱节点
const flatten = (root) => {
  if (!root) return null
  let p1 = root
  while (p1) {
    if (p1.left) {
      let next = p1.left
      let p2 = next
      while (p2.right) {
        p2 = p2.right
      }
      p2.right = p1.right

      p1.left = null
      p1.right = next
    }
    p1 = p1.right
  }
  return root
}

// 删除链表的倒数第N个节点
const removeNthFromEnd = (head, n) => {
  let c = head
  let len = 0
  while (c) {
    c = c.next
    len++
  }
  let l = new ListNode(0, head)
  let p = l
  for (let i = 0; i < len - n; i++) {
    p = p.next
  }
  p.next = p.next.next
  return l.next
}

// 回文链表
// 时间复杂度 O(n)
// 空间复杂度 O(1)
const isPalindrome = (head) => {
  if (head == null) return true

  const reverseList = (head) => {
    let p1 = head
    let p2 = null
    while (p1 !== null) {
      let next = p1.next
      p1.next = p2
      p2 = p1
      p1 = next
    }
    return p2
  }

  const endOfFirstHalf = (head) => {
    let p1 = head
    let p2 = head
    while (p1.next !== null && p1.next.next !== null) {
      p1 = p1.next.next
      p2 = p2.next
    }
    return p2
  }

  // 找到前半部分链表的尾节点并反转后半部分链表
  // 当快指针移动到链表的末尾时，慢指针恰好到链表的中间
  const firstHalfEnd = endOfFirstHalf(head)
  const secondHalfStart = reverseList(firstHalfEnd.next)

  // 判断是否回文
  let p1 = head
  let p2 = secondHalfStart
  let result = true
  while (result && p2 != null) {
    if (p1.val != p2.val) result = false
    p1 = p1.next
    p2 = p2.next
  }

  // 还原链表并返回结果
  firstHalfEnd.next = reverseList(secondHalfStart)
  return result
}


/**
 * @树
 */
// 深度优先遍历
const dfs = (root) => {
  if (!root) return
  console.log(root.val);
  root.children.forEach(dfs)
}

// 广度优先遍历
const bfs = (root) => {
  const q = [root]
  while (q.length) {
    const n = q.shift()
    console.log(n.val);
    n.children.forEach(i => q.push(i))
  }
}

// 先序遍历
const preOrder = (root) => {
  if (!root) return null
  const s = [root]
  while (s.length) {
    const n = s.pop()
    console.log(n.val);
    if (n.right) s.push(n.right)
    if (n.left) s.push(n.left)
  }
}

// 中序遍历
const inOrder = (root) => {
  if (!root) return null
  const s = []
  let p = root
  while (s.length || p) {
    while (p) {
      s.push(p)
      p = p.left
    }
    const n = s.pop()
    console.log(n.val);
    p = n.right
  }
}

// 后续遍历
const postOrder = (root) => {
  if (!root) return null
  const s = [root]
  const ots = []
  while (s.length) {
    const n = s.pop()
    ots.push(n)
    if (n.left) s.push(n.left)
    if (n.right) s.push(n.right)
  }
  while (ots.length) {
    const o = ots.pop()
    console.log(o.val);
  }
}

// 翻转二叉树
// 时间复杂度 O(n)
// 空间复杂度 O(n)
const invertTree = (root) => {
  if (!root) return null
  return {
    val: root.val,
    left: invertTree(root.right),
    right: invertTree(root.left)
  }
}

// 相同二叉树
// 时间复杂度 O(n)
// 空间复杂度 O(n)
const isSameTree = (p, q) => {
  if (
    !p && !q ||
    p && q && p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
  ) return true
  return false
}

// 对称二叉树
// 时间复杂度 O(n)
// 空间复杂度 O(n)
const isSymmetric = (root) => {
  if (!root) return true
  const isMirror = (p, q) => {
    if (
      !p && !q ||
      p && q && p.val === q.val && isMirror(p.left, q.right) && isMirror(p.right, q.left)
    ) return true
    return false
  }
  return isMirror(root.left, root.right)
}

// 二叉树层序遍历
// 时间复杂度 O(n)
// 空间复杂度 O(n)
const levelOrder = (root) => {
  if (!root) return []
  const res = []
  const q = [
    [root, 0]
  ]
  while (q.length) {
    const [n, l] = q.shift()
    if (!res[l]) {
      res[l] = [n.val]
    } else {
      res[l].push(n.val)
    }
    if (n.left) q.push([n.left, l + 1])
    if (n.right) q.push([n.right, l + 1])
  }
  return res
}

// 二叉树层序遍历
// 时间复杂度 O(n)
// 空间复杂度 O(n)
const levelOrder = (root) => {
  if (!root) return []
  const res = []
  const q = [root]
  while (q.length) {
    let len = q.length
    res.push([])
    while (len--) {
      const n = q.shift()
      res[res.length - 1].push(n.val)
      if (n.left) q.push(n.left)
      if (n.right) q.push(n.right)
    }
  }
  return res
}

// 路径总和
// 时间复杂度 O(n)
// 空间复杂度 O(n)
const hasPathSum = (root, sum) => {
  if (!root) return false
  let res = false
  const dfs = (n, s) => {
    if (!n.left && !n.right && s === sum) res = true
    if (n.left) dfs(n.left, s + n.left.val)
    if (n.right) dfs(n.right, s + n.right.val)
  }
  dfs(root, root.val)
  return res
}

// 打家劫舍3
// 时间复杂度 O(n), n为递归的深度
// 空间复杂度 O(n), n为递归堆栈的高度
const rob = (root) => {
  const dfs = (n) => {
    if (!n) return [0, 0]
    const l = dfs(n.left)
    const r = dfs(n.right)
    const select = n.val + l[1] + r[1]
    const unSelect = Math.max(...l) + Math.max(...r)
    return [select, unSelect]
  }
  return Math.max(...dfs(root))
}

// 验证二叉搜索树-中序遍历
// 时间复杂度 O(n)
// 空间复杂度 O(n)
const isValidBST = (root) => {
  if (!root) return true
  const s = []
  let p = root
  let prev = -Infinity
  while (s.length || p) {
    while (p) {
      s.push(p)
      p = p.left
    }
    const n = s.pop()
    if (prev >= n.val) return false
    prev = n.val
    p = n.right
  }
  return true
}

// 验证二叉搜索树-分而治之
// 时间复杂度 O(n)
// 空间复杂度 O(n)
const isValidBST = (root) => {
  const dfs = (n, low, high) => {
    if (n === null) return true
    if (n.val <= low || n.val >= high) return false
    return dfs(n.left, low, n.val) && dfs(n.right, n.val, high)
  }
  return dfs(root, -Infinity, Infinity)
}

// 不同的二叉搜索树
// 时间复杂度 O(n ^ 2)
// 空间复杂度 O(n)
const numTrees = (n) => {
  const dp = new Array(n + 1).fill(0)
  dp[0] = dp[1] = 1
  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      dp[i] += dp[i - j] * dp[j - 1]
    }
  }
  return dp[n]
}

// 合并二叉树
// 时间复杂度 O(min(m, n))
// 空间复杂度 O(min(m, n))
const mergeTrees = (root1, root2) => {
  // 如果一棵树有，另一棵树没有，接上去
  if (root1 == null) return root2
  if (root2 == null) return root1
  // 两棵树都有的节点，叠加节点值
  root1.val += root2.val
  // 递归合并左右子树
  root1.left = mergeTrees(root1.left, root2.left)
  root1.right = mergeTrees(root1.right, root2.right)
  return root1
}


/**
 * @字典
 */
// 两个数组的交集
// 时间复杂度 O(m + n)
// 空间复杂度 O(n)
const intersection = (nums1, nums2) => {
  const res = []
  const map = new Map()
  nums1.forEach(i => map.set(i, true))
  nums2.forEach(i => {
    if (map.get(i)) {
      res.push(i)
      map.delete(i)
    }
  })
  return res
}

// 两数之和
// 时间复杂度 O(n)
// 空间复杂度 O(1)
const twoSum = (nums, target) => {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const n1 = nums[i]
    const n2 = target - n1
    if (map.has(n2)) {
      return [map.get(n2), i]
    }
    map.set(n1, i)
  }
}

// 无重复字符最长子串
// 时间复杂度 O(n)
// 空间复杂度 O(1)
const lengthOfLongestSubstring = (s) => {
  let res = 0
  const map = new Map()
  let l = 0
  for (let r = 0; r < s.length; r++) {
    const n = s[r]
    if (map.has(n) && map.get(n) >= l) {
      l = map.get(n) + 1
    }
    res = Math.max(res, r - l + 1)
    map.set(n, r)
  }
  return res
}

// 最小覆盖子串
// 时间复杂度 O()
// 空间复杂度 O()
const minWindow = (s, t) => {
  let res = ''
  const need = new Map()
  for (let c of t) {
    need.set(c, need.has(c) ? need.get(c) + 1 : 1)
  }
  let needSize = need.size
  let l = 0
  let r = 0
  while (r < s.length) {
    const n = s[r]
    if (need.has(n)) {
      need.set(n, need.get(n) - 1)
      if (need.get(n) === 0) needSize -= 1
    }
    while (needSize === 0) {
      let _res = s.substring(l, r + 1)
      if (!res || _res.length < res.length) res = _res
      let o = s[l]
      if (need.has(o)) {
        need.set(o, need.get(o) + 1)
        if (need.get(o) === 1) needSize += 1
      }
      l++
    }
    r++
  }
  return res
}


/**
 * @回溯算法
 */
// 全排列
// 时间复杂度 O(n!)
// 空间复杂度 O(n)
const permute = (nums) => {
  if (!nums.length) return []
  const res = []
  const backtrack = (path) => {
    if (path.length === nums.length) {
      res.push(path)
      return
    }
    for (let i = 0; i < nums.length; i++) {
      const n = nums[i]
      if (path.includes(n)) continue
      backtrack([...path, n])
    }
  }
  backtrack([])
  return res
}

// 子集
// 时间复杂度 O(2 ^ n)
// 空间复杂度 O(n)
const subsets = (nums) => {
  const res = []
  const backtrack = (path, len, start) => {
    if (path.length === len) {
      res.push(path)
      return
    }
    for (let i = start; i < nums.length; i++) {
      const n = nums[i]
      backtrack([...path, n], len, i + 1)
    }
  }
  for (let i = 0; i <= nums.length; i++) {
    backtrack([], i, 0)
  }
  return res
}

// 电话号码的字母组合
// 时间复杂度 O(3 ^ m * 4 ^ n), 7和9位4的n次幂
// 空间复杂度 O(m + n) 
// m为对应3个字母的个数, n为对应4个字母的个数
const letterCombinations = (digits) => {
  if (digits.length === 0) return []
  const phoneMap = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz',
  }
  const res = []
  const backtrack = (path, idx) => {
    if (idx = digits.length) {
      res.push(path)
      return
    }
    const key = digits[idx]
    const value = phoneMap[key]
    for (let i = 0; i < value.length; i++) {
      backtrack(path + value[i], idx + 1)
    }
  }
  backtrack('', 0)
  return res
}

// 组合总和
// 时间复杂度 O(s), s为所有可行解的长度之和 即 搜索所有子节点的深度之和
// 空间复杂度 O(target), target为递归的栈深度 
const combinationSum = (candidates, target) => {
  const res = []
  const dfs = (target, path, idx) => {
    if (idx === candidates.length) {
      return
    }
    if (target === 0) {
      res.push(path)
      return
    }
    // 不选择当前数
    dfs(target, path, idx + 1)
    // 选择当前数
    const n = candidates[idx]
    if (target - n >= 0) {
      dfs(target - n, [...path, n], idx)
    }
  }

  dfs(target, [], 0)
  return res
}

// 括号生成
const generateParenthesis = (n) => {
  const res = []
  const dfs = (path, left, right) => {
    if (left > n || right > left) return
    if (path.length == 2 * n) {
      res.push(path)
      return
    }
    dfs(path + '(', left + 1, right)
    dfs(path + ')', left, right + 1)
  }

  dfs('', 0, 0)
  return res
}