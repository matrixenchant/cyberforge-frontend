import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AngularTiltModule } from 'angular-tilt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssembliesComponent } from './assemblies/assemblies.component';
import { AssemblyCardComponent } from './assemblies/assembly-card/assembly-card.component';
import { AuthComponent } from './auth/auth.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ButtonComponent } from './components/button/button.component';
import { CaseImgComponent } from './components/case-img/case-img.component';
import { FilterComponent } from './components/filter/filter.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ProgressPowerComponent } from './components/progress-power/progress-power.component';
import { TextComponent } from './components/text/text.component';
import { UserWidgetComponent } from './components/user-widget/user-widget.component';
import { CardComponent } from './configurator/card/card.component';
import { ConfiguratorComponent } from './configurator/configurator.component';
import { DeckComponent } from './configurator/deck/deck.component';
import { Error404Component } from './error404/error404.component';
import { HomeNavComponent } from './home/home-nav/home-nav.component';
import { HomeComponent } from './home/home.component';
import { MatrixTransitionComponent } from './matrix-transition/matrix-transition.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/AuthInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    ConfiguratorComponent,
    CardComponent,
    DeckComponent,
    ButtonComponent,
    TextComponent,
    AssembliesComponent,
    AssemblyCardComponent,
    CaseImgComponent,
    ProgressPowerComponent,
    AuthComponent,
    HomeComponent,
    MatrixTransitionComponent,
    HomeNavComponent,
    BreadcrumbComponent,
    NotificationComponent,
    FilterComponent,
    UserWidgetComponent,
    Error404Component,
  ],
  imports: [AngularTiltModule, BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
