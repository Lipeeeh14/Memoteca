import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Pensamento } from './../pensamento';
import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  formulario!: FormGroup;
  pensamentoId!: number;
  pensamento!: Pensamento;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: ['', Validators.compose([Validators.required, Validators.pattern(/(.|\s)*\S(.|\s)*/)])],
      autoria: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      modelo: ['modelo1']
    });

    this.pensamentoId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.service.buscarPorId(this.pensamentoId).subscribe(res => {
      this.formulario.get('conteudo')?.setValue(res.conteudo);
      this.formulario.get('autoria')?.setValue(res.autoria);
    });
  }

  editarPensamento() {
    this.pensamento = this.formulario.value;
    this.pensamento.id = this.pensamentoId;
    this.service.editar(this.formulario.value).subscribe(res => this.router.navigate(['/listarPensamento']));
  }

  cancelarPensamento() {
    this.router.navigate(['/listarPensamento']);
  }

  habilitarBotao() {
    if (this.formulario.valid){
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }
}
