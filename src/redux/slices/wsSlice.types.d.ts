export interface WebSocketState {
    isConnected: boolean;
    subscribedAsset: string | null; // Crypto sottoscritte (es. ["bitcoin"])
    priceUpdates: number | null; // { bitcoin: "45000.42" }
    error: string | null;
  }
  