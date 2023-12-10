import { readInput } from "../utils";

const input = readInput();

const getPrev = (values: number[]): number => {
    if (values.every((v) => v === 0)) return 0;

    const diffs = values.reduce(
        (acc, curr, i) => (i === 0 ? acc : [...acc, curr - values[i - 1]]),
        [] as number[],
    );

    return values[0] - getPrev(diffs);
};

const answer = input
    .map((line) => line.split(" ").map(Number))
    .reduce((acc, history) => acc + getPrev(history), 0);

console.log(answer);
