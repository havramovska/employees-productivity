import { Injectable } from "@angular/core";
import { Employee, EmployeeCalculation, EmployeesRepository, Shift, TotalCalculation } from "@employee-productivity/domain";
import { ApiService } from "@employee-productivity/shared/api";
import { Observable } from "rxjs";

@Injectable()

export class EmployeesProductivityService extends EmployeesRepository {

  constructor(private apiService: ApiService){
    super();
  }
  
  getAllEmployees(): Observable<Employee[]> {
    return this.apiService.getAllEmployees();
  }
  getAllShifts(): Observable<Shift[]> {
    return this.apiService.getAllShifts();
  }

  processEmployeesShifts(employees: Employee[], shifts: Shift[]): Observable<Employee[]> {
    return new Observable((subscriber) => {
      employees.forEach(employee => {
        employee.shifts = shifts.filter(shift => shift.employeeId == employee.id);
        const employeeProductivity = this.calculateEmployeeProductivity(employee);
        employee.productivity = employeeProductivity;
      })
      subscriber.next(employees);
    });
  }

  override calculateTotalProductivity(employees: Employee[]): Observable<TotalCalculation> {
    return new Observable((subscriber) => {
      subscriber.next(this.calculateTotal(employees));
    });
  }

  updateEmployeesDetails(employees: Employee[], updatedEmployees: Employee[]): Observable<Employee[]> {
    return new Observable((subscriber) => {
      updatedEmployees.forEach(updatedEmployee => {
        const employee = employees.find(employee => updatedEmployee.id == employee.id)
        if(employee !== undefined){
          employee.id = updatedEmployee.id;
        }
      })
      subscriber.next(employees);
    });
  }

  private calculateEmployeeProductivity(employee: Employee): EmployeeCalculation {
    const shifts: Shift[] = employee.shifts || [];
  
    const employeeId = employee.id;
    let numberOfRegularHours = 0;
    let numberOfOverTimeHours = 0;
    let paidRegularHoursAmount = 0;
    let paidOverTimeHoursAmount = 0;
  
    for (const shift of shifts) {
      const clockIn = new Date(shift.clockIn);
      const clockOut = new Date(shift.clockOut);
  
      const hoursWorked = (clockOut.getTime() - clockIn.getTime()) / (1000 * 60 * 60); 
  
      if (clockIn.getDate() !== clockOut.getDate()) {
        const firstDayHours = 24 - clockIn.getHours(); 
  
        const secondDayHours = clockOut.getHours();
  
        numberOfRegularHours += firstDayHours + secondDayHours;
      } else {
        numberOfRegularHours += hoursWorked;
      }
  
      if (hoursWorked > 8) {
        numberOfOverTimeHours += hoursWorked - 8;
        numberOfRegularHours -= hoursWorked - 8;
  
        paidRegularHoursAmount += 8 * employee.hourlyRate;
        paidOverTimeHoursAmount += (hoursWorked - 8) * employee.overtimeHourlyRate;
      } else {
        paidRegularHoursAmount += hoursWorked * employee.hourlyRate;
      }
    }
  
    return {
      employeeId,
      numberOfRegularHours,
      numberOfOverTimeHours,
      paidRegularHoursAmount,
      paidOverTimeHoursAmount,
    };
  }

  private calculateTotal(employeeList: Employee[]): TotalCalculation {
    const totalCalculation: TotalCalculation = {
      totalNumberOfRegularHours: 0,
      totalNumberOfOvertimeHours: 0,
      totalPaidRegularHoursAmount: 0,
      totalPaidOvertimeHoursAmount: 0,
    };

    if(employeeList){
      employeeList.forEach((employee) => {
        if (employee.productivity) {
          totalCalculation.totalNumberOfRegularHours +=
            employee.productivity.numberOfRegularHours;
          totalCalculation.totalNumberOfOvertimeHours +=
            employee.productivity.numberOfOverTimeHours;
          totalCalculation.totalPaidRegularHoursAmount +=
            employee.productivity.paidRegularHoursAmount;
          totalCalculation.totalPaidOvertimeHoursAmount +=
            employee.productivity.paidOverTimeHoursAmount;
        }
      });
    }

    return totalCalculation;
  }
}