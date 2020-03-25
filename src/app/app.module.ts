import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ClarityModule} from '@clr/angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FeedComponent} from './feed/feed.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from './material.module';
import {HttpClientModule} from '@angular/common/http';
import {MapComponent} from './map/map.component';
import {MeldungComponent} from './meldung/meldung.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RestrictionRepository} from './restriction.repository';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MeldungReactiveComponent} from './meldung-reactive/meldung-reactive.component';
import {NumericDirective} from './meldung/number-input.directive';
import {DeviceDetectorModule} from 'ngx-device-detector';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {SearchPipe} from '../app/search.pipe';
import { ImpressumComponent } from './impressum/impressum.component';
import { HomeComponent } from './home/home.component';
import { PlayerComponent } from './player/player.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { AdminReviewComponent } from './admin-review/admin-review.component';
import { PreviewModalComponent } from './preview-modal/preview-modal.component';
import { UnverifiedRestrComponent } from './unverified-restr/unverified-restr.component';
import { VerifiedRestrComponent } from './verified-restr/verified-restr.component';

export function restrictionProviderFactory(provider: RestrictionRepository) {
  return () => provider.preloadData();
}

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    MapComponent,
    MeldungComponent,
    MeldungReactiveComponent,
    NumericDirective,
    SearchPipe,
    ImpressumComponent,
    HomeComponent,
    PlayerComponent,
    ContactFormComponent,
    AdminReviewComponent,
    PreviewModalComponent,
    UnverifiedRestrComponent,
    VerifiedRestrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DeviceDetectorModule.forRoot(),
    FontAwesomeModule,
    // RecaptchaModule,
    // RecaptchaFormsModule, // if you need forms support

  ],
  providers: [
    RestrictionRepository,
    {
      provide: APP_INITIALIZER, useFactory: restrictionProviderFactory, deps: [
        RestrictionRepository
      ], multi: true
    },
    //{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {panelClass: 'mat-dialog-override'}},
    {provide: MAT_DATE_LOCALE, useValue: 'de'},

  ],
  bootstrap: [AppComponent]
})

export class AppModule{

}
