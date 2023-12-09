export interface IBolsaModel {
    indexes: [{
        stock: String;
        name: String;
    }],
    stocks: [{
        stock: String;
        name: String;
        close: number;
        change: number;
        volume: number;
        market_cap: String;
        logo: String;
        sector: String;
    }]
}

export interface IStocksModel {
    stock: String;
    name: String;
    close: number;
    change: number;
    volume: number;
    market_cap: String;
    logo: string;
    sector: String;
}