export interface InvestmentProfile {
  id: number;
  user_id: number;
  name: string;
  initial_capital: number;
  monthly_contribution: number;
  duration: Date;
}
