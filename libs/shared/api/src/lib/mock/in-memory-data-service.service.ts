import { Employee, Shift } from '@employee-productivity/domain';
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  
  createDb() {
    const employee: Employee[] = [ 
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        hourlyRate: 25.0,
        overtimeHourlyRate: 37.5,
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        hourlyRate: 30.0,
        overtimeHourlyRate: 45.0,
      },
      {
        id: 3,
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        hourlyRate: 28.0,
        overtimeHourlyRate: 42.0,
      },
      {
        id: 4,
        name: "Alice Brown",
        email: "alice.brown@example.com",
        hourlyRate: 27.0,
        overtimeHourlyRate: 40.5,
      },
      {
        id: 5,
        name: "David Wilson",
        email: "david.wilson@example.com",
        hourlyRate: 26.0,
        overtimeHourlyRate: 39.0,
      },
      {
        id: 6,
        name: "Emily Davis",
        email: "emily.davis@example.com",
        hourlyRate: 29.0,
        overtimeHourlyRate: 43.5,
      },
      {
        id: 7,
        name: "Michael Lee",
        email: "michael.lee@example.com",
        hourlyRate: 31.0,
        overtimeHourlyRate: 46.5,
      },
      {
        id: 8,
        name: "Sarah Evans",
        email: "sarah.evans@example.com",
        hourlyRate: 32.0,
        overtimeHourlyRate: 48.0,
      },
      {
        id: 9,
        name: "William Clark",
        email: "william.clark@example.com",
        hourlyRate: 33.0,
        overtimeHourlyRate: 49.5,
      },
      {
        id: 10,
        name: "Olivia Adams",
        email: "olivia.adams@example.com",
        hourlyRate: 34.0,
        overtimeHourlyRate: 51.0,
      },
    ];

    const shift = this.generateShifts(employee)
    const db = { employee, shift }
    return db;
  }

   generateRandomDate(minDate: Date, maxDate: Date): Date {
    const minTimestamp = minDate.getTime();
    const maxTimestamp = maxDate.getTime();
    const randomTimestamp = Math.random() * (maxTimestamp - minTimestamp) + minTimestamp;
    return new Date(randomTimestamp);
  }
  
   generateShifts(employees: Employee[]): Shift[] {
    const shifts: Shift[] = [];

    employees.forEach((employee) => {
      const existingShifts: Shift[] = [];
  
      for (let i = 0; i < 100; i++) {
        const currentDate = new Date();
        const minDate = new Date(currentDate);
        minDate.setDate(currentDate.getDate() - 10); 
  
        let clockIn: Date;
        let clockOut: Date;
  
        do {
          clockIn = this.generateRandomDate(minDate, currentDate);
          clockOut = new Date(clockIn);
          const randomHours = 4 + Math.random() * 8; 
          clockOut.setHours(clockIn.getHours() + randomHours);
  
          const overlap = existingShifts.some((shift) => {
            return (
              shift.employeeId === employee.id &&
              ((clockIn >= shift.clockIn && clockIn < shift.clockOut) ||
                (clockOut > shift.clockIn && clockOut <= shift.clockOut) ||
                (clockIn <= shift.clockIn && clockOut >= shift.clockOut))
            );
          });
  
          if (!overlap) {
            const shift: Shift = {
              employeeId: employee.id,
              clockIn: clockIn,
              clockOut: clockOut,
              totalHours: this.calculateTotalHours(clockIn, clockOut)
            };
  
            shifts.push(shift);
            existingShifts.push(shift);
          }
        } while (clockOut < currentDate);
      }
    });

    return shifts;
  }

  calculateTotalHours(clockIn: Date, clockOut: Date): number {
    const millisecondsPerHour = 60 * 60 * 1000;
    const timeDifferenceInMilliseconds = clockOut.getTime() - clockIn.getTime();
    return timeDifferenceInMilliseconds / millisecondsPerHour;
  }
}