import { readInput } from "../utils";

const input = readInput();

const directions = input[0].split("");

const map = new Map<string, [string, string]>(
    input.slice(2).map((line) => {
        const [, node, left, right] = line.match(/(.*) = \((.*), (.*)\)/)!;

        return [node, [left, right]];
    }),
);

const distances: number[] = [];

for (const start of Array.from(map.keys()).filter((node) =>
    node.endsWith("A"),
)) {
    let current = start;

    let distance = 0;

    while (!current.endsWith("Z")) {
        const [left, right] = map.get(current)!;

        const dir = directions[distance % directions.length];

        if (dir === "L") {
            current = left;
        } else {
            current = right;
        }

        distance++;
    }

    distances.push(distance);
}

const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
};

const lcm = (a: number, b: number): number => {
    return (a * b) / gcd(a, b);
};

const answer = distances.reduce(lcm);

console.log(answer);
