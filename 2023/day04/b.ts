import { readInput } from "../utils";

const input = readInput();

let answer = 0;

const checked = new Map<number, number>();
const toCheck = input.map((_, i) => i);

while (toCheck.length > 0) {
    const idx = toCheck.pop()!;

    let points = checked.get(idx);

    if (points === undefined) {
        const line = input[idx];

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

        points = ourNumbers.filter((n) => winningNumbers.has(n)).length;

        checked.set(idx, points);
    }

    for (let i = idx; i < idx + points; i++) {
        toCheck.push(i + 1);
    }

    answer += 1;
}

console.log(answer);
