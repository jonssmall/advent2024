import { input }  from './input.ts'

const reports = input.split('\n');

// each report can have different space-separated levels

// count the number of safe reports
const answer1 = reports.reduce((acc, e) => {
    var safe = true;
    const levels = e.split(' ').map(x => parseInt(x, 10));
    
    // determine the initial direction that all level comparisons should oblige
    const isIncrementing = levels[0] < levels[1]
    for (let i = 0; i < levels.length - 1; i++)
    {
        const currentLevel = levels[i];
        const nextLevel = levels[i + 1];

        if (isIncrementing ? isSafelyIncrementing(currentLevel, nextLevel) : isSafelyDecrementing(currentLevel, nextLevel)) {
            continue;
        } else {
            safe = false;
            break;
        }
    }

    if (safe) {
        acc += 1;
    }

    return acc;
}, 0);

function isSafelyIncrementing(x, y) {
    const delta = y - x;
    return x < y && (delta >= 1 && delta <= 3);
}

function isSafelyDecrementing(x, y) {
    const delta = x - y;
    return x > y && (delta >= 1 && delta <= 3);
}

console.log(answer1);

// part 2

// no way this is optimal 
//   but exploding every row into each possible combination of removing 1 level will satisfy dampener requirement

const answer2 = reports.reduce((acc, e) => {
    var explodedReports = explodeReport(e);

    var any = explodedReports.some(report => {
        var safe = true;
        const levels = report.map(x => parseInt(x, 10));
        
        // determine the initial direction that all level comparisons should oblige
        const isIncrementing = levels[0] < levels[1]
        for (let i = 0; i < levels.length - 1; i++)
        {
            const currentLevel = levels[i];
            const nextLevel = levels[i + 1];

            if (isIncrementing ? isSafelyIncrementing(currentLevel, nextLevel) : isSafelyDecrementing(currentLevel, nextLevel)) {
                continue;
            } else {
                safe = false;
                break;
            }
        }

        return safe;
    }) 

    if (any)
    
    acc += 1;

    return acc;
}, 0);

console.log(answer2);


// turns one row of levels into every combination in which one level is removed
function explodeReport(report: string): string[][] {
    const reports: string[][] = [];
    report.split(' ').forEach(e => {
        reports.push([...report.split(' ')]);
    })

    reports.forEach((e, i) => {
        e.splice(i, 1);
    });

    return reports;
}