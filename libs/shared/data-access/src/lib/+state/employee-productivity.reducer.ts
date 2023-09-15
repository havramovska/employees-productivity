import { Employee } from "@employee-productivity/domain";
import { Action, createReducer, on } from "@ngrx/store";
import * as actions from './employees-productivity.actions';


export const EMPLOYEES_PRODUCTIVITY_FEATURE_KEY = 'employeesProductivityFeature'


export interface EmployeeState {
  employees: Employee[];
  totalEmployees: number;
  totalClockedInTime: number;
  totalRegularHoursPaid: number;
  totalOvertimeHoursPaid: number;
  selectedEmployeesForEdit: Employee[];
}

export const initialEmployeeState: EmployeeState = {
  employees: [],
  totalEmployees: 0,
  totalClockedInTime: 0,
  totalRegularHoursPaid: 0,
  totalOvertimeHoursPaid: 0,
  selectedEmployeesForEdit: [],
};

export const employeesProductivityReducer = createReducer(
    initialEmployeeState,
    on(actions.getAllEmployeesSuccess, (state, { employees }) => {
      if(employees){
        return {
          ...state,
          employees: employees,
          totalEmployees: employees?.length
        }
      }
      return {...state};
    }),

    on(actions.getAllEmployeesFailure, (state) => ({
      ...state
    })),  

    on(actions.calculationOfTotalProductivity, (state, { calculation }) => ({
      ...state,
      totalClockedInTime: calculation.totalNumberOfRegularHours + calculation.totalNumberOfOvertimeHours,
      totalRegularHoursPaid: calculation.totalPaidRegularHoursAmount,
      totalOvertimeHoursPaid: calculation.totalPaidOvertimeHoursAmount
    })),

    on(actions.selectEmployeesForEdit, (state, { selectedEmployees }) => 
      {        
      return {...state,
      selectedEmployeesForEdit: selectedEmployees,
      }
      }),

    on(actions.updateEmployeesSuccess, (state, { updatedEmployees }) => {
      const updatedEmployeesArray = [...state.employees];
      updatedEmployees?.forEach((updatedEmployee) => {
        const index = updatedEmployeesArray.findIndex((employee) => employee.id === updatedEmployee.id);
        if (index !== -1) {
          updatedEmployeesArray[index] = { ...updatedEmployeesArray[index], ...updatedEmployee };
        }
      });    
      return {
        ...state,
        employees: updatedEmployeesArray,
      };
    })
);

export function reducer(state: EmployeeState | undefined, action: Action) {
  return employeesProductivityReducer(state, action);
}
