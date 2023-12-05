import { readInput } from "../utils";

const input = readInput();

let answer = 0;

for (const line of input) {
    const winningNumbers = new Set(
        line
            .split("|")[0]
            .split(":")[1]
            .split(" ")
            .filter((n) => n !== "")
            .map(Number),
    );

    const ourNumbers = line
        .split("|")[1]
        .split(" ")
        .filter((n) => n !== "")
        .map(Number);

    const points = ourNumbers.filter(n => winningNumbers.has(n)).length;

    if (points > 0)
        answer += 2 ** (points - 1);
}

console.log(answer);
