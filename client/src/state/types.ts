export interface ExpensesByCategory {
    salaries: number;
    supplies: number;
    services: number;
}

export interface Month {
    id: string;
    month: string;
    revenue: number;
    expenses: number;
    nonOperationalExpenses: number;
    operationalExpenses: number;
}

export interface Day {
    id: string;
    date: string;
    revenue: number;
    expenses: number;
}

export interface GetKpisResponse {
    id: string;
    _id: string;
    __v: number;
    totalProfit: number;
    totalRevenue: number;
    totalExpense: number;
    expesesByCategory: ExpensesByCategory;
    monthlyData: Array<Month>;
    dailyData: Array<Day>;
    createdAt: string;
    updatedAt: string;
}

export interface GetProductsResponse {
    _id: string;
    id: string;
    __v: number;
    price: number;
    expense: number;
    transactions: Array<string>;
    createdAt: string;
    updatedAt: string;
}


export interface GetTransactionsResponse {
    _id: string;
    id: string;
    __v: number;
    buyer: string;
    amount: number;
    productIds: Array<string>;
    createdAt: string;
    updatedAt: string;
}
