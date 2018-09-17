import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

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

export function reducer(state = initialState, action): IProductState {
  switch (action.type) {
    case 'TOGGLE_DISPLAY_CODE':
      return {
        ...state,
        showProductCode: action.payload
      }
    default:
      return state;
  }
}