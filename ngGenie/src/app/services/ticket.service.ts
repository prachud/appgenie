import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TicketService {

  private ticketUrl = 'http://localhost:5000/search';

  private _result: BehaviorSubject<any[]>;

  private dataStore: {
    ticketResult: any[]
  };

  constructor(private _http: HttpClient) {
    this.dataStore = { ticketResult: []};
    this._result = new BehaviorSubject<any[]>([]);
  }

  get ticketResult(): Observable<any[]> {
    return this._result.asObservable();
  }

  getTicketResults(searchString: string) {
    this._result = new BehaviorSubject<any[]>([]);
    return this._http.get(this.ticketUrl).subscribe(data => {
      this.dataStore.ticketResult = <any[]>data;
      this._result.next(Object.assign({}, this.dataStore).ticketResult);
    }, error => {
      console.log('Failed to fetch results');
    });
  }
}
