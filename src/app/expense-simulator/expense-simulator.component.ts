import { Component, OnInit } from '@angular/core';
import { CsvService } from '../services/csv.service';

@Component({
  selector: 'app-expense-simulator',
  templateUrl: './expense-simulator.component.html',
  styleUrls: ['./expense-simulator.component.css']
})
export class ExpenseSimulatorComponent implements OnInit {

  public stores: string[] = [];
  public dataRows: string[][] = [];
  public notes: string[] = [];

  constructor(private _csvService: CsvService) { }

  ngOnInit(): void {
    this._csvService.getCsvData().subscribe(
      (data: string) => {
        data = data.trim();
        if (data.length > 0) {
          const rows = data.split('\n');
          if (rows.length > 0) {
            this.stores = rows[0].split(',');
            console.log(this.stores);

            for (let i = 1; i < rows.length; i++) {
              const result = [];
              const row = rows[i].split(',');
              let j = 0;
              for (j = 0; j < this.stores.length - 1; j++) {
                result.push(row[j]);
              }
              this.notes.push(row[j]);
              this.dataRows.push(result);
            }
            console.log(this.dataRows)
          }
        }
      }
    );
  }

}
