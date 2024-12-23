const fs = require('node:fs');

const input: string = fs.readFileSync('./Day3/input.txt', 'utf8');


// valid characters are mul followed by open paren, 1-3 digits, COMMA, 1-3 digits, close paren

// todo: this might not address nested expressions e.g. mul(mul(1,2),3)
const regex = /mul\([0-9]{1,3},[0-9]{1,3}\)/g;
const commands = input.match(regex) as string[];

// console.log(commands);

const answer1 = commands.reduce((acc, e) => {
    acc += processCommand(e);
    return acc;
}, 0)

function processCommand(cmd: string): number {
    const numbers = cmd.slice(4).slice(0, -1).split(',').map(x => parseInt(x, 10));
    return numbers[0] * numbers[1];
}

console.log(answer1);

// part 2

const regex2 = /mul\([0-9]{1,3},[0-9]{1,3}\)|do\(\)|don\'t\(\)/g;
const commands2 = input.match(regex2) as string[];
var enabled = true;

// enumerate through the commands, flagging enabled on or off when encountering DO or DONT commands respectively

const answer2 = commands2.reduce((acc, e) => {
    if (e === "do()") {
        enabled = true;
    } else if (e === "don't()") {
        enabled = false;
    } else {
        if (enabled) {
            acc += processCommand(e);
        }
    }
    return acc;
}, 0)

console.log(answer2);