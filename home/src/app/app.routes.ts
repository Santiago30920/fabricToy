import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PortalComponent } from './portal/portal.component';
import { UserComponent } from './portal/user/user.component';
import { ProductComponent } from './portal/product/product.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'home', component: PortalComponent, children: [
        {path: 'user', component: UserComponent},
        {path: 'product', component: ProductComponent}
    ]}
];
