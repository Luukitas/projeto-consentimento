import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConsentService } from '../../services/consent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-give-consent',
  imports: [ReactiveFormsModule ],
  templateUrl: './give-consent.component.html',
  styleUrl: './give-consent.component.css'
})
export class GiveConsentComponent {
  form = new FormGroup({
    nome: new FormControl(''),
    email: new FormControl('', Validators.email),
    consentirUm: new FormControl(false),
    consentirDois: new FormControl(false),
    consentirTres: new FormControl(false)
  })

  constructor(private consentService: ConsentService, private router: Router){}

  recuperarListaConsentimento = () => {
    let valorConsentimento = "";
    if (this.form.controls.consentirUm.value) {
      
    }
  }

  darConsentimento = () => {

    let requisicao: any = {
      nome: this.form.controls.nome.value,
      email: this.form.controls.email.value,
      consentirUm: this.form.controls.consentirUm.value, 
      consentirDois: this.form.controls.consentirDois.value, 
      consentirTres: this.form.controls.consentirTres.value
    }
    this.consentService.addConsent(requisicao).then(() => {
      this.router.navigate(['/list-consent']);
    })
  }
}
