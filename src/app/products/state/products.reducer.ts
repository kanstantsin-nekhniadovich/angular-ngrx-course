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
}

const initialState: IProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
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
    default:
      return state;
  }
}