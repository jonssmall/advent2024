// borrowing 2D array stuff from Day 4

// traversal helpers
export function up(cell: Cell, grid: Grid): Cell | undefined {
    if (grid[cell.coordinate.y - 1]) {
        return grid[cell.coordinate.y - 1][cell.coordinate.x];
    } else {
        return undefined;
    }
}

export function down(cell: Cell, grid: Grid): Cell | undefined {
    if (grid[cell.coordinate.y + 1]) {
        return grid[cell.coordinate.y + 1][cell.coordinate.x];
    } else {
        return undefined;
    }
}

export function left(cell: Cell, grid: Grid): Cell | undefined {
    if (grid[cell.coordinate.y]) {
        return grid[cell.coordinate.y][cell.coordinate.x - 1];
    } else {
        return undefined;
    }
}

export function right(cell: Cell, grid: Grid): Cell | undefined {
    if (grid[cell.coordinate.y]) {
        return grid[cell.coordinate.y][cell.coordinate.x + 1];
    } else {
        return undefined;
    }
    
}

export function upRight(cell: Cell, grid: Grid): Cell | undefined {
    if (grid[cell.coordinate.y - 1]) {
        return grid[cell.coordinate.y - 1][cell.coordinate.x + 1];
    } else {
        return undefined;
    }
}

export function upLeft(cell: Cell, grid: Grid): Cell | undefined {
    if (grid[cell.coordinate.y - 1]) {
        return grid[cell.coordinate.y - 1][cell.coordinate.x - 1];
    } else {
        return undefined;
    }
}

export function downRight(cell: Cell, grid: Grid): Cell | undefined {
    if (grid[cell.coordinate.y + 1]) {
        return grid[cell.coordinate.y + 1][cell.coordinate.x + 1];
    } else {
        return undefined;
    }
}

export function downLeft(cell: Cell, grid: Grid): Cell | undefined {
    if (grid[cell.coordinate.y + 1]) {
        return grid[cell.coordinate.y + 1][cell.coordinate.x - 1];
    } else {
        return undefined;
    }
}


export type Grid = Cell[][];
 
export interface Cell {
    value: string // presumably '#' | '.' | '^' | '>' | 'v' | '<'
    coordinate: Coordinate;
}

export interface Coordinate {
    x: number;
    y: number;
}