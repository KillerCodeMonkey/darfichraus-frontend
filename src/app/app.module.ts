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
import {LeafmapComponent} from './leafmap/leafmap.component';
import {MeldungComponent} from './meldung/meldung.component';
import {FormsModule} from '@angular/forms';
import {RestrictionRepository} from './restriction.repository';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MeldungReactiveComponent} from './meldung-reactive/meldung-reactive.component';
import {NumericDirective} from './meldung/number-input.directive';
import {DeviceDetectorModule} from 'ngx-device-detector';


export function restrictionProviderFactory(provider: RestrictionRepository) {
  return () => provider.preloadData();
}

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    MapComponent,
    LeafmapComponent,
    MeldungComponent,
    MeldungReactiveComponent,
    NumericDirective
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
    DeviceDetectorModule.forRoot()
  ],
  providers: [
    RestrictionRepository,
    {
      provide: APP_INITIALIZER, useFactory: restrictionProviderFactory, deps: [
        RestrictionRepository
      ], multi: true
    },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {panelClass: 'mat-dialog-override'}}

  ],
  bootstrap: [AppComponent]
})

export class AppModule{

}
