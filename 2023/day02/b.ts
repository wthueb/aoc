import { readInput } from "../utils";

const input = readInput();

let answer = 0;

for (const line of input) {
    const maxMap = new Map<string, number>([
        ["red", 0],
        ["green", 0],
        ["blue", 0],
    ]);

    const rolls = line.split(":")[1].split(";");

    for (const roll of rolls) {
        const cubeCounts = roll.trim().split(", ");

        for (const cubeCount of cubeCounts) {
            const [num, color] = cubeCount.split(" ");

            const max = maxMap.get(color)!;

            if (+num > max) {
                maxMap.set(color, +num);
            }
        }
    }

    answer += Array.from(maxMap.entries()).reduce(
        (acc, [_, val]) => acc * val,
        1,
    );
}

console.log(answer);
