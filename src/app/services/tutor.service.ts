import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../model/Subject';
import { Observable } from 'rxjs';
import { Mode } from '../model/Mode';
import { Session } from '../model/Session';

@Injectable({
  providedIn: 'root'
})
export class TutorService {

  constructor(private client: HttpClient) { }

  public getAllSubjects(): Observable<Subject[]> {
    return this.client.get<Subject[]>("http://localhost:5025/tutor/subjects");
  }

  public getAllModes(): Observable<Mode[]> {
    return this.client.get<Mode[]>("http://localhost:5025/tutor/modes");
  }

  public sendSessionDetail(session: Session): void {
    console.log("Sending data up => ", session)
    this.client.post("http://localhost:5025/tutor/session", session).subscribe();
  }
}