import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Employee, EmployeesRepository, TotalCalculation } from "@employee-productivity/domain";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { forkJoin, of } from 'rxjs';
import {
  catchError,
  map,
  switchMap
} from 'rxjs/operators';
import * as EmployeesProductivityActions from './employees-productivity.actions';


@Injectable()
export class EmployeesProductivityEffects {
  constructor(
      private readonly actions$: Actions,
      private readonly store: Store,
      private repo: EmployeesRepository,
    ){}

    getAllEmployees$ = createEffect(() =>
      this.actions$.pipe(
        ofType(EmployeesProductivityActions.getAllEmployees),
        switchMap(() =>
          forkJoin([
            this.repo.getAllEmployees(),
            this.repo.getAllShifts(),
          ]).pipe(
            switchMap(([employees, shifts]) =>{
              return this.repo.processEmployeesShifts(employees, shifts).pipe(
                map((resultEmployees: Employee[]) => {
                  return EmployeesProductivityActions.getAllEmployeesSuccess({
                    employees: resultEmployees,
                  });
                }),
                catchError((error: HttpErrorResponse) =>
                  of(
                    EmployeesProductivityActions.getAllEmployeesFailure({
                      error: error?.message,
                    })
                  )
                )
              )
            }
          )
        )
      )
    )
  );

  totalProductivity$ = createEffect(() => 
    this.actions$.pipe(
      ofType(EmployeesProductivityActions.getAllEmployeesSuccess),
      switchMap(({employees}) => {
        return this.repo.calculateTotalProductivity(employees).pipe(
          map((totalCalculation: TotalCalculation) => {
            return EmployeesProductivityActions.calculationOfTotalProductivity({
              calculation: totalCalculation,
            });
          }),
        )
      })
    )
  );
}




