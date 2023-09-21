export function calculateTotalInvestment(initialAmount: number, interestRate: number, timeInDays: number) {
  // Convert the interest rate from percentage to decimal
  const decimalInterestRate = interestRate / 100;
  
  // Convert time from days to years
  const timeInYears = timeInDays / 365;
  
  // Calculate the accumulated amount using the formula: P * (1 + r)^t
  const accumulatedAmount = initialAmount * Math.pow(1 + decimalInterestRate, timeInYears);
  
  // Return the accumulated amount rounded to 2 decimal places
  return accumulatedAmount.toFixed(2);
}