function getRemovableBlocks(benchLen, blocksAm, blocksPos) {
  function isInt(n){
    return Number(n) === n && n % 1 === 0;
  }

  let center = benchLen / 2
  let closestLeft = -Infinity
  let closestRight = Infinity
  let closestLeftValue = null
  let closestRightValue = null

  // Check if there's an extra one on the left and right

  for (let [index, block] of blocksPos.entries()) {
    let distance = Math.floor(center) - block
    // console.log(block, distance)
    // console.log(center)

    // if (!isInt(center) && distance === 0) return blocksPos.splice(index, 1)
    if (!isInt(center) && distance === 0) return block

    if (distance > 0 && distance < closestRight) {
      closestRight = distance
      closestLeftValue = block
    } else if (distance <= 0 && distance > closestLeft) {
      closestLeft = distance
      closestRightValue = block
    }
  }

  if (closestLeftValue === null || closestRightValue === null) {
    return ''
  }
  return closestLeftValue + ' ' + closestRightValue
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

let [firstLine, secondLine] = fileContent.toString().split('\n')
firstLine = firstLine.split(' ').map(item => parseInt(item))
secondLine = secondLine.split(' ').map(item => parseInt(item))

const result = getRemovableBlocks(firstLine[0], firstLine[1], secondLine)

fs.writeFileSync("output.txt", result.toString())