export type ItemType = "fruit" | "vegetable" | "meat" | "dairy" | "bakery" | "pantry" | "frozen" | "beverage" | "cooked" | "other";

export type Item = {
    id: string;
    name: string;
    quantity: number;
    emoji: string;
    type: ItemType;
    expiresAt: string;
};
