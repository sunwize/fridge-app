export type ItemType = "fruits" | "vegetables" | "meat" | "dairy" | "bakery" | "pantry" | "frozen" | "beverages" | "cooked" | "other";

export type Item = {
    id: string;
    name: string;
    quantity: number;
    emoji: string;
    type: ItemType;
    expirationDate: string;
}