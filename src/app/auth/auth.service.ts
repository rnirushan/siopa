import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;

  constructor(public afAuth: AngularFireAuth) {
    
  }

  async login(email: string, password: string): Promise<boolean> {
    const loggedInPromise = new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          console.log("logged in user", user);
          this.user = user;
          localStorage.setItem('user', JSON.stringify(this.user));
          resolve(true);
        } else {
          localStorage.setItem('user', null);
        }
      });
    });

    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      await loggedInPromise;
      return true;
    } catch (err) {
      console.log("login err", err);
      return false;
    }
  }

  async logout() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
  }

  async isUserLoggedIn(): Promise<boolean> {
    return (localStorage.getItem("user") !== null && localStorage.getItem("user") !== undefined && localStorage.getItem("user") !== "null");
  }

  async getLoggedInUsername(): Promise<string> {
    if (await this.isUserLoggedIn()) {
      return JSON.parse(localStorage.getItem("user")).email;
    }
    return "";
  }
}
