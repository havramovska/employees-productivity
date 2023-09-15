import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Employee, Shift } from "@employee-productivity/domain";

@Injectable()
export class ApiService{

  constructor(private http: HttpClient) {
  }

  getAllEmployees(){
    return this.http.get<Employee[]>(`api/employee`)
  }

  getAllShifts(){
    return this.http.get<Shift[]>(`api/shift`)
  }
}