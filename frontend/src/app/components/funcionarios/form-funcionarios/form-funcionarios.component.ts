import { Component, OnInit } from '@angular/core';
import {confirm} from 'devextreme/ui/dialog';
import {Location} from '@angular/common';

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-funcionarios.component.html',
  styleUrls: ['../../../layouts/formularios/formularios.component.scss']
})
export class FormFuncionariosComponent implements OnInit {

  labelLocation = 'left';

  constructor(
    private location: Location,
  ) {
    if (window.innerWidth <= 580) {
      this.labelLocation = 'top';
    }
  }

  ngOnInit(): void {
  }

  public back() {
    this.location.back();
  }

  salvar = () => {

  }

  public excluir() {
    confirm('Tem certeza que deseja excluir? Não será possível desfazer a alteração.', 'Confirmar exclusão').then((confirmExcluir) => {
      if (confirmExcluir) {

      }
    });
  }
}
