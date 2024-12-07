import { input }  from './input1.ts'

const list1: number[] = [];
const list2: number[] = [];

// ingest test input, split text into two lists (2 items per row, 1 item in each list)
input.split('\n').forEach(row => {
    var [entry1, entry2 ] = row.split('   ');
    list1.push(parseInt(entry1, 10));
    list2.push(parseInt(entry2, 10));
});

// sort is in-place, no reassignment necessary
list1.sort();
list2.sort();

// total up the absolute distance between each pair of list entries
const answer1 = list1.reduce((acc, e, i) => {
    acc += Math.abs(e - list2[i]); 
    return acc;
}, 0);

console.log(answer1);

// convert the second list into an object where the key is the number and the value is its own frequency
const frequencyLookup = list2.reduce((acc, e) => {
    if (acc[e]) {
        acc[e] += 1;
    } else {
        acc[e] = 1;
    }
    return acc;
}, {})

// use each item in list 1 as the key to look up its frequency, or default to zero. total up the 'similiarity score'
const answer2 = list1.reduce((acc, e) => {
    const multiplier = frequencyLookup[e] || 0;
    acc += e * multiplier;
    return acc;
}, 0);

console.log(answer2);