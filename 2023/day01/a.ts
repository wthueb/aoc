import { readInput } from "../utils";

const input = readInput();

let sum = 0;

for (const line of input) {
    let value = "";

    for (const char of line) {
        if (!isNaN(+char)) {
            if (value === "") {
                value = char + char;
            } else {
                value = value[0] + char;
            }
        }
    }

    sum += +value;
}

console.log(sum);
