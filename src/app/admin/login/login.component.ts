import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  loginStr = "Login";

  constructor(private authService: AuthService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    if (await this.authService.isUserLoggedIn()) {
      this.router.navigate(['admin/add-items']);
    }
  }

  async login(): Promise<void> {
    this.loginStr = "Logging In...";
    const result = await this.authService.login(this.email, this.password);
    if (!result) {
      this.loginStr = "Login";
      alert("Username or password is incorrect!!");
    } else {
      this.router.navigate(['admin/add-items']);
    }
  }
}
