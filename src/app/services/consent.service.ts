import { Injectable } from '@angular/core';
// import { mockApi } from '../../shared/mock-api/mock-api';

@Injectable({
  providedIn: 'root'
})
export class ConsentService {

  async getConsent(): Promise<any[]> {
    const response = await fetch('/consents');
    const json = await response.json();
    return json.data;
  }

  async addConsent(novo: any) {
    const res = await fetch('/consents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novo),
    });
    const json = await res.json();
    return json.data;
  }
}
