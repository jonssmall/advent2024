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


// part 2

const badRows = updateRowsAsNumbers.filter(r => !isGoodRow(r));

// how to correct a bad row? similar algorithm but when we detect a problem we swap positions and restart the row test?
function correctRow(row: number[]): number[] {
    const newRow = [...row]
    // todo: not clean at all to gut most of the previous algorithm
    for (let i = newRow.length - 1; i >= 0; i--) {
        const currentNumber = newRow[i];
        if (lookup[currentNumber]) {
            const lookupValue = lookup[currentNumber];
            for (let j = i - 1; j >= 0; j--) {
                const tester = newRow[j];
                if (lookupValue.has(tester)) {
                    // swap them in newRow and restart the process. there's no way this is performant.
                    var placeholder = currentNumber;
                    newRow[i] = tester;
                    newRow[j] = placeholder;
                    i = row.length;  // this is a hack because it'll get decremented as it enters the outer for-loop again
                    break;
                }
            }
        }
    }

    return newRow;
}

const correctedRows = badRows.map(correctRow);


const sum2 = correctedRows.reduce((acc, r) => {
    return acc += r[Math.floor(r.length / 2)];
}, 0);

console.log(sum2);





// example data for debugging
const exampleOrders = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13`;

const exampleRows = `
75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;