import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject} from '../model/Subject';
import {Observable} from 'rxjs';
import {Mode} from '../model/Mode';
import {Session} from '../model/Session';
import {SessionData} from '../model/SessionData';
import {ExpiryData} from "../model/ExpiryData";
import {GetSessionData} from "../model/GetSessionData";

@Injectable({
    providedIn: 'root'
})
export class TutorService {

    urlBase: string = "http://localhost:5025";

    constructor(private client: HttpClient) {
    }

    public getAllSubjects(): Observable<Subject[]> {
        return this.client.get<Subject[]>(`${this.urlBase}/tutor/subjects`);
    }

    public getAllModes(): Observable<Mode[]> {
        return this.client.get<Mode[]>(`${this.urlBase}/tutor/modes`);
    }

    public getLatestSessionData(student: string): Observable<GetSessionData> {
        const params: HttpParams = new HttpParams().set('student', student);
        return this.client.get<GetSessionData>(`${this.urlBase}/tutor/sessionData`, {params});
    }

    public sendSessionDetail(session: Session): void {
        console.log("Sending data up => ", session)
        this.client.post(`${this.urlBase}/tutor/session`, session).subscribe();
    }

    public sendSessionDataDetail(sessionData: SessionData): void {
        console.log("Sending session data up => ", sessionData)
        this.client.post(`${this.urlBase}/tutor/sessionData`, sessionData).subscribe();
    }

    public sendExpiryData(expiryData: ExpiryData): void {
        console.log("Sending expiry data up => ", expiryData)
        this.client.post(`${this.urlBase}/tutor/expiryData`, expiryData).subscribe();
    }
}
