import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContainerComponent } from './container/container.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './shared/header/header.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmployeesDetailsTableComponent } from './employees-details-table/employees-details-table.component';
import { MainMenuComponent } from './shared/main-menu/main-menu.component';
import { ModalComponent } from './shared/modal/modal.component';
import { UserMenuComponent } from './shared/user-menu/user-menu.component';

const MAT_MODULES = [
  MatButtonModule,
  MatSidenavModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatExpansionModule,
  MatTooltipModule,
  MatCardModule,
  MatGridListModule,
  MatPaginatorModule,
  MatTableModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    ...MAT_MODULES
  ],
  declarations: [
    DashboardComponent,
    HeaderComponent,
    ContainerComponent,
    MainMenuComponent,
    UserMenuComponent,
    EmployeesDetailsTableComponent,
    ModalComponent,
  ],
  exports: [ContainerComponent],
})
export class EmployeeProductivityDashboardModule {}
