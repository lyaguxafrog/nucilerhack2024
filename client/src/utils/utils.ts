import { SortDirection, SortType } from '../consts/enums';
import { ProductData } from '../types/data-types';

export const getSortedProductsList = (productsList: ProductData[], sortType: SortType, sortDirection: SortDirection) =>
  productsList.sort((productA, productB) => {
    let diff;
    switch (sortType) {
      case SortType.Popular:
        diff = productA.rating - productB.rating;
        break;
      case SortType.Price:
        diff = productA.price - productB.price;
        break;
      default:
        diff = productA.rating - productB.rating;
        break;
    }
    return diff * sortDirection;
  });