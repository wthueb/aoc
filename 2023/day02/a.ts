import { readInput } from "../utils";

const input = readInput();

let answer = 0;

for (const line of input) {
    const gameNum = +line.match(/Game (\d+)/)![1];

    let possible = true;

    const rolls = line.split(":")[1].split(";");

    for (const roll of rolls) {
        const cubeCounts = roll.trim().split(", ");

        for (const cubeCount of cubeCounts) {
            const [num, color] = cubeCount.split(" ");

            if (color === "red" && +num > 12) {
                possible = false;
                break;
            }
            if (color === "green" && +num > 13) {
                possible = false;
                break;
            }
            if (color === "blue" && +num > 14) {
                possible = false;
                break;
            }
        }

        if (!possible) {
            break;
        }
    }

    if (possible) {
        answer += gameNum;
    }
}

console.log(answer);
