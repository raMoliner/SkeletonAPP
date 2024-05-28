import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: any[] = [];
  
  constructor() {}

  register(user: any): boolean {
    const exists = this.users.find(u => u.email === user.email);
    if (exists) {
      return false;
    }
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
    return true;
  }

  login(credentials: any): any {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === credentials.email && u.password === credentials.password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    return user;
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }
}