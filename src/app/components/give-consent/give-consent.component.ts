import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConsentService } from '../../services/consent.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-give-consent',
  imports: [ReactiveFormsModule, CommonModule ],
  templateUrl: './give-consent.component.html',
  styleUrl: './give-consent.component.css'
})
export class GiveConsentComponent {
  form = new FormGroup({
    nome: new FormControl('', Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/)),
    email: new FormControl('', Validators.email),
    consentirUm: new FormControl(false),
    consentirDois: new FormControl(false),
    consentirTres: new FormControl(false)
  })

  mensagemErro: string = "";
  mensagemAlerta: string = "";

  constructor(private consentService: ConsentService, private router: Router){}

  darConsentimento = () => {
    this.mensagemErro = "";
    this.mensagemAlerta = "";
    if (this.form.controls.nome.errors) {
      this.mensagemErro = "Digite um nome válido.";
    }else if (this.form.controls.email.errors) {
      this.mensagemErro = "Digite um e-mail válido.";
    }else{
      let requisicao: any = {
        nome: this.form.controls.nome.value,
        email: this.form.controls.email.value,
        consentirUm: this.form.controls.consentirUm.value, 
        consentirDois: this.form.controls.consentirDois.value, 
        consentirTres: this.form.controls.consentirTres.value
      }
      this.consentService.adicionarConsentimento(requisicao).then((response) => {
        if (response !== undefined) {
          this.mensagemAlerta = response;
        }else{
          this.router.navigate(['/list-consent']);
        }
      });
    }
  }
}
