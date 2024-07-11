export interface Operation {
    operation_type: string,
    assets: string,
    operation_date: Date,
    amount: number,
    unit_price: number,
    total_return: number,
    investment_profile_id: number,
    strategy_id: number,
    period: string
}