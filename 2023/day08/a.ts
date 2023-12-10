import { readInput } from "../utils";

const input = readInput();

const directions = input[0].split("");

const map = new Map<string, [string, string]>(
    input.slice(2).map((line) => {
        const [, node, left, right] = line.match(/(.*) = \((.*), (.*)\)/)!;

        return [node, [left, right]];
    }),
);

let steps = 0;
let current = "AAA";

while (current !== "ZZZ") {
    const [left, right] = map.get(current)!;

    const dir = directions[steps % directions.length];

    if (dir === "L") {
        current = left;
    } else {
        current = right;
    }

    steps++;
}

console.log(steps);

