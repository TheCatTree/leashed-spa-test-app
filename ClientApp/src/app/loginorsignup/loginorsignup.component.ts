import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-loginorsignup',
  templateUrl: './loginorsignup.component.html',
  styleUrls: ['./loginorsignup.component.css']
})
export class LoginorsignupComponent implements OnInit {

  return: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public auth: AuthService,
  ) {}

  ngOnInit() {
    // Get the query params
    this.route.queryParams
      .subscribe(params => this.return =  params['return'] || '')
  }

  login(){
    this.auth.login(this.return);
  }
  signUp(){
    this.auth.signUp(this.return);
  }

}
