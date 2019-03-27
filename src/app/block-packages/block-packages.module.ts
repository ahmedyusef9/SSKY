import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBlockComponent } from './add-block/add-block.component';
import { BlockPackagesComponent } from './block-packages/block-packages.component';
import { DeleteBlockComponent } from './delete-block/delete-block.component';

@NgModule({
  declarations: [AddBlockComponent, BlockPackagesComponent, DeleteBlockComponent],
  imports: [
    CommonModule
  ]
})
export class BlockPackagesModule { }
