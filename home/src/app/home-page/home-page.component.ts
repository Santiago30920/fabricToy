import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../domain/services/product.service';
import { Product } from '../domain/class/product';
import { CurrencyPipe } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { User } from '../domain/class/user';
import { DialogModule } from 'primeng/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoadComponent } from '../load/load.component';
import { ECode } from '../domain/enums/e-code';
import { MessageService } from 'primeng/api';
import { ESystem } from '../domain/enums/e-system';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterOutlet,
    RouterLink,
    MatCardModule,
    CurrencyPipe,
    CarouselModule,
    DialogModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    ToastModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  providers: [MessageService]
})
export class HomePageComponent implements OnInit {
  products: Product[] = [];
  user: User;
  visible: boolean = false;
  product: Product;
  dialogSpinner!: any;
  quantity!: number;
  price!: number;
  constructor(private productService: ProductService, private router: Router, public dialog: MatDialog, private messageService: MessageService) {
    this.product = new Product();
    this.user = new User();

    if (sessionStorage.getItem('user')) {
      let tempUser = JSON.parse(sessionStorage.getItem('user')!);
      this.user = tempUser[0];
    }
  }
  ngOnInit(): void {
    this.productService.listar().subscribe((res: any) => {
      if (res.status == 200) {
        for (let i = 0; i < res.data.length; i++) {
          let product = new Product();
          product.id = res.data[i].id;
          product.description = res.data[i].description;
          product.img.push(res.data[i].img1);
          product.img.push(res.data[i].img2);
          product.img.push(res.data[i].img3);
          product.name = res.data[i].name;
          product.pdf = res.data[i].pdf;
          product.price = res.data[i].price;
          product.quantity = res.data[i].quantity;
          product.state = res.data[i].state;
          this.products.push(product);
        }
      }
    });
  }
  downloadPDF(product: Product) {
    let link = document.createElement("a");
    link.download = "informe.pdf";
    link.href = product.pdf;
    link.click();
  }

  logout() {
    sessionStorage.clear();
  }


  showDialog(product: Product) {
    this.product = product;
    this.visible = true;
    this.price = Number(product.price)
  }
  comprar() {
    this.dialogSpinner = this.dialog.open(LoadComponent, {
      disableClose: true,
      backdropClass: 'backdropBackground',
      panelClass: 'custom-modalbox'
    });
    this.productService.editarQuantityProduct(this.quantity, this.product).subscribe((data: any) => {
      if (data.status === ECode.OK) {
        this.quantity = 0;
        this.price = 0;
        this.dialogSpinner.close();
        this.visible = false;
        this.messageService.add({ severity: ESystem.TOAST_SUCCESS, summary: ESystem.TOAST_SUCCESS, detail: "Se realizo la compra de manera correcta" });
      }
    }, (err: any) => {
      this.messageService.add({ severity: ESystem.TOAST_ERROR, summary: ESystem.TOAST_ERROR, detail: err });
      this.dialogSpinner.close();
    })
  }
}
