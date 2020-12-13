import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  username: string = "";

  constructor(private authService: AuthService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    if (!(await this.authService.isUserLoggedIn())) {
      this.router.navigate(['login']);
    }

    this.username = await this.authService.getLoggedInUsername();
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['login']);
  }
}
