import { readInput } from "../utils";

const input = readInput();

let answer = 0;

for (const [row, line] of input.entries()) {
    for (const gearMatch of line.matchAll(/\*/g)) {
        const nums: number[] = [];

        const checkNums = (rowIdx: number) => {
            for (const numMatch of input[rowIdx].matchAll(/\d+/g)) {
                if (numMatch.index === undefined) continue;

                if (
                    numMatch.index + numMatch[0].length - 1 < gearMatch.index! - 1 ||
                    numMatch.index > gearMatch.index! + 1
                )
                    continue;

                const num = +numMatch[0];

                nums.push(num);
            }
        };

        checkNums(row - 1);
        checkNums(row);
        checkNums(row + 1);

        if (nums.length === 2) {
            answer += nums[0] * nums[1];
        }
    }
}

console.log(answer);
