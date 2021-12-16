import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/models/IProduct';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-edit-screen',
  templateUrl: './product-edit-screen.component.html',
  styleUrls: ['./product-edit-screen.component.css'],
})
export class ProductEditScreenComponent implements OnInit {
  formTitle: string = 'Add';
  productId: string | undefined;
  productForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productSrv: ProductsService
  ) {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      image: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((p) => {
      this.productId = p['id'] || null;
      this.formTitle = this.productId ? 'Update' : 'Add';

      if (this.productId) {
        this.prepopulateProduct(+this.productId);
      }
    });
  }

  prepopulateProduct(id: number) {
    this.productSrv.getProductInfoById(id).subscribe((productInfo) => {
      console.log(productInfo);
      if (productInfo) {
        this.productForm.setValue({
          name: productInfo.name,
          image: productInfo.image,
          price: productInfo.price,
          description: productInfo.description,
        });
      }
    });
  }

  addProduct() {
    console.log('Product Info:: ', this.productForm.value);
    const { name, image, description, price } = this.productForm.value;
    const product: IProduct = {
      name,
      image,
      description,
      price,
      id: Number(this.productId),
      available: false,
      _id: 0,
    };
    this.productSrv.updateProduct(product);

    // this.productSrv.addProduct(product);
  }
}
