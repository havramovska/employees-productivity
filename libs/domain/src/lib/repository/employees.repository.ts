import { Observable } from "rxjs";
import { TotalCalculation } from "../model/calculation";
import { Employee } from '../model/employee';
import { Shift } from '../model/shift';

export abstract class EmployeesRepository {

  abstract getAllEmployees(): Observable<Employee[]>
  abstract getAllShifts(): Observable<Shift[]>
  abstract processEmployeesShifts(employees: Employee[], shifts: Shift[]): Observable<Employee[]>
  abstract calculateTotalProductivity(employees: Employee[]): Observable<TotalCalculation>
  abstract updateEmployeesDetails(employees: Employee[], updatedEmployees: Employee[]): Observable<Employee[]>
}