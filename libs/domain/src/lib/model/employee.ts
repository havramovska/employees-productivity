import { EmployeeCalculation } from "./calculation"
import { Shift } from "./shift"

export interface Employee {
  id: number,
  name: string,
  email: string,
  hourlyRate: number,
  overtimeHourlyRate: number,
  shifts?: Shift[],
  productivity?: EmployeeCalculation
}

