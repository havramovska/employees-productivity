import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { EmployeesProductivityEffects } from "./employee-productivity.effects";
import * as fromEmployeesProductivityFeature from './employee-productivity.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature({
      name: fromEmployeesProductivityFeature.EMPLOYEES_PRODUCTIVITY_FEATURE_KEY,
      reducer: fromEmployeesProductivityFeature.reducer,
    }),
    EffectsModule.forFeature([EmployeesProductivityEffects]),
  ],
})

export class EmployeesProductivityStateModule {}