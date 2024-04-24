import { Component, Inject, OnInit } from '@angular/core';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { User } from '../../domain/class/user';
import { UserService } from '../../domain/services/user.service';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { LoadComponent } from '../../load/load.component';
import { ECode } from '../../domain/enums/e-code';
import { ESystem } from '../../domain/enums/e-system';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-client',
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
    MatIconModule
  ],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css',
  providers: [MessageService]
})
export class AddClientComponent implements OnInit{
  user: User;
  repeatPasswor!: string;
  dialogSpinner!: any;
  typeDocument: any;
  hide: boolean = true;
  hideRepeat: boolean = true;
  constructor(private userService: UserService, public dialog: MatDialog, public dialogRef: MatDialogRef<AddClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private messageService: MessageService){
    this.user = new User();
  }
  ngOnInit(): void {
  }

  registrarUsuario(stepeer: MatStepper){
    if(this.user.lastName && this.user.name && this.user.mail && this.user.numberDocument && this.user.typeDocument && this.user.password && this.repeatPasswor){
      if(this.user.password ==  this.repeatPasswor){
        this.dialogSpinner = this.dialog.open(LoadComponent, {
          disableClose: true,
          backdropClass: 'backdropBackground',
          panelClass: 'custom-modalbox'
        });
        this.user.rol = '3';
        this.userService.persistir(this.user).subscribe((data: any) => {
          if(data.status === ECode.OK){
            this.dialogSpinner.close();
            stepeer.next();
          }
        }, (err: any) => {
          console.log(err);
        })
      }else{
        this.messageService.add({ severity: ESystem.TOAST_ERROR, summary: ESystem.TOAST_ERROR, detail: 'Las contraseñas no son iguales'});
      }
    }else{
      this.messageService.add({ severity: ESystem.TOAST_ERROR, summary: ESystem.TOAST_ERROR, detail: 'Se deben llenar todos los campos para registrarte'});
    }
  }

}
