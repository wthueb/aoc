import { readInput } from "../utils";

const input = readInput();

const totalTime = +input[0].split(":")[1].replace(/\s/g, "");
const record = +input[1].split(":")[1].replace(/\s/g, "");

let answer = 0;

for (let v = 0; v <= totalTime; v++) {
    const d = v * (totalTime - v)

    if (d > record) answer++;
}

console.log(answer);
