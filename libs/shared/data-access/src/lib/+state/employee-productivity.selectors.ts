import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EMPLOYEES_PRODUCTIVITY_FEATURE_KEY, EmployeeState } from "./employee-productivity.reducer";

export const selectEmployeesProductivityFeature = createFeatureSelector<EmployeeState>(
  EMPLOYEES_PRODUCTIVITY_FEATURE_KEY
);

export const selectEmployees = createSelector(
  selectEmployeesProductivityFeature,
  (state) => state.employees
);

export const selectTotalEmployees = createSelector(
  selectEmployeesProductivityFeature,
  (state) => state.totalEmployees
);

export const selectTotalClockedInTime = createSelector(
  selectEmployeesProductivityFeature,
  (state) => state.totalClockedInTime
);

export const selectTotalRegularHoursPaid = createSelector(
  selectEmployeesProductivityFeature,
  (state) => state.totalRegularHoursPaid
);

export const selectTotalOvertimeHoursPaid = createSelector(
  selectEmployeesProductivityFeature,
  (state) => state.totalOvertimeHoursPaid
);

export const selectSelectedEmployeesForEdit = createSelector(
  selectEmployeesProductivityFeature,
  (state) => state.selectedEmployeesForEdit
);
