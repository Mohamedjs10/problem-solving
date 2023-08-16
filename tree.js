// -------------------------------------------------------------------------
//* [1] Maximum Depth of Binary Tree (the longest path from root node to leaf nodes)
//* [2] Invert Binary Tree
//* [3] Are Same Trees

//^ Recursive Approach
// -------------------------------------------------------------------------

//& create a node type
class TreeNode {
  constructor(val) {
    this.val = val;
    // set subnodes to null // override with value if present later
    this.left = null;
    this.right = null;
  }
}

//& convert (array-like tree) [3, 9, 20, null, null, 15, 7] to (real tree) {nested objects}
//~ Manual Tree Creation
// const root = new TreeNode(3);
// root.left = new TreeNode(9);
// root.right = new TreeNode(20);
// root.left.left = new TreeNode(null);
// root.left.right = new TreeNode(null);
// root.right.left = new TreeNode(15);
// root.right.right = new TreeNode(7);
//~ Automatic Tree Creation
function createBinaryTreeFromArray(arr, index = 0) {
  // index = 0 for 1st recursion cycle only
  if (index >= arr.length || arr[index] === null) {
    return null;
  }
  const node = new TreeNode(arr[index]);
  node.left = createBinaryTreeFromArray(arr, 2 * index + 1);
  node.right = createBinaryTreeFromArray(arr, 2 * index + 2);

  return node;
}
// root is main node contain the tree downside
const root = createBinaryTreeFromArray([3, 9, 20, null, null, 15, 7]);

//* GET MAXIMUM DEPTH
function maxDepth(root) {
  // tree => node followed by node followed by node ... // 1st recursion level: tree is the root node // last recursion level: tree is the leaf node
  if (root === null) {
    return 0;
  }

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
}

//* INVERT THE TREE
function invertTree(root) {
  if (root === null) {
    return null;
  }

  // Swap the left and right subtrees
  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  // Recursively invert the left and right subtrees
  invertTree(root.left);
  invertTree(root.right);

  return root;
}

//* Are Same Trees
function areSameTrees(root1, root2) {
  // Base case: If both nodes are null, they are the same
  if (root1 === null && root2 === null) {
    return true;
  }

  // If only one of the nodes is null, they are not the same
  if (root1 === null || root2 === null) {
    return false;
  }

  // If the values of the nodes are different, they are not the same
  if (root1.value !== root2.value) {
    return false;
  }

  // Recursively compare the left subtrees and right subtrees of both trees
  return (
    areSameTrees(root1.left, root2.left) &&
    areSameTrees(root1.right, root2.right)
  );
}
