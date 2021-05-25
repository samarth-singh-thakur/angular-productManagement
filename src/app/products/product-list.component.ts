import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ProductService } from "./product.service";
import { IProduct } from "./products"
@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Product List';
    imageWidth: number = 52;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string = ''
    sub!: Subscription
    constructor(private productService: ProductService) {

    }
    private _listFilter: string = '';
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.filter(value);
    }
    filteredProducts: IProduct[] = [];
    products: IProduct[] = [

        {
            "productId": 8,
            "productName": "Saw",
            "productCode": "TBX-0022",
            "releaseDate": "May 15, 2021",
            "description": "15-inch steel blade hand saw",
            "price": 11.55,
            "starRating": 3.7,
            "imageUrl": "assets/images/saw.png"
        },
        {
            "productId": 10,
            "productName": "Video Game Controller",
            "productCode": "GMG-0042",
            "releaseDate": "October 15, 2020",
            "description": "Standard two-button video game controller",
            "price": 35.95,
            "starRating": 4.6,
            "imageUrl": "assets/images/xbox-controller.png"
        }
    ]
    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        console.log("Jai shree RAM");
        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
        this.filteredProducts = this.products;

    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    filter(key: string): IProduct[] {
        key = key.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().includes(key));
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List ' + message;
        console.log("product");
    }

}