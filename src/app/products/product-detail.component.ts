import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IProduct} from "./product";
import {ProductService} from "./product.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  pageTitle: string = "Product Detail";
  product: IProduct | undefined;
  sub!: Subscription;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += ': ' + id;
    this.sub =
      this.productService.getProducts().subscribe({
        next: products => {
          products.find((product: IProduct) => {
            if (product.productId === id) {
              this.product = product;
            }
          })
        }
      })
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
