import { down, left, right, up } from './gridHelpers.ts';
import { input, sampleInput }  from './input.ts'
import type { Cell, Grid } from './gridHelpers.ts';

/*

If there is something directly in front of you, turn right 90 degrees.
Otherwise, take a step forward.

*/
const grid: Grid = [];

var positionCell: Cell = { value : '', coordinate: { x: 0, y: 0}}
var stepsTaken = 1; // including starting position

sampleInput.split('\n').forEach((row, i) => {
    const chars = row.split('');
    var cells = chars.map((c, j) => {
        const cell: Cell = {
            value: c,
            coordinate: {
                x: j,
                y: i
            }
        }
        
        if (c === '^') {
            positionCell = cell;
        }

        return cell;
    })
    grid.push(cells);
});

const movementLookup: { [facing: string]: (cell: Cell, grid: Grid) => Cell | undefined } = {
    '^': up,
    '>': right,
    'v': down,
    '<': left
}

const turnRightLookup = {
    '^': '>',
    '>': 'v',
    'v': '<',
    '<': '^'
}

function rotate(personCell: Cell): Cell {
    return {
        ...personCell,
        value: turnRightLookup[personCell.value]
    }
}

// keep going forward until we escape the grid e.g. undefined cell traversal
while (movementLookup[positionCell.value](positionCell, grid)) {
    var nextCell = movementLookup[positionCell.value](positionCell, grid) as Cell; // asserting non-undefined at this point
    if (nextCell.value === '#') {
        positionCell = rotate(positionCell);
    } else {
        if (nextCell.value === '.') {
            stepsTaken += 1;
            nextCell.value = positionCell.value; // mark spots already travelled in order to properly count distinct coordinates
        }
        
        positionCell = {
            ...positionCell,
            coordinate: nextCell.coordinate
        }
    }
}



console.log(stepsTaken);



// the patrol will get stuck in an infinite loop if i put an obstacle at a coordinate 
//   that causes it to turn right onto a path in the same direction they have already visited.
// the grid has already been marked with the footprints from answer 1.

var loopCandidates = 0;

// iterate through the whole grid
// for a given cell, if the cell has a footprint AND the cell ahead of it is NOT an existing obstacle '#'
//   and the cell to the right of it is already its rotate(x) footprint, increment loopCandidates by 1

grid.forEach(row => {
    row.forEach(cell => {
        const hasFootprint = ['v', '<', '^', '>'].some(c => c === cell.value);
        if (hasFootprint) {
            const nextCell = movementLookup[cell.value](cell, grid);
            if (nextCell) { // ignore leaving grid
                if (nextCell.value === "#") {
                    return;
                } else {
                    var rightHandCell = movementLookup[turnRightLookup[cell.value]](cell, grid);
                    if (rightHandCell && rightHandCell.value === turnRightLookup[cell.value]) {
                        loopCandidates += 1;
                        cell.value = '?';

                        console.log(JSON.stringify(cell, null, 2))
                    }
                }
            }
        }
    });
});

console.log(loopCandidates);


function gridToString(grid: Grid): string {
    return grid.reduce((acc, e) => {
        const row = e.map(c => c.value).join('');
        return acc + '\n' + row;
    }, '');
}

console.log(gridToString(grid));