import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../domain/services/user.service';
import { MessageService } from 'primeng/api';
import { LoadComponent } from '../../load/load.component';
import { ECode } from '../../domain/enums/e-code';
import { EOperations } from '../../domain/enums/e-operations';
import { ESystem } from '../../domain/enums/e-system';
import { CurrencyPipe } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MatButtonModule } from '@angular/material/button';
import { TooltipModule } from 'primeng/tooltip';
import { AddProductComponent } from './add-product/add-product.component';
import { Product } from '../../domain/class/product';
import { EProduct } from '../../domain/enums/e-product';
import { ProductService } from '../../domain/services/product.service';

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
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [MessageService]
})
export class ProductComponent implements OnInit {
  //listado de servicios
  products: Product[] = [];
  //llamando al spinner
  dialogSpinner!: any;
  //AsignandoColumnas
  displayedColumns: string[] = [EProduct.LABEL_ID, EProduct.LABEL_NAME, EProduct.LABEL_PRICE, EProduct.LABEL_QUANTITY, EProduct.LABEL_STATE, EProduct.LABEL_ACTION];
  dataSource!: MatTableDataSource<Product>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(public dialog: MatDialog, private productoService: ProductService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.dialogSpinner = this.dialog.open(LoadComponent, {
      disableClose: true,
      backdropClass: 'backdropBackground',
      panelClass: 'custom-modalbox'
    });
    this.productoService.listar().subscribe((data: any) => {
      if (data.status === ECode.OK) {
        this.products = data.data;
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
    const product = new Product();
    product.operacion = EOperations.PERSISTIR;
    const ref = this.dialog.open(AddProductComponent, {
      width: '600px',
      data: product,
      disableClose: true,
    });
    ref.afterClosed().subscribe((result: Product) => {
      if (result) {
        this.products.push(result);
        this.messageService.add({ severity: ESystem.TOAST_SUCCESS, summary: ESystem.TOAST_SUCCESS, detail: 'Se guardo' });
        this.cargarData();
      }
    });
  }

  cargarData() {
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.filterPredicate = (data: Product, filter: string) => {
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
  openDialogEditar(product: Product): void {
    product.operacion = EOperations.EDITAR;
    let produ = new Product();
    produ = produ.deepCopy(product) as Product;
    const ref = this.dialog.open(AddProductComponent, {
      data: produ,
      backdropClass: 'backdropBackground',
      panelClass: 'custom-modalbox',
      disableClose: true
    });
    ref.afterClosed().subscribe((product: Product) => {
      if (product) {
        for (let index = 0; index < this.products.length; index++) {
          const produ = this.products[index];
          if (produ.id === product.id) {
            this.products.splice(index, 1, product);
            this.messageService.add({ severity: ESystem.TOAST_SUCCESS, summary: ESystem.TOAST_SUCCESS, detail: 'Se actualizo el sistema' });
            break;
          }
        }
        this.cargarData();
      }
    });
  }
}