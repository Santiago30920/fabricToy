import { Component, Inject, OnInit } from '@angular/core';
import { Product } from '../../../domain/class/product';
import { MessageService } from 'primeng/api';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../domain/services/product.service';
import { EOperations } from '../../../domain/enums/e-operations';
import { LoadComponent } from '../../../load/load.component';
import { ECode } from '../../../domain/enums/e-code';
import { ESystem } from '../../../domain/enums/e-system';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MatCardModule } from '@angular/material/card';
import { FileUploadModule } from 'primeng/fileupload';
import { EditorModule } from 'primeng/editor';


@Component({
  selector: 'app-add-product',
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
    MatCheckboxModule,
    MatCardModule,
    FileUploadModule,
    EditorModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
  providers: [MessageService]
})
export class AddProductComponent implements OnInit {
  uploadedFiles: any[] = [];
  //Objeto servicio
  product: Product;
  //imagenes
  imagenes: File[] = [];
  /**
 * Indica si los campos se pueden editar
 */
  disable = false;
  hidden!: boolean;
  //video
  video: boolean = false;
  //llamado al spinner
  dialogSpinner!: any;
  //Obtener link de imagenes
  linkImages: string[] = [];
  //categoria
  categories: any[] = [];
  //tabla colaboradores
  contributors: any[] = [];
  constructor(private messageService: MessageService, public dialogRef: MatDialogRef<AddProductComponent>,
    private productService: ProductService, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {
    this.product = data;
    //Determinando si es editar o persitir
    if (this.product.operacion === EOperations.EDITAR) {
      this.disable = true;
      this.hidden = true;
      this.linkImages = [];
    } else {
      this.hidden = false;
      this.disable = false;
    }
  }


  ngOnInit(): void {
  }
  /**
  * Función que me permite cargar imagenes
  * @param event -> any
  */
  onUpload(event: any) {
    for (let file of event.files) {
      this.product.img.push(file.objectURL.changingThisBreaksApplicationSecurity);
    }
  }
  /**
 * Funcion que me permite validar si todos los campos están llenos
 */
  confirmar() {

    switch (this.product.operacion) {
      case EOperations.PERSISTIR:
        if (this.product.description && this.product.name && this.product.price && this.product.quantity) {
          if(this.product.img.length >= 3){
            this.product.state = 1;
            this.dialogSpinner = this.dialog.open(LoadComponent, {
              disableClose: true,
              backdropClass: 'backdropBackground',
              panelClass: 'custom-modalbox'
            });
            this.productService.persistir(this.product).subscribe((data: any) => {
              if (data.status === ECode.OK) {
                this.dialogSpinner.close();
                this.dialogRef.close(this.product);
              }
            }, (err: any) => {
              this.messageService.add({ severity: ESystem.TOAST_ERROR, summary: ESystem.TOAST_ERROR, detail: err });
              this.dialogSpinner.close();
            });
          }else{
            this.messageService.add({ severity: ESystem.TOAST_WARN, summary: ESystem.TOAST_WARN, detail: 'Se debe subir al menos minimo una imagen' });
          }
        } else {
          this.messageService.add({ severity: ESystem.TOAST_WARN, summary: ESystem.TOAST_WARN, detail: 'Todos los campos deben ser llenados antes de continuar' });
        }
        break;
      case EOperations.EDITAR:
        if (this.product.id && this.product.description && this.product.name && this.product.price && this.product.quantity) {
          this.dialogSpinner = this.dialog.open(LoadComponent, {
            disableClose: true,
            backdropClass: 'backdropBackground',
            panelClass: 'custom-modalbox'
          });
          this.productService.editar(this.product).subscribe((data: any) => {
            if (data.code === ECode.OK) {
              this.dialogSpinner.close();
              this.dialogRef.close(this.product);
            }
          }, (err: any) => {
            this.messageService.add({ severity: ESystem.TOAST_ERROR, summary: ESystem.TOAST_ERROR, detail: err });
            this.dialogSpinner.close();
          });
        } else {
          this.messageService.add({ severity: ESystem.TOAST_WARN, summary: ESystem.TOAST_WARN, detail: 'Todos los campos deben ser llenados antes de continuar' });
        }
        break;
    }

  }
  /**
   * Función que me permite eliminar las imagenes.
   * @param event 
   */
  eliminarImagen(event: any) {
    for (let index = 0; index < this.imagenes.length; index++) {
      if (event.file.name == this.imagenes[index].name) {
        this.linkImages.splice(index, 1);
        this.imagenes.splice(index, 1);
      }
    }
  }
}
