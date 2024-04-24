import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { User } from '../domain/class/user';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    MatMenuModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.css'
})
export class PortalComponent implements OnInit {
  user: User;
  constructor(private router: Router, ) {
    //this.text = data;
    this.user = new User();
    if (!sessionStorage.getItem('user')) {
      this.router.navigate([""]);
    } else {
      let tempUser = JSON.parse(sessionStorage.getItem('user')!);
      this.user = tempUser[0];
    }
    if(this.user.rol == '3'){

    }
  }
  ngOnInit(): void {
  }
}
