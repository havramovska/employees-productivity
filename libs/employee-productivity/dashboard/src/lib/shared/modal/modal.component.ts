import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Employee } from '@employee-productivity/domain';
import { EmployeesProductivityActions, EmployeesProductivityFeature, EmployeesProductivitySelectors } from '@employee-productivity/shared/data-access';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


@Component({
  selector: 'employee-productivity-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit{
  displayedColumns: string[] = ['clockInTime', 'clockOutTime', 'totalTime'];
  employeeForms: FormGroup[] = [];
  $selectedEmployees?: Observable<Employee[]>;
  
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private fb: FormBuilder,
    private store: Store<EmployeesProductivityFeature.EmployeeState>
  ) {}

  ngOnInit(): void {
    this.employeeForms = [];
    this.$selectedEmployees = this.store.select(EmployeesProductivitySelectors.selectSelectedEmployeesForEdit);

    this.$selectedEmployees?.subscribe(employees=> {
      employees.forEach((employee) => {
        this.employeeForms.push(this.fb.group({
          id: new FormControl(employee.id),
          name: new FormControl(employee.name, Validators.required),
          hourlyRate: new FormControl(employee.hourlyRate, Validators.required),
          email: new FormControl(employee.email, [Validators.required, Validators.email]),
          overtimeHourlyRate: new FormControl(employee.overtimeHourlyRate, [Validators.required]),
        }));
      });
    });
  }

  cancelModal(): void {
    this.store.dispatch(EmployeesProductivityActions.selectEmployeesForEdit({selectedEmployees: []}));
    this.employeeForms.map(formGroup => formGroup.reset())
    this.dialogRef.close();
  }

  onSubmit() {
    const updatedEmployeeForms = this.employeeForms.map(formGroup => formGroup.value);
    this.store.dispatch(EmployeesProductivityActions.updateEmployeesSuccess({updatedEmployees: updatedEmployeeForms}));
    this.dialogRef.close();
  }

  areAllFormGroupsValid(): boolean {
    return this.employeeForms.every(formGroup => formGroup.valid);
  }
}
