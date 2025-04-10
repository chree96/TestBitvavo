export interface Token {
  symbol: string;
  price: string;
}

export interface TokenState {
  tokenList: any[];
  watchedToken?: Token;
}
