import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  nombre: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  edad: number = 0;
  rut: string = '';
  telefono: string = '';
  email: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    const user = this.authService.getCurrentUser();
    this.nombre = user.nombre;
    this.apellidoPaterno = user.apellidoPaterno;
    this.apellidoMaterno = user.apellidoMaterno;
    this.edad = user.edad;
    this.rut = user.rut;
    this.telefono = user.telefono;
    this.email = user.email;
    this.showWelcomeMessage();
  }

  async showWelcomeMessage() {
    const alert = await this.alertController.create({
      header: 'Bienvenido',
      message: `¡Bienvenido ${this.nombre} ${this.apellidoPaterno}!`,
      buttons: ['OK']
    });

    await alert.present();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}