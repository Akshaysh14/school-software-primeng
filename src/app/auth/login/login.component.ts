import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  data = {
    email: 'admin@admin.com', password: 'admin@admin'
  }

  login() {
    this.authService.login(this.data).subscribe((next: any) => {
      localStorage.setItem('access', next.access)
      localStorage.setItem('refresh', next.refresh)
      this.router.navigate(['/dashboard'])
    })
  }

}
