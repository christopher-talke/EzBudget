export function formatMoney(value: number) {
    if (value >= 0) {
        return new Intl.NumberFormat('en-En', { style: 'currency', currency: 'USD' }).format(value / 100);
    }

    if (value < 0) {
        return new Intl.NumberFormat('en-En', { style: 'currency', currency: 'USD' }).format(value / 100);
    }
}
