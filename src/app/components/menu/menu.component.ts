import { CommonModule } from '@angular/common';
import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements DoCheck {
  listaMenu: any[] = [
    {url: "/give-consent", label: "Give consent"},
    {url: "/list-consent", label: "Collected consents"}
  ];

  rotaAtiva: string = ""

  constructor(private router: Router){}

  ngDoCheck(): void {
    let contador = 0;
    if (contador < 1) {
      this.rotaAtiva = this.router.url;
    }
  }
}
