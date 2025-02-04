export type Exchanges = "fanout" | "direct" | "topic" | "headers";

export const ExchangeTypes = { fanout: "fanout", direct: "direct", topic: "topic", headers: "headers" } as const;
