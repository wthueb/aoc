import { readInput } from "../utils";

const input = readInput();

let answer = 0;

for (const [row, line] of input.entries()) {
    for (const numMatch of line.matchAll(/\d+/g)) {
        const checkNums = (rowIdx: number) => {
            if (rowIdx < 0 || rowIdx >= input.length) return false;

            for (const symbolMatch of input[rowIdx].matchAll(/[^\d\.]/g)) {
                if (
                    symbolMatch.index! < numMatch.index! - 1 ||
                    symbolMatch.index! > numMatch.index! + numMatch[0].length
                )
                    continue;

                return true;
            }

            return false;
        };

        if (checkNums(row - 1) || checkNums(row) || checkNums(row + 1))
            answer += +numMatch[0];
    }
}

console.log(answer);
