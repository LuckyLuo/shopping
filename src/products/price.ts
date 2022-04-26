import { CURRENCY } from './types';

class Price {
    private _amount: number;
    private _currency: CURRENCY;

    constructor(amount: number, currency = CURRENCY.NZD) {
        if (amount < 0) {
            throw new Error(`Invalid price amount ${amount}`);
        }
        this._amount = amount;
        this._currency = currency;
    }

    public get amount(): number {
        return parseFloat(this._amount.toFixed(2));
    }

    public set amount(amount: number) {
        this._amount = amount;
    }

    public get currency(): CURRENCY {
        return this._currency;
    }

    public set currency(currency: CURRENCY) {
        this._currency = currency;
    }

    public toString(): string {
        return `$${this.amount}`
    }
}

export default Price;