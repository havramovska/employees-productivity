export * from './lib/shared-data-access.module';
import * as EmployeesProductivityFeature from './lib/+state/employee-productivity.reducer';
import * as EmployeesProductivitySelectors from './lib/+state/employee-productivity.selectors';
import * as EmployeesProductivityActions from './lib/+state/employees-productivity.actions';

export {
  EmployeesProductivityActions, EmployeesProductivityFeature, EmployeesProductivitySelectors
};
