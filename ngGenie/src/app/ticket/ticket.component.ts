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

  submitTicket() {
    this.router.navigate(['/thankyou']);
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

