import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  nombre: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  edad: number = 0;
  rut: string = '';
  telefono: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  async onSubmit() {
    const success = this.authService.register({
      nombre: this.nombre,
      apellidoPaterno: this.apellidoPaterno,
      apellidoMaterno: this.apellidoMaterno,
      edad: this.edad,
      rut: this.rut,
      telefono: this.telefono,
      email: this.email,
      password: this.password
    });
    if (success) {
      this.router.navigate(['/login']);
    } else {
      this.showAlert('Error', 'El usuario ya existe');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}