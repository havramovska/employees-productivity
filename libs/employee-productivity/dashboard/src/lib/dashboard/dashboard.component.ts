import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  EmployeesProductivityActions,
  EmployeesProductivityFeature,
  EmployeesProductivitySelectors,
} from '@employee-productivity/shared/data-access';

@Component({
  selector: 'employee-productivity-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  $employeesList = this.store.select(EmployeesProductivitySelectors.selectEmployees);
  $employeesTotalNumber = this.store.select(EmployeesProductivitySelectors.selectTotalEmployees);
  $employeesTotalClockeInTime = this.store.select(EmployeesProductivitySelectors.selectTotalClockedInTime);
  $employeesAmountPaid = this.store.select(EmployeesProductivitySelectors.selectTotalRegularHoursPaid);
  $employeesOvertimeAmountPaid = this.store.select(EmployeesProductivitySelectors.selectTotalOvertimeHoursPaid);
  employeesDataLoaded = false;
  breakpoint = 0;
  colHeight = ''


  constructor(private store: Store<EmployeesProductivityFeature.EmployeeState>) {}
  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 1200) ? 1 : 4;
    this.colHeight = (window.innerWidth <= 1200) ? '200px' : '180px';
      this.loadAllEmployees();
      this.store.select(EmployeesProductivitySelectors.selectTotalEmployees);
  }

  loadAllEmployees() {
    this.store.dispatch(EmployeesProductivityActions.getAllEmployees());
    this.store.select(EmployeesProductivitySelectors.selectEmployees);
  }

  onResize(event: UIEvent ) {
    if (event.target instanceof Window) {
      this.breakpoint = (event.target.innerWidth <= 1200) ? 1 : 4;
      this.colHeight = (event.target.innerWidth <= 1200) ? '200px' : '180px';
    }
  }
}
