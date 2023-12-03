import { readInput } from "../utils";

const input = readInput();

let sum = 0;

const toNum = (str: string): number | null => {
    const num = +str[0];

    if (!isNaN(num)) return num;

    const nums = [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
    ];

    for (let i = 0; i < nums.length; i++) {
        if (str.startsWith(nums[i])) return i;
    }

    return null;
};

for (const line of input) {
    let value = "";

    for (let i = 0; i < line.length; i++) {
        const num = toNum(line.slice(i));

        if (num !== null) {
            if (value === "") {
                value = `${num}${num}`;
            } else {
                value = value[0] + `${num}`;
            }
        }
    }

    sum += +value;
}

console.log(sum);
