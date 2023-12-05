import { readInput } from "../utils";

const input = readInput();

const seeds = input[0].split(":")[1].trim().split(" ").map(Number);

for (let i = 1; i < input.length; i++) {
    const readMap = () => {
        const changed = new Set<number>();

        for (i = i + 1; input[i] !== undefined && !isNaN(+input[i][0]); i++) {
            const [startDst, startSrc, length] = input[i]
                .split(" ")
                .map(Number);

            for (let idx = 0; idx < seeds.length; idx++) {
                if (!changed.has(idx)) {
                    if (
                        seeds[idx] >= startSrc &&
                        seeds[idx] < startSrc + length
                    ) {
                        seeds[idx] = startDst + (seeds[idx] - startSrc);
                        changed.add(idx);
                    }
                }
            }
        }
    };

    const line = input[i];

    if (line.startsWith("seed-to-soil")) {
        readMap();
    }

    if (line.startsWith("soil-to-fertilizer")) {
        readMap();
    }

    if (line.startsWith("fertilizer-to-water")) {
        readMap();
    }

    if (line.startsWith("water-to-light")) {
        readMap();
    }

    if (line.startsWith("light-to-temperature")) {
        readMap();
    }

    if (line.startsWith("temperature-to-humidity")) {
        readMap();
    }

    if (line.startsWith("humidity-to-location")) {
        readMap();
    }
}

const answer = Math.min(...seeds);

console.log(answer);
