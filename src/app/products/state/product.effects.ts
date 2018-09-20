import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { Product } from '../product';
import { ProductService } from '../product.service';
import {
  ProductActionTypes,
  LoadSuccess,
  Load,
  LoadFail,
  DeleteProduct,
  DeleteProductSuccess,
  DeleteProductFail,
  CreateProduct,
  CreateProductSuccess,
  CreateProductFail,
  UpdateProduct,
  UpdateProductSuccess,
  UpdateProductFail
} from './product.actions';
import { of } from 'rxjs';

@Injectable()
export class ProductEffect {

  constructor(private actions$: Actions, private productService: ProductService) { }

  @Effect()
  loadProduct$ = this.actions$.pipe(
    ofType(ProductActionTypes.Load),
    mergeMap((action: Load) => this.productService.getProducts().pipe(
      map((products: Product[]) => (new LoadSuccess(products)))
    )),
    catchError((err) => of(new LoadFail(err)))
  );

  @Effect()
  createProduct$ = this.actions$.pipe(
    ofType(ProductActionTypes.CreateProduct),
    mergeMap((action: CreateProduct) => this.productService.createProduct(action.payload).pipe(
      map((product: Product) => (new CreateProductSuccess(product)))
    )),
    catchError((err) => of(new CreateProductFail(err)))
  );

  @Effect()
  updateProduct$ = this.actions$.pipe(
    ofType(ProductActionTypes.UpdateProduct),
    mergeMap((action: UpdateProduct) => this.productService.updateProduct(action.payload).pipe(
      map((product: Product) => (new UpdateProductSuccess(product)))
    )),
    catchError((err) => of(new UpdateProductFail(err)))
  )

  @Effect()
  deleteProduct$ = this.actions$.pipe(
    ofType(ProductActionTypes.DeleteProduct),
    mergeMap((action: DeleteProduct) => this.productService.deleteProduct(action.payload).pipe(
      map(() => (new DeleteProductSuccess(action.payload)))
    )),
    catchError((err) => of(new DeleteProductFail(err)))
  );

}
