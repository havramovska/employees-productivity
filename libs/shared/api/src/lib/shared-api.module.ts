import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApiService } from './api-service';
import { InMemoryDataService } from './mock/in-memory-data-service.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule, 
  ],
  providers: [InMemoryDataService, ApiService]
})
export class SharedApiModule {}
