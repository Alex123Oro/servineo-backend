// services/common/sort.common.ts
import type { MongoQuery } from '../../types/common.types';

export class SortService {
  static build(sortConfig: Record<string, 1 | -1>): MongoQuery {
    return Object.keys(sortConfig).length > 0 ? sortConfig : { createdAt: -1 };
  }

  static byField(field: string, order: 'asc' | 'desc' = 'asc'): MongoQuery {
    return { [field]: order === 'asc' ? 1 : -1 };
  }

  static byMultipleFields(fields: Array<{ field: string; order: 'asc' | 'desc' }>): MongoQuery {
    const sort: MongoQuery = {};
    fields.forEach(({ field, order }) => {
      sort[field] = order === 'asc' ? 1 : -1;
    });
    return sort;
  }
}
