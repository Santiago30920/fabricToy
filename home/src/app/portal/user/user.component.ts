import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { User } from '../../domain/class/user';
import { EUser } from '../../domain/enums/e-user';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../domain/services/user.service';
import { MessageService } from 'primeng/api';
import { LoadComponent } from '../../load/load.component';
import { ECode } from '../../domain/enums/e-code';
import { AddUserComponent } from './add-user/add-user.component';
import { EOperations } from '../../domain/enums/e-operations';
import { ESystem } from '../../domain/enums/e-system';
import { CurrencyPipe } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MatButtonModule } from '@angular/material/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatCheckboxModule,
    MatPaginatorModule,
    CurrencyPipe,
    ToastModule,
    MatButtonModule,
    TooltipModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  providers: [MessageService]
})
export class UserComponent implements OnInit {
  //listado de servicios
  users: User[] = [];
  //llamando al spinner
  dialogSpinner!: any;
  //AsignandoColumnas
  displayedColumns: string[] = [EUser.LABEL_NAME, EUser.LABEL_LAST_NAME, EUser.LABEL_NUMBER_DOCUMENT,EUser.LABEL_STATE, EUser.LABEL_ACCION];
  dataSource!: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(public dialog: MatDialog, private usuarioService: UserService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.dialogSpinner = this.dialog.open(LoadComponent, {
      disableClose: true,
      backdropClass: 'backdropBackground',
      panelClass: 'custom-modalbox'
    });
    this.usuarioService.listar().subscribe((data: any) => {
      if (data.status === ECode.OK) {
        this.users = data.data;
        this.cargarData()
        this.dialogSpinner.close();
      }
    }, (err: any) => {
      this.dialogSpinner.close();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addProducto() {
    const user = new User();
    user.operacion = EOperations.PERSISTIR;
    const ref = this.dialog.open(AddUserComponent, {
      width: '600px',
      data: user,
      disableClose: true,
    });
    ref.afterClosed().subscribe((result: User) => {
      if (result) {
        this.users.push(result);
        this.messageService.add({ severity: ESystem.TOAST_SUCCESS, summary: ESystem.TOAST_SUCCESS, detail: 'Se guardo' });
        this.cargarData();
      }
    });
  }

  cargarData() {
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.filterPredicate = (data: User, filter: string) => {
      if (data.name) {
        const val = data.name.toLowerCase().indexOf(filter.toLowerCase()) != -1;
        return val;
      } else {
        return false;
      }
    }
    this.dataSource.paginator = this.paginator;
  }
  /**
 * Función que me permite editar los productos
 * @param servicio 
 */
  openDialogEditar(user: User): void {
    user.operacion = EOperations.EDITAR;
    let use = new User();
    use = use.deepCopy(user) as User;
    const ref = this.dialog.open(AddUserComponent, {
      data: use,
      backdropClass: 'backdropBackground',
      panelClass: 'custom-modalbox',
      disableClose: true
    });
    ref.afterClosed().subscribe((user: User) => {
      if (user) {
        for (let index = 0; index < this.users.length; index++) {
          const use = this.users[index];
          if (use.numberDocument === user.numberDocument) {
            this.users.splice(index, 1, user);
            this.messageService.add({ severity: ESystem.TOAST_SUCCESS, summary: ESystem.TOAST_SUCCESS, detail: 'Se actualizo el sistema' });
            break;
          }
        }
        this.cargarData();
      }
    });
  }
}