import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})

export class NavComponent {

  model: any = {};
  accountService: AccountService = inject(AccountService);
  isLoggedIn: boolean = false;

  login(){
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response),
        this.isLoggedIn = true
      },
      error: error => console.log(error)
    })
  }

  logout(){
    this.isLoggedIn = false;
  }
}
