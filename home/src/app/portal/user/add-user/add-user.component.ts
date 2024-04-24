import { NgClass } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { UserService } from '../../../domain/services/user.service';
import { User } from '../../../domain/class/user';
import { MessageService } from 'primeng/api';
import { LoadComponent } from '../../../load/load.component';
import { ECode } from '../../../domain/enums/e-code';
import { ESystem } from '../../../domain/enums/e-system';
import { EOperations } from '../../../domain/enums/e-operations';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    MatStepperModule,
    MatButtonModule,
    FloatLabelModule,
    InputTextModule,
    NgClass,
    ToastModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
  providers: [MessageService]
})
export class AddUserComponent implements OnInit {
  user: User;
  repeatPasswor!: string;
  dialogSpinner!: any;
  typeDocument: any;
  hide: boolean = true;
  hideRepeat: boolean = true;
  /**
* Indica si los campos se pueden editar
*/
  disable = false;
  hidden!: boolean;
  constructor(private userService: UserService, public dialog: MatDialog, public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private messageService: MessageService) {
    this.user = new User();
    if (this.user.operacion === EOperations.EDITAR) {
      this.disable = true;
      this.hidden = true;
    }
  }
  ngOnInit(): void {
  }

  registrarUsuario() {
    switch (this.user.operacion) {
      case EOperations.PERSISTIR:
        if (this.user.lastName && this.user.name && this.user.mail && this.user.numberDocument && this.user.typeDocument && this.user.password && this.repeatPasswor && this.user.rol) {
          if (this.user.password == this.repeatPasswor) {
            this.dialogSpinner = this.dialog.open(LoadComponent, {
              disableClose: true,
              backdropClass: 'backdropBackground',
              panelClass: 'custom-modalbox'
            });
            this.userService.persistir(this.user).subscribe((data: any) => {
              if (data.status === ECode.OK) {
                this.dialogSpinner.close();
                this.user.state = 1;
                this.dialogRef.close(this.user);
              }
            }, (err: any) => {
              this.messageService.add({ severity: ESystem.TOAST_ERROR, summary: ESystem.TOAST_ERROR, detail: err });
              this.dialogSpinner.close();
            })
          } else {
            this.messageService.add({ severity: ESystem.TOAST_ERROR, summary: ESystem.TOAST_ERROR, detail: 'Las contraseñas no son iguales' });
          }
        } else {
          this.messageService.add({ severity: ESystem.TOAST_ERROR, summary: ESystem.TOAST_ERROR, detail: 'Se deben llenar todos los campos para registrarte' });
        }
        break;
      case EOperations.EDITAR:
        if (this.user.lastName && this.user.name && this.user.mail && this.user.numberDocument && this.user.typeDocument && this.user.password && this.repeatPasswor && this.user.rol) {
          if (this.user.password == this.repeatPasswor) {
            this.dialogSpinner = this.dialog.open(LoadComponent, {
              disableClose: true,
              backdropClass: 'backdropBackground',
              panelClass: 'custom-modalbox'
            });
            this.userService.editar(this.user).subscribe((data: any) => {
              if (data.status === ECode.OK) {
                this.dialogSpinner.close();
                this.dialogRef.close(this.user);
              }
            }, (err: any) => {
              this.messageService.add({ severity: ESystem.TOAST_ERROR, summary: ESystem.TOAST_ERROR, detail: err });
              this.dialogSpinner.close();
            })
          } else {
            this.messageService.add({ severity: ESystem.TOAST_ERROR, summary: ESystem.TOAST_ERROR, detail: 'Las contraseñas no son iguales' });
          }
        } else {
          this.messageService.add({ severity: ESystem.TOAST_ERROR, summary: ESystem.TOAST_ERROR, detail: 'Se deben llenar todos los campos para registrarte' });
        }
        break;

    }
  }

}
