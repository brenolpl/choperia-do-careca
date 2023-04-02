import { Component, NgModule, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService, IUser } from '../../services';
import { UserPanelModule } from '../user-panel/user-panel.component';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

import { Router } from '@angular/router';
import {RfidService} from "../../services/rfid.service";
import notify from "devextreme/ui/notify";
import {BalancaService} from "../../services/balanca-service";
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title!: string;

  user: IUser | null = { email: '' };

  userMenuItems = [
  {
    text: 'Logout',
    icon: 'runner',
    onClick: () => {
      this.authService.logOut();
    }
  },
  {
      text: 'Conectar leitor RFID',
      icon: 'link',
      onClick: () => {
          if(!this.rfidService.isInitialized) this.rfidService.initReader();
          else {
              notify('Leitor já inicializado!', 'warning', 2000);
          }
      }
  },
      {
          text: 'Conectar Balança Toledo',
          icon: 'link',
          onClick: () => {
              if(!this.balancaService.isInitialized) this.balancaService.initReader();
              else {
                  notify('Balança já conectada!', 'warning', 2000);
              }
          }
      }
  ];

  constructor(private authService: AuthService, private router: Router, private rfidService: RfidService, private balancaService: BalancaService) { }

  ngOnInit() {
    this.authService.getUser().then((e) => this.user = e.data);
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  }
}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    UserPanelModule,
    DxToolbarModule
  ],
  declarations: [ HeaderComponent ],
  exports: [ HeaderComponent ]
})
export class HeaderModule { }
