import { Component, OnInit } from '@angular/core';
import { Mode } from '../model/Mode';
import { Student } from '../model/Student';
import { Subject } from '../model/Subject';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TutorService } from '../services/tutor.service';
import { Session } from '../model/Session';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.css']
})
export class TutorComponent implements OnInit {

  sessionForm!: FormGroup;

  modes: Mode[] = [];
  students: Student[] = [];
  subjects: Subject[] = [];
  currentSubjects: Subject[] = [];
  initialMode = 1;
  initialStudent =  '';
  initialSubject = '';
  initialTime = 1900;
  initialSupplierDate = new Date();

  datepickerConfig: Partial<BsDatepickerConfig> = {
    dateInputFormat: "YYYYMMDD",
    isAnimated: true,
    showWeekNumbers: true,
  }

  constructor(private fb: FormBuilder, private tutorService: TutorService) {
    let supplierDate: Date = new Date();
    supplierDate.setHours(1);
    supplierDate.setMinutes(0);
    console.log(supplierDate);
    this.initialSupplierDate = supplierDate;

    this.sessionForm = this.fb.group({
      mode: [this.initialMode, Validators.required],
      student: [this.initialStudent, Validators.required],
      subject: [this.initialSubject, Validators.required],
      date: [this.initialSupplierDate, Validators.required],
      time: [this.initialTime, Validators.required],
      duration: [this.initialSupplierDate, Validators.required]
    });
  }

  ngOnInit(): void {
    this.tutorService.getAllModes().subscribe((modes) => {
      console.log("response from modes => ")
      console.log(modes)
      modes.forEach(mode => this.modes.push(mode));
    });

    this.tutorService.getAllSubjects().subscribe((subjects) => {
      console.log("response from subjects => ")
      console.log(subjects)
      subjects.forEach(subject => this.subjects.push(subject));
    });



    // this.modes.push({
    //   color: "#ff00ff",
    //   id: 1,
    //   name: "Direct",
    // });
    // this.modes.push({
    //   color: "#ff00ff",
    //   id: 2,
    //   name: "xxxxxxx",
    // });


    // this.students.push({
    //   id: 1,
    //   name: "ainz"
    // });
    // this.students.push({
    //   id: 2,
    //   name: "vlad"
    // });

    // this.subjects.push({
    //   id: 1,
    //   name: "java"
    // });
    // this.subjects.push({
    //   id: 2,
    //   name: "py"
    // });
  }

  getSubjectsForMode(): Subject[] {
    return this.subjects.filter(p => p.modeId == this.sessionForm.value['mode']);
  }

  onDateChange(event: Event) {
    console.log(event);
  }

  onSessionSave() {
    console.log(this.sessionForm)
    if (this.sessionForm.valid) {
      console.log("Form data is valid, will invoke the save API now!")
      const modeId = this.sessionForm.value['mode']
      const student = this.sessionForm.value['student']
      const subjectId = this.sessionForm.value['subject']
      const sessionDate = new Date(this.sessionForm.value['date'] as Date)
      sessionDate.setHours(0);
      sessionDate.setMinutes(0);
      sessionDate.setSeconds(0);
      const sessionTime = this.sessionForm.value['time'] as number
      const sessionDateTime = this.sessionForm.value['duration'] as Date
      const sessionLengthInMinutes = sessionDateTime.getHours() * 60 + sessionDateTime.getMinutes();

      const session: Session = new Session();
      session.modeId = modeId;
      session.subjectId = subjectId;
      session.student = student;
      session.sessionDate = sessionDate;
      session.sessionStartTime = sessionTime;
      session.sessionLengthInMinutes = sessionLengthInMinutes;

      console.log(session);

      this.tutorService.sendSessionDetail(session);

      this.sessionForm.reset();
      this.sessionForm.get('student')?.patchValue(this.initialStudent);
      this.sessionForm.get('subject')?.patchValue(this.initialSubject);
      this.sessionForm.get('mode')?.patchValue(this.initialMode);
      this.sessionForm.get('time')?.patchValue(this.initialTime);
      this.sessionForm.get('date')?.patchValue(this.initialSupplierDate);
      this.sessionForm.get('duration')?.patchValue(this.initialSupplierDate);
    } else {
      console.log("Form data is invalid..")
    }
  }

  // resetFormWithData(data: string) {
  //   this.sessionForm.get(data)?.patchValue(this.initialValues[data]);
  // }

}