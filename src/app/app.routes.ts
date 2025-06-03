import { Routes } from '@angular/router';
import { GiveConsentComponent } from './components/give-consent/give-consent.component';
import { ListConsentsComponent } from './components/list-consents/list-consents.component';

export const routes: Routes = [
    {path:'give-consent', component: GiveConsentComponent},
    {
        path:'list-consent', component: ListConsentsComponent
    },
    {
        path:'**',
        redirectTo:'give-consent'
    }
];
