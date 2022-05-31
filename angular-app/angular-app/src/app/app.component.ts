import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { singleSpaPropsSubject } from 'src/single-spa/single-spa-props';


export interface User {
  id: number,
  address: string,
  name: string,
  lastName: string,
  email: string
}

export interface Products {
  id: number,
  name: string,
  price: number,
  description: string
}

let ELEMENT_DATA: User[];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'angular-app';
  singleSpaProps$ = singleSpaPropsSubject.asObservable();
  reactComunication: boolean = false;
  isDisplayingProducts: boolean = false;
  displayedColumns: string[] = ['id', 'name', 'lastname', 'address', 'email'];
  dataSource:Array<User> = [];
  productArray:Array<Products> = [];
  donations: Number = 0;
  greyhoundRescued = 0;
  
  ngOnInit() {
    window.addEventListener('dataSent', () => {          
          this.reactComunication = true;
          this.singleSpaProps$.subscribe(
            (response) => {
              if(response.customProp?.users) {
                ELEMENT_DATA =  response.customProp?.users; 
                this.dataSource = ELEMENT_DATA;
                
          }         
              if(response.customProp?.products) {
                this.productArray = response.customProp?.products;
              }
          console.log('we have a live one', response);
        }
      )
    });

    console.log('here is some from angular:', this.singleSpaProps$);
  } 
  
  toggleProductsDisplay() {
    console.log('its in');
    this.isDisplayingProducts = !this.isDisplayingProducts;
  }
  
}
