export function RandomMaze(startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  let walls = [];
  for (let row = 0; row < 50; row++) {
    for (let col = 0; col < 25; col++) {
      if (
        (row === startNode.x && col === startNode.y) ||
        (row === finishNode.x && col === finishNode.y)
      )
        continue;
      if (Math.random() < 0.33) {
        walls.push([row, col]);
      }
    }
  }
  walls.sort(() => Math.random() - 0.5);
  return walls;
}
