import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule]
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private afAuth: AngularFireAuth,
  ) {}



  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('confirmPassword')!.value ? null : { mismatch: true };
  }

  async register() {
    if (this.registerForm.invalid) return;

    const { email, password } = this.registerForm.value;
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      if (result.user) {
        this.navCtrl.navigateRoot('/home');
       }

      this.presentToast('Registro exitoso, ahora inicia sesión.');
      this.navCtrl.navigateRoot('/login');
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.presentToast(error.message);
      } else {
        this.presentToast('Error desconocido al registrar.');
      }
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
