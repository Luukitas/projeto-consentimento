import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { setupFetchMock } from './shared/mock-api/mock-api';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

setupFetchMock()
