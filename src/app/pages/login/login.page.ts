import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  async onSubmit() {
    const user = this.authService.login({ email: this.email, password: this.password });
    if (user) {
      this.router.navigate(['/home']);
    } else {
      this.showAlert('Error', 'Credenciales incorrectas');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
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