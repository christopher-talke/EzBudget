export type DashboardData = {
    budget: {
        income: {
            balance: number;
            meta: {
                previous_balance: number;
                future_balance: number;
            };
        };
        expenses: {
            balance: number;
            meta: {
                previous_balance: number;
                future_balance: number;
            };
        };
        balance: {
            balance: number;
            meta: {
                previous_balance: number;
                future_balance: number;
            };
        };
    };
    actual: {
        income: {
            balance: number;
            meta: {
                previous_balance: number;
                future_balance: number;
            };
        };
        expenses: {
            balance: number;
            meta: {
                previous_balance: number;
                future_balance: number;
            };
        };
        balance: {
            balance: number;
            meta: {
                previous_balance: number;
                future_balance: number;
            };
        };
    };
    accounts: Array<{
        id: number;
        isLiability: boolean;
        identifier: string;
        balance: number;
    }>;
    id: number;
    paycycleType: string;
    uniqueId: string;
    startDate: string;
    endDate: string;
};
