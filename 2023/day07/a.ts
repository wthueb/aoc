import { readInput } from "../utils";

const input = readInput();

enum Type {
    HighCard = 0,
    Pair,
    TwoPair,
    ThreeOfAKind,
    FullHouse,
    FourOfAKind,
    FiveOfAKind,
}

enum Card {
    Two = 2,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King,
    Ace,
}

class Hand {
    constructor(
        public cards: string,
        public bid: number,
    ) {}

    get type(): Type {
        const freqs = new Map<string, number>();

        for (const c of this.cards) {
            freqs.set(c, (freqs.get(c) || 0) + 1);
        }

        const hand = Array.from(freqs.values()).sort().join("");

        switch (hand) {
            case "11111":
                return Type.HighCard;
            case "1112":
                return Type.Pair;
            case "122":
                return Type.TwoPair;
            case "113":
                return Type.ThreeOfAKind;
            case "23":
                return Type.FullHouse;
            case "14":
                return Type.FourOfAKind;
            case "5":
                return Type.FiveOfAKind;
            default:
                throw new Error(`Unknown hand: ${hand}`);
        }
    }

    compareTo(other: Hand): number {
        if (this.type !== other.type) {
            return this.type - other.type;
        }

        const cardToEnum = (c: string) => {
            switch (c) {
                case "T":
                    return Card.Ten;
                case "J":
                    return Card.Jack;
                case "Q":
                    return Card.Queen;
                case "K":
                    return Card.King;
                case "A":
                    return Card.Ace;
                default:
                    return parseInt(c, 10);
            }
        };

        for (let i = 0; i < this.cards.length; i++) {
            const card = cardToEnum(this.cards[i]);
            const otherCard = cardToEnum(other.cards[i]);

            if (card !== otherCard) {
                return card - otherCard;
            }
        }

        return 0;
    }
}

const hands = input.map((line) => {
    const [cards, bid] = line.split(" ");
    return new Hand(cards, parseInt(bid, 10));
});

hands.sort((a, b) => a.compareTo(b));

const answer = hands.reduce((acc, hand, i) => {
    return acc + hand.bid * (i + 1);
}, 0);

console.log(answer);
