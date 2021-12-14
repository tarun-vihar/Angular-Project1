import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ColDef } from 'ag-grid-community';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  // dataSource: Observable<any[]>;
  displayColumns: ColDef[] = [
    { field: 'id', headerName: 'Product ID', pinned: 'left', resizable: true },
    {
      field: 'title',
      sortable: true,
      filter: true,
      pinned: 'left',
      resizable: true,
    },

    { field: 'description', resizable: true },
    { field: 'category', sortable: true, filter: true },
    { field: 'price', sortable: true },
  ];

  public paginationSize = 10;

  // 'id',
  // 'name',
  // 'description',
  // 'price',
  // 'category',
  // 'countInStock',
  // 'actions',
  productList: Observable<any[]>;
  constructor(private productService: ApiService) {
    // .subscribe((res) => {
    //   console.log(res);
    // });
    // [rowData]="rowData"
    this.productList = productService.getProducsts();
  }

  onGridReady(params: any) {
    params.api.sizeColumnsToFit();
  }
  ngOnInit(): void {}

  createProduct() {
    this.productService.createProduct();
  }
}
