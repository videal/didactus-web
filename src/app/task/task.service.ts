import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class TaskService {
  constructor(public http: Http) {
  }

  getStatus(id: string): Observable<any> {

    return this.http.get('/api/task/' + id);
  }

  getCSV(id: string): Observable<any> {
    return this.http.get('/api/report/' + id);
  }
}
