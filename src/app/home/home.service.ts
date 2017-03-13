import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class HomeService {
  constructor(public http: Http) {
  }

  getCount(): Observable<any> {

    return this.http.get('/api/count');
  }

  postFilters(filters: any): Observable<any> {
    return this.http.post('/api/start', { filters: filters });
  }

  getDispatcherRun(): Observable<any> {
    return this.http.get('https://node-angelco-task-dispatcher.herokuapp.com/');
  }
}

