import { readInput } from "../utils";

const input = readInput();

const getNext = (values: number[]): number => {
    if (values.every((v) => v === 0)) return 0;

    const diffs = values.reduce(
        (acc, curr, i) => (i === 0 ? acc : [...acc, curr - values[i - 1]]),
        [] as number[],
    );

    return values[values.length - 1] + getNext(diffs);
};

const answer = input
    .map((line) => line.split(" ").map(Number))
    .reduce((acc, history) => acc + getNext(history), 0);

console.log(answer);
