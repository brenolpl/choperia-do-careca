import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'Choperia do Careca';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
