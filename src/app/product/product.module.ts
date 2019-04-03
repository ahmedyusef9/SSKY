import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { EditProfitComponent } from './edit-profit/edit-profit.component';
import { PriceListComponent } from './price-list/price-list.component';
import { ProductComponent, DeleteDialog } from './product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValidErrModule } from '../valid-err/valid-err.module';
import { TranslateModule, TranslateService } from 'ng2-translate';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { YnModule } from '../pipes/yn.module';
import { ProductService } from './product.service';
import { CompanyService } from '../company/company.service';
import { ExcelService } from '../excel.service';
import { BlockPackegesService } from '../block-packages/block-packeges.service';
import { AuthenticationService } from '../login/authentication.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ValidErrModule,
    TranslateModule,
    MaterialModule,
    RouterModule,
    YnModule
  ],
  exports : [
    ProductComponent,
    AddProductComponent,
    EditProductComponent,
    TranslateModule,
    ValidErrModule,
    DeleteDialog, 
    PriceListComponent, 
    EditProfitComponent
  ],
  declarations: [
    ProductComponent, 
    AddProductComponent, 
    EditProductComponent,
    DeleteDialog, 
    PriceListComponent, 
    EditProfitComponent
  ],
  providers:[
    { 
      provide: ProductService, useClass: ProductService 
    },
    { 
      provide: CompanyService, useClass: CompanyService 
    },
    TranslateService,
    // { 
    //   provide: ExcelService, useClass: ExcelService 
    // },
    { provide :BlockPackegesService,useClass:BlockPackegesService},
    AuthenticationService
  ],
  entryComponents: [
    AddProductComponent,
    EditProductComponent,
    DeleteDialog, 
    PriceListComponent, 
    EditProfitComponent
  ],
})
export class ProductModule { }
