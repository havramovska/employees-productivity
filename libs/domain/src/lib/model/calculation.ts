export interface EmployeeCalculation{
  employeeId: number,
  numberOfRegularHours: number,
  numberOfOverTimeHours: number,
  paidRegularHoursAmount: number,
  paidOverTimeHoursAmount: number
}

export interface TotalCalculation{
  totalNumberOfRegularHours: number,
  totalNumberOfOvertimeHours: number,
  totalPaidRegularHoursAmount: number,
  totalPaidOvertimeHoursAmount: number
}