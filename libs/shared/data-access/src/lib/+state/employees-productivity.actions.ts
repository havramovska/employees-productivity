import { Employee, Shift, TotalCalculation } from '@employee-productivity/domain';
import { createAction, props } from '@ngrx/store';


export enum EmployeeProductivityActions {
  INITIALIZE_STATE = '[Employees Productivity] Initiate collecting data from datasource',

  GET_EMPLOYEES = '[Employees Productivity] Get all employees from datasource',
  GET_EMPLOYEES_SUCCESS = '[Employees Productivity] Get all employees success',
  GET_EMPLOYEES_FIALURE = '[Employees Productivity] Get all employees failure',

  GET_SHIFTS = '[Employees Productivity] Get shifts for all employees from datasource',
  GET_SHIFTS_SUCCESS = '[Employees Productivity] Get all shifts success',
  GET_SHIFTS_FIALURE = '[Employees Productivity] Get all shifts failure',

  CALCULAT_TOTAL_PRODUCTIVITY = '[Employees Productivity] Add newcalculation of total productivity',
  CALCULAT_TOTAL_PRODUCTIVITY_RESULT = '[Employees Productivity] Result of a total productivity calculation',
  SELECT_EMPLOYEE_FOR_BULK_EDIT = '[Employees Productivity] Select / unselect employee for a bulk edit',

  UPDATE_EMPLOYEES = '[Employees Productivity] Update employees',
  UPDATE_EMPLOYEES_SUCCESS = '[Employees Productivity] Update employees success',
  RESET_SELECTED_EMPLOYEES = '[Employees Productivity] Reset selected employees list',
}


export const initializeState = createAction(
  EmployeeProductivityActions.INITIALIZE_STATE
);

export const getAllEmployees = createAction(
  EmployeeProductivityActions.GET_EMPLOYEES
)

export const getAllEmployeesSuccess = createAction(
  EmployeeProductivityActions.GET_EMPLOYEES_SUCCESS,
   props<{ employees: Employee[] }>()
);

export const getAllEmployeesFailure = createAction(
  EmployeeProductivityActions.GET_EMPLOYEES_FIALURE,
   props<{ error: string }>()
);

export const getAllShifts = createAction(
  EmployeeProductivityActions.GET_SHIFTS
)

export const getAllShiftsSuccess = createAction(
  EmployeeProductivityActions.GET_SHIFTS_SUCCESS,
   props<{ employees: Shift[] }>()
);

export const getAllShiftsFailure = createAction(
  EmployeeProductivityActions.GET_SHIFTS_FIALURE,
   props<{ error: string }>()
);


export const calculationOfTotalProductivity = createAction(
  EmployeeProductivityActions.CALCULAT_TOTAL_PRODUCTIVITY_RESULT,
   props<{ calculation: TotalCalculation }>()
);

export const selectEmployeesForEdit = createAction(
  EmployeeProductivityActions.GET_EMPLOYEES_SUCCESS,
   props<{ selectedEmployees: Employee[] }>()
);

export const updateEmployees = createAction(
  EmployeeProductivityActions.UPDATE_EMPLOYEES,
   props<{ employeesForUpdate: Employee[] }>()
);

export const updateEmployeesSuccess = createAction(
  EmployeeProductivityActions.UPDATE_EMPLOYEES_SUCCESS,
   props<{ updatedEmployees: Employee[] }>()
);
