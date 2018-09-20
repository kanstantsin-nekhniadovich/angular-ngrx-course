import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionTypes } from './product.actions';

export interface IAppState extends fromRoot.IAppState {
  products: IProductState;
}

export interface IProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
  error: string;
}

const initialState: IProductState = {
  showProductCode: true,
  currentProduct: null,
  products: [],
  error: ''
}

const getFeauterProductState = createFeatureSelector<IProductState>('products');

export const getShowProductCode = createSelector(
  getFeauterProductState,
  state => state.showProductCode
);

export const getCurrentProduct = createSelector(
  getFeauterProductState,
  state => state.currentProduct
);

export const getProducts = createSelector(
  getFeauterProductState,
  state => state.products
)

export const getError = createSelector(
  getFeauterProductState,
  state => state.error
)

export function reducer(state = initialState, action: ProductActions): IProductState {
  switch (action.type) {
    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      }
    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProduct: { ...action.payload }
      }
    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProduct: null
      }
    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProduct: {
          id: 0,
          productName: '',
          productCode: 'New',
          description: '',
          starRating: 0
        }
      }
    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: action.payload,
        error: ''
      }
    case ProductActionTypes.LoadFail:
      return {
        ...state,
        products: [],
        error: action.payload
      }
    case ProductActionTypes.CreateProductSuccess:
      var products = state.products.slice(0);
      products.push(action.payload);

      return {
        ...state,
        currentProduct: action.payload,
        products: products
      }
    case ProductActionTypes.CreateProductFail:
      return {
        ...state,
        error: action.payload
      }
    case ProductActionTypes.UpdateProductSuccess:
      var products = state.products.slice(0);
      var index = products.findIndex((product) => product.id === action.payload.id);
      if (index > -1) {
        products[index] = action.payload;
      }

      return {
        ...state,
        currentProduct: action.payload,
        products: products
      }
    case ProductActionTypes.UpdateProductFail:
      return {
        ...state,
        error: action.payload
      }
    case ProductActionTypes.DeleteProductFail:
      return {
        ...state,
        error: action.payload
      }
    case ProductActionTypes.DeleteProductSuccess:
      var products = state.products.filter((product: Product) => product.id !== action.payload);

      return {
        ...state,
        currentProduct: null,
        products: products
      }
    default:
      return state;
  }
}
