import {Component, OnInit} from '@angular/core';
import {Mode} from '../model/Mode';
import {Student} from '../model/Student';
import {Subject} from '../model/Subject';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TutorService} from '../services/tutor.service';
import {Session} from '../model/Session';
import {SessionData} from "../model/SessionData";
import {ExpiryData} from "../model/ExpiryData";
import {LibraryData} from "../model/LibraryData";

@Component({
    selector: 'app-tutor',
    templateUrl: './tutor.component.html',
    styleUrls: ['./tutor.component.css']
})
export class TutorComponent implements OnInit {

    sessionForm!: FormGroup;
    sessionDataForm!: FormGroup;
    getSessionDataForm!: FormGroup;
    expiryForm!: FormGroup; //todo - separate into its own folder later. Is to be used for marking expiry of items
    libForm!: FormGroup; //todo - separate into its own folder later. Is to be used for lib data
    fetchStatus: string = '*** Waiting for server to come alive ***';

    modes: Mode[] = [];
    students: Student[] = [];
    subjects: Subject[] = [];
    // currentSubjects: Subject[] = [];
    initialMode: number = 1;
    initialStudent: string = '';
    initialSubject: string = '';
    initialTime: number = 1900;
    initialSupplierDate: Date = new Date();
    initialSupplierData: string = '';

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

        this.sessionDataForm = this.fb.group({
            mode: [this.initialMode, Validators.required],
            student: [this.initialStudent, Validators.required],
            subject: [this.initialSubject, Validators.required],
            date: [this.initialSupplierDate, Validators.required],
            data: [this.initialSupplierData, Validators.required]
        });

        this.getSessionDataForm = this.fb.group({
            student: [this.initialStudent, Validators.required],
            data: [this.initialSupplierData]
        })

        this.expiryForm = this.fb.group({
            date: [this.initialSupplierDate, Validators.required],
            data: [this.initialSupplierData, Validators.required]
        });

        this.libForm = this.fb.group({
            bookName: [this.initialSupplierData, Validators.required],
            borrowDate: [this.initialSupplierDate],
            returnDate: [this.initialSupplierDate],
            returnedDate: [this.initialSupplierDate],
        });
    }

    ngOnInit(): void {
        this.tutorService.getAllModes().subscribe((modes) => {
            console.log("response from modes => ")
            console.log(modes)
            modes.forEach(mode => this.modes.push(mode));
            this.fetchStatus = "";
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

    getSubjectsForMode(modeId: number): Subject[] {
        return this.subjects.filter(p => p.modeId === modeId);
    }

    onDateChange(event: Event): void {
        console.log(event);
    }

    onSessionSave(): void {
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

    onSessionDataSave(): void {
        console.log(this.sessionDataForm);
        if (this.sessionDataForm.valid) {
            console.log("Session data form is valid, will invoke the save data API now!")
            const modeId = this.sessionDataForm.value['mode']
            const student = this.sessionDataForm.value['student']
            const subjectId = this.sessionDataForm.value['subject']
            const sessionDate: Date = new Date(this.sessionDataForm.value['date'] as Date)
            sessionDate.setHours(0);
            sessionDate.setMinutes(0);
            sessionDate.setSeconds(0);
            const data: string = this.sessionDataForm.value['data'] as string

            const sessionData: SessionData = new SessionData();
            sessionData.modeId = modeId;
            sessionData.subjectId = subjectId;
            sessionData.student = student;
            sessionData.sessionDate = sessionDate;
            sessionData.data = data;

            console.log(sessionData);

            this.tutorService.sendSessionDataDetail(sessionData);

            this.sessionDataForm.reset();
            this.sessionDataForm.get('student')?.patchValue(this.initialStudent);
            this.sessionDataForm.get('subject')?.patchValue(this.initialSubject);
            this.sessionDataForm.get('mode')?.patchValue(this.initialMode);
            this.sessionDataForm.get('date')?.patchValue(this.initialSupplierDate);
            this.sessionDataForm.get('data')?.patchValue(this.initialSupplierData);
        } else {
            console.log("Form session data is invalid..")
        }
    }

    onExpirySave(): void {
        console.log(this.expiryForm);
        if (this.expiryForm.valid) {
            console.log("Expiry form is valid, will invoke the save expiry API now!")
            const sessionDate: Date = new Date(this.expiryForm.value['date'] as Date)
            sessionDate.setHours(0);
            sessionDate.setMinutes(0);
            sessionDate.setSeconds(0);
            const data: string = this.expiryForm.value['data'] as string

            const expiryData: ExpiryData = new ExpiryData();
            expiryData.date = sessionDate;
            expiryData.data = data;

            console.log(expiryData);

            this.tutorService.sendExpiryData(expiryData);

            this.expiryForm.reset();
            this.expiryForm.get('date')?.patchValue(this.initialSupplierDate);
            this.expiryForm.get('data')?.patchValue(this.initialSupplierData);
        } else {
            console.log("Form session data is invalid..")
        }
    }

    onLibSave(): void {
        console.log(this.libForm);
        if (this.libForm.valid) {
            console.log("Lib form is valid, will invoke the save lib API now!")
            const libraryData: LibraryData = new LibraryData();
            libraryData.bookName = this.libForm.value['bookName'] as string
            if (this.libForm.value['borrowDate']) {
                libraryData.borrowDate = this.libForm.value['borrowDate'] as Date;
                this.clearHMS(libraryData.borrowDate);
            }
            if (this.libForm.value['returnDate']) {
                libraryData.returnDate = this.libForm.value['returnDate'] as Date;
                this.clearHMS(libraryData.returnDate);
            }
            if (this.libForm.value['returnedDate']) {
                libraryData.returnedDate = this.libForm.value['returnedDate'] as Date;
                this.clearHMS(libraryData.returnedDate);
            }

            // console.log(libraryData);
            this.tutorService.sendLibData(libraryData);

            this.libForm.reset();
            this.libForm.get('bookName')?.patchValue(this.initialSupplierData);
            this.libForm.get('borrowDate')?.patchValue(this.initialSupplierDate);
            this.libForm.get('returnDate')?.patchValue(this.initialSupplierDate);
            this.libForm.get('returnedDate')?.patchValue(this.initialSupplierDate);
        } else {
            console.log("Form session data is invalid..")
        }
    }

    onGetSessionData(): void {
        console.log(this.getSessionDataForm);
        if (this.getSessionDataForm.valid) {
            const student: string = this.getSessionDataForm.value['student'] as string;
            this.tutorService.getLatestSessionData(student.toLowerCase().trim())
                .subscribe((data) => {
                    const output: string = `${data.fileName}\n${data.fileData}`;
                    console.log(`Received => ${output} == ${data.toString()}`)
                    this.getSessionDataForm.get('data')?.setValue(output);
                });
        }
    }

    // resetFormWithData(data: string) {
    //   this.sessionForm.get(data)?.patchValue(this.initialValues[data]);
    // }

    getModeId(number: number, id: number): string {
        return `${id}-${number}`;
    }

    clearBorrowDate(): void {
        this.libForm.get('borrowDate')?.setValue(null);
    }

    clearReturnDate(): void {
        this.libForm.get('returnDate')?.setValue(null);
    }

    clearReturnedDate(): void {
        this.libForm.get('returnedDate')?.setValue(null);
    }

    private clearHMS(date: Date): void {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
    }
}
