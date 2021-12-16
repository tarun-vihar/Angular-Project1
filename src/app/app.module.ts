import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { FilterPipe } from './common/filter.pipe';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';

import { ProductEditScreenComponent } from './components/product-edit-screen/product-edit-screen.component';
import { UserServiceService } from './shared/user-service.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    CartComponent,
    ProductComponent,
    FilterPipe,
    UserProfileComponent,
    UserListComponent,
    ProductListComponent,
    ProductEditScreenComponent,
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
    ToastrModule.forRoot({
      timeOut: 10000,
      preventDuplicates: true,
    }),
    AgGridModule.withComponents([]),
    // MatTableModule,
    // MatPaginatorModule,
    // MatSortModule,
  ],
  providers: [UserServiceService],
  bootstrap: [AppComponent],
  exports: [AppComponent, LoginComponent, SignupComponent],
})
export class AppModule {}
