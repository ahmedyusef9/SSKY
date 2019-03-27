import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { EditProfitComponent } from './edit-profit/edit-profit.component';
import { PriceListComponent } from './price-list/price-list.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [AddProductComponent, EditProductComponent, EditProfitComponent, PriceListComponent, ProductComponent],
  imports: [
    CommonModule
  ]
})
export class ProductModule { }
