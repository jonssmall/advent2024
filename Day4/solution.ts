import { input, input2 }  from './input.ts'

const grid: Grid = [];

// input string to 2D grid

input.split('\n').forEach((row, i) => {
    const chars = row.split('');
    var cells = chars.map((c, j) => {
        const cell: Cell = {
            value: c,
            coordinate: {
                x: j,
                y: i
            }
        }
        return cell;
    })
    grid.push(cells);
});

const allDirections = [up, down, left, right, upLeft, upRight, downLeft, downRight];

// general algorithm for part 1
// for any given cell, start with 'X', look in 8 directions for 'M' to establish direction
//   use that same direction to look for 'A', and then that same direction again for 'S'
var foundCounter = 0;
grid.forEach((gridRow) => {
    gridRow.forEach((cell) => {
        if (cell.value === 'X') {
            allDirections.forEach(fn => {
                // using elvis operator to bail when out of bounds of array
                const neighbor = fn(cell, grid);
                if (neighbor?.value === 'M') {
                    const nextNeighbor = fn(neighbor, grid);
                    if (nextNeighbor?.value === 'A') {
                        const nextestNeighbor = fn(nextNeighbor, grid);
                        if (nextestNeighbor?.value === 'S') {
                            foundCounter += 1;
                        }
                    }
                }
            })
        }
    });
});


console.log(foundCounter);

// part 2 basically means starting with 'A' and looking at its diagonal neighbors:
//   we have a match if S + M are present and opposite for each diagonal

function upLeftToDownRightMatch(cell, grid) {
    const upLeftNeighbor = upLeft(cell, grid);
    const downRightNeighbor = downRight(cell, grid);

    return (
        (upLeftNeighbor?.value === 'S' && downRightNeighbor?.value === 'M') || 
        (upLeftNeighbor?.value === 'M' && downRightNeighbor?.value === 'S')
    )
}

function upRightToDownLeftMatch(cell, grid) {
    const upRightNeighbor = upRight(cell, grid);
    const downLeftNeighbor = downLeft(cell, grid);

    return (
        (upRightNeighbor?.value === 'S' && downLeftNeighbor?.value === 'M') || 
        (upRightNeighbor?.value === 'M' && downLeftNeighbor?.value === 'S')
    )
}


var crossCounter = 0;

grid.forEach((gridRow) => {
    gridRow.forEach((cell) => {
        if (cell.value === 'A') {
            if (upLeftToDownRightMatch(cell, grid) && upRightToDownLeftMatch(cell, grid)) {
                crossCounter += 1;
            }
        }
    });
});

console.log(crossCounter);



// traversal helpers
// todo: handling of undefined / out of bounds has room for improvement
function up(cell: Cell, grid: Grid): Cell | undefined {
    if (grid[cell.coordinate.y - 1]) {
        return grid[cell.coordinate.y - 1][cell.coordinate.x];
    } else {
        return undefined;
    }
}

function down(cell: Cell, grid: Grid): Cell | undefined {
    if (grid[cell.coordinate.y + 1]) {
        return grid[cell.coordinate.y + 1][cell.coordinate.x];
    } else {
        return undefined;
    }
}

function left(cell: Cell, grid: Grid): Cell | undefined {
    if (grid[cell.coordinate.y]) {
        return grid[cell.coordinate.y][cell.coordinate.x - 1];
    } else {
        return undefined;
    }
}

function right(cell: Cell, grid: Grid): Cell | undefined {
    if (grid[cell.coordinate.y]) {
        return grid[cell.coordinate.y][cell.coordinate.x + 1];
    } else {
        return undefined;
    }
    
}

function upRight(cell: Cell, grid: Grid): Cell | undefined {
    if (grid[cell.coordinate.y - 1]) {
        return grid[cell.coordinate.y - 1][cell.coordinate.x + 1];
    } else {
        return undefined;
    }
}

function upLeft(cell: Cell, grid: Grid): Cell | undefined {
    if (grid[cell.coordinate.y - 1]) {
        return grid[cell.coordinate.y - 1][cell.coordinate.x - 1];
    } else {
        return undefined;
    }
}

function downRight(cell: Cell, grid: Grid): Cell | undefined {
    if (grid[cell.coordinate.y + 1]) {
        return grid[cell.coordinate.y + 1][cell.coordinate.x + 1];
    } else {
        return undefined;
    }
}

function downLeft(cell: Cell, grid: Grid): Cell | undefined {
    if (grid[cell.coordinate.y + 1]) {
        return grid[cell.coordinate.y + 1][cell.coordinate.x - 1];
    } else {
        return undefined;
    }
}


type Grid = Cell[][];
 
interface Cell {
    value: string // presumably 'X' | 'M' | 'A' | 'S';
    coordinate: Coordinate;
}

interface Coordinate {
    x: number;
    y: number;
}