import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConsentService } from '../../services/consent.service';

@Component({
  selector: 'app-list-consents',
  imports: [CommonModule],
  templateUrl: './list-consents.component.html',
  styleUrl: './list-consents.component.css'
})
export class ListConsentsComponent implements OnInit{
  listaConsentimentoAux: any[] = []
  listaConsentimento: any[] = [];

  indiceLista: number = 0

  constructor(private consentService: ConsentService){}

  ngOnInit(): void {
    this.getConsent();
  }

  getConsent = () => {
    this.consentService.getConsent().then((response) => {
      this.listaConsentimentoAux = response;
      this.formatarListaConsentimento();
    })
  }

  formatarListaConsentimento = () => {
    let lista: any[] = [];
    this.listaConsentimentoAux.forEach((obj, index) => {
      lista.push(obj);
      if ((index + 1)%5 === 0 || index === this.listaConsentimentoAux.length-1) {
        this.listaConsentimento.push(lista);
        lista = [];
      }
    });
  }

  selecionarIndice = (indice: number, acao:string) => {
    if (acao === 'anterior' && this.indiceLista !==0) {
      this.indiceLista--;
    }else if(acao === 'proximo' && this.indiceLista !== this.listaConsentimento.length -1){
      this.indiceLista++;
    }else if(acao === ''){
      this.indiceLista = indice;
    }
  }
}
