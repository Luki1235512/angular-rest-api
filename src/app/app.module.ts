import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import {UsersService} from "./services/users.service";
import {HttpClientModule} from "@angular/common/http";
import { PostsComponent } from './components/posts/posts.component';
import { TodosComponent } from './components/todos/todos.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    PostsComponent,
    TodosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    UsersService,
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
