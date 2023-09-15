import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EmployeesRepository } from '@employee-productivity/domain';
import { EmployeesProductivityStateModule } from './+state/employee-productivity.module';
import { EmployeesProductivityService } from './services/employees-productivity.service';

@NgModule({
  imports: [CommonModule, EmployeesProductivityStateModule],
  providers: [
    { provide: EmployeesRepository, useClass: EmployeesProductivityService} 
  ]
})
export class SharedDataAccessModule {}
