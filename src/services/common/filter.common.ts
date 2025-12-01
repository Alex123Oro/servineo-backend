// services/common/filter.common.ts
import type { MongoQuery } from '../../types/common.types';

export class FilterCommon {
  static build(filters: Record<string, unknown>): MongoQuery {
    const query: MongoQuery = {};

    Object.entries(filters).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (Array.isArray(value)) {
        if (value.length > 0) {
          query[key] = { $in: value };
        }
      } else if (value instanceof RegExp) {
        query[key] = value;
      } else {
        query[key] = value;
      }
    });

    return query;
  }

  static combine(...queries: MongoQuery[]): MongoQuery {
    return queries.reduce((acc, query) => ({ ...acc, ...query }), {} as MongoQuery);
  }
}
