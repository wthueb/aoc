import { readInput } from "../utils";

const input = readInput();

const times = input[0].split(/\s+/).slice(1).map(Number);
const records = input[1].split(/\s+/).slice(1).map(Number);

let answer = 1;

for (let race = 0; race < times.length; race++) {
    const totalTime = times[race];
    const record = records[race];

    let ways = 0;

    for (let v = 0; v <= totalTime; v++) {
        const d = v * (totalTime - v)

        if (d > record) ways++;
    }

    answer *= ways;
}

console.log(answer);
