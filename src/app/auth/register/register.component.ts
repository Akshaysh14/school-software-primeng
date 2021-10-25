import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  data = {
    name: '', email: '', password: '', recaptcha: ''
  }
  register() {
    this.authService.register(this.data).subscribe(next => {
      this.router.navigate(['/login']);
    })
  }

}
