import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../domain/services/user.service';
import { User } from '../domain/class/user';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddClientComponent } from './add-client/add-client.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ESystem } from '../domain/enums/e-system';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FloatLabelModule,
    InputTextModule,
    NgClass,
    ToastModule,
    FormsModule,
    PasswordModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  user: User;
  constructor(private loginService: UserService, public dialog: MatDialog, private messageService: MessageService, public router: Router) {
    this.user = new User;
    if (sessionStorage.getItem('user')) {
      this.router.navigate(["home"]);
    }
  }

  ngOnInit(): void {
  }

  confirmar() {
    if (this.user.mail && this.user.password) {
      this.loginService.login(this.user).subscribe((response: any) => {
        if(response.data.state === 1){
          sessionStorage.setItem("user", JSON.stringify(response.data))
          this.router.navigate(["home"]);
        }else{
          this.messageService.add({ severity: ESystem.TOAST_WARN, summary: ESystem.TOAST_WARN, detail: 'Su usuario se encuentra inactivo' });
        }
      }, (err: any) => {
        console.log(err)
        this.messageService.add({ severity: ESystem.TOAST_ERROR, summary: ESystem.TOAST_ERROR, detail: 'Contraseña o correos invalidos' });
      });
    } else {
      this.messageService.add({ severity: ESystem.TOAST_ERROR, summary: ESystem.TOAST_ERROR, detail: 'Se deben llenar todos los campos para iniciar sesión' });
    }
  }

  registerUserClient() {
    const dialogRef = this.dialog.open(AddClientComponent,
      {
        disableClose: true,
      }
    );

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result)
    });
  }

}
