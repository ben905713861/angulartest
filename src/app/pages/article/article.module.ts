import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';
import { EditComponent } from './edit.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { HttpErrorInterceptorService } from 'src/app/config/HttpErrorInterceptorService';
import { AuthInterceptor } from 'src/app/config/AuthInterceptor';
import { NzSpaceModule } from 'ng-zorro-antd/space';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ArticleRoutingModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzTableModule,
    NzModalModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzSpaceModule,
  ],
  declarations: [ArticleComponent, EditComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true,
    },
  ] 
})
export class ArticleModule { }
