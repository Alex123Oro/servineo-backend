// services/jobOfert/filter.service.ts
import { getRangeRegex } from '../../utils/nameRangeHelper';
import { validateAndNormalizeCity } from '../../utils/cityHelper';
import { validateAndNormalizeCategory } from '../../utils/categoryHelper';
import { FilterCommon } from '../common/filter.common';
import type { MongoQuery, FilterOptions as BaseFilterOptions } from '../../types/common.types';

export type FilterOptions = BaseFilterOptions & {
  ranges?: string[];
  city?: string;
  categories?: string[];
};

export function filterOffers(options?: FilterOptions): MongoQuery {
  if (!options) return {};

  const filters: MongoQuery = {};

  if (options.ranges && options.ranges.length > 0) {
    const regexes = options.ranges.map((r) => getRangeRegex(r)).filter(Boolean);
    if (regexes.length > 0) {
      filters.fixerName = { $in: regexes };
    }
  }

  if (options.city) {
    filters.city = validateAndNormalizeCity(options.city);
  }

  if (options.categories && options.categories.length > 0) {
    const normalizedCategories = options.categories
      .map((c) => validateAndNormalizeCategory(c))
      .filter(Boolean);
    if (normalizedCategories.length > 0) {
      filters.category = { $in: normalizedCategories };
    }
  }

  return FilterCommon.build(filters);
}
