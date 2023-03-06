import {Component, OnInit, ViewChild} from '@angular/core';
import {DxDataGridComponent} from "devextreme-angular";
import {ActivatedRoute, Router} from "@angular/router";
import {confirm} from "devextreme/ui/dialog";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['../../layouts/table-list/table-list.component.css']
})
export class ClientesComponent implements OnInit {
  @ViewChild(DxDataGridComponent, {static: false}) dataGrid!: DxDataGridComponent;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  public editar = (evt: any) => {

  }

  public excluir = (evt: any) => {
    const entidade = evt.row.data;
    confirm('Tem certeza que deseja excluir? Não será possível desfazer a alteração.', 'Confirmar exclusão').then((confirmExcluir) => {
      if (confirmExcluir) {

      }
    });
  }

  onClickNovo() {
    this.router.navigate(['novo'], {relativeTo: this.route});
  }
}
