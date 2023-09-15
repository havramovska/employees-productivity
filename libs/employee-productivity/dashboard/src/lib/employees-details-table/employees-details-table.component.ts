import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from '@employee-productivity/domain';
import { EmployeesProductivityActions, EmployeesProductivityFeature } from '@employee-productivity/shared/data-access';
import { Store } from '@ngrx/store';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'employee-productivity-details-table',
  templateUrl: './employees-details-table.component.html',
  styleUrls: ['./employees-details-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EmployeesDetailsTableComponent {
  @Input() employeesData?: Employee[] = [];
  displayedColumns: string[] = ['select', 'name', 'email', 'hourlyRate', 'overtimeHourlyRate', 'productivity'];
  dataSource: Employee[] = [];
  selection = new SelectionModel<Employee>(true, []);
  dataSourceReady = false;

  constructor(public dialog: MatDialog,
    private store: Store<EmployeesProductivityFeature.EmployeeState>) {
  }

  checkboxLabel(row?: Employee): string {
    return row ? `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row}` : '';
  }
  openDialog(): void {
    if(this.selection.selected.length) {
      this.store.dispatch(EmployeesProductivityActions.selectEmployeesForEdit({selectedEmployees: this.selection.selected}));   
      
      const dialogRef = this.dialog.open(ModalComponent, {
        width: '90%',
        maxWidth: '920px',
        height: '80vh'
      });
      
  
      dialogRef.afterClosed().subscribe(() => {
        this.selection.clear();
        this.store.dispatch(EmployeesProductivityActions.selectEmployeesForEdit({selectedEmployees: []}));
        });
      }
    }
}
