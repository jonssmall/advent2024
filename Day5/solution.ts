import { updatesInput, ordersInput }  from './input.ts'

// iterate through each X|Y pair, creating a lookup of { X: [ ..., Y ] }

const lookup: { [x: number] : Set<number> } = {};

ordersInput.split('\n').forEach(pair => {
    const [x, y] = pair.split('|').map(x => parseInt(x, 10));
    if (lookup[x]) {
        lookup[x].add(y); // is Y guaranteed to be unique? does it matter?
    } else {
        lookup[x] = new Set<number>([y]);
    }
});

// for a given row of the updates, determine if it is valid by working from right to left
//   using the current number as the lookup key and checking if any of its Set are present in the remaining left-side portion of the row
//   if so, its a bad row

function isGoodRow(row: number[]): boolean {
    for (let i = row.length - 1; i >= 0; i--) {
        const currentNumber = row[i];
        if (lookup[currentNumber]) {
            for (let j = i - 1; j >= 0; j--) {
                const tester = row[j];
                if (lookup[currentNumber].has(tester)) { // at  least one of the numbers to the LEFT of the current number is in its lookup for numbers it must precede
                    return false;
                }
            }
        }
    }

    return true;
}

const updateRowsAsNumbers: number[][] = updatesInput.split('\n').map(r => r.split(',').map(x => parseInt(x, 10)));

const passingRows = updateRowsAsNumbers.filter(isGoodRow);


const sum = passingRows.reduce((acc, r) => {
    return acc += r[Math.floor(r.length / 2)];
}, 0);

console.log(sum);
