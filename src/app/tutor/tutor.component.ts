import { Component, OnInit } from '@angular/core';
import { Mode } from '../model/Mode';
import { Student } from '../model/Student';
import { Subject } from '../model/Subject';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.css']
})
export class TutorComponent implements OnInit {

  modes: Mode[] = [];
  students: Student[] = [];
  subjects: Subject[] = [];
  selectedDate!: Date;
  datepickerConfig: Partial<BsDatepickerConfig> = {
    dateInputFormat: "YYYYMMDD",
    isAnimated: true,
    showWeekNumbers: true,
  }
  timeDuration!: Date;

  ngOnInit(): void {
    this.selectedDate = new Date();
    this.timeDuration = new Date();
    this.timeDuration.setHours(1);
    this.timeDuration.setMinutes(0);

    this.modes.push({
      color: "#ff00ff",
      id: 1,
      name: "Direct",
    });
    this.modes.push({
      color: "#ff00ff",
      id: 2,
      name: "xxxxxxx",
    });


    this.students.push({
      id: 1,
      name: "ainz"
    });
    this.students.push({
      id: 2,
      name: "vlad"
    });

    this.subjects.push({
      id: 1,
      name: "java"
    });
    this.subjects.push({
      id: 2,
      name: "py"
    });
  }

  onDateChange(event: Event) {
    console.log(this.selectedDate);
  }

}
