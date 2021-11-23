import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BackgroundHeaderComponent } from './background-header/background-header.component';
import { HeaderComponent } from './header/header.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HomeComponent } from './home/home.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { EditorModule } from '@tinymce/tinymce-angular';

// import {Routin}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    BackgroundHeaderComponent,
    HeaderComponent,
    HomeComponent,
    AddBlogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 10000,
      preventDuplicates: true,
    }),
    EditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [AppComponent, LoginComponent, SignupComponent],
})
export class AppModule {}
