import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  showDetails: boolean = false;
  fullResults: any[];
  ticketString = '';

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  userForm: FormGroup;

  constructor(private router: Router,
    private ticketService: TicketService,
    private _http: HttpClient) { }

    ticketEntry(genieEmail,anaName,userEmail){
      return this._http.post('/api/register',{
        genieEmail,
        anaName,
        userEmail
      })
    }

  submitTicket() {

    
    const genieEmail = document.getElementById('genieEmail')
    const anaName = document.getElementById('anaName')
    const userEmail = document.getElementById('userEmail')
    this.router.navigate(['/thankyou']);

    this.ticketEntry(genieEmail,anaName,userEmail).subscribe(data => {
      console.log(data)
    })
  }


  
  ngOnInit() {
    this.userForm = new FormGroup({
      email: new FormControl (''),
      ananame: new FormControl (''),
      user: new FormGroup({
        useremail: new FormControl (''),
        test: new FormArray ([])
      }),
      useremail: new FormControl (''),
      test: new FormArray ([])
    });
  }

  addField() {
    (<FormArray>this.userForm.get('test')).push(new FormControl(''));
  }
/*
  this.ticketService.getTicketResults(this.ticketString);

  this.ticketService.ticketResult.subscribe(data => {
    this.fullResults = data;
  });*/

}

