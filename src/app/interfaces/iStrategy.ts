export interface Strategy {
  profile_id: number,
  strategy_id: number,
  name: string,
  description: string,
  Total_profitability: number,
  Volatility: number,
  Maximum_loss: number,
  Sharpe: number,
  Sortino: number,
  Alpha: number,
  Beta: number,
  Information_ratio: number,
  Success_rate: number,
  Portfolio_concentration_ratio: number
}
