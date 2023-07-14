export interface FormInfo {
  fname: string
  lname: string
  location: string
  dob: string
  //license: String,
  finances: {
    salaryPerQuarter: number
    totalCreditCardDebt: number
    currentHomeLoanDebt: number
    totalSavings: number
    stock: StockInfo[]
  }
}

export interface StockInfo {
  name: string
  quantity: number
}

export interface IdentityInfo {
  fname: string
  lname: string
  location: string
  dob: string
  //license: String,
}

export interface FinanceInfo {
  salaryPerQuarter: number
  totalCreditCardDebt: number
  currentHomeLoanDebt: number
  totalSavings: number
  stock: StockInfo[]
}
