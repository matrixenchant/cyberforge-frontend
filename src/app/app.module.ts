import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfiguratorComponent } from './configurator/configurator.component';
import { CardComponent } from './configurator/card/card.component';
import { AngularTiltModule } from 'angular-tilt';
import { DeckComponent } from './configurator/deck/deck.component';
import { ButtonComponent } from './components/button/button.component';
import { TextComponent } from './components/text/text.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfiguratorComponent,
    CardComponent,
    DeckComponent,
    ButtonComponent,
    TextComponent
  ],
  imports: [
    AngularTiltModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
