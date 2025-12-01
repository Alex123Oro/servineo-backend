/**
 * Tipos comunes para reducir uso de 'any' en el proyecto
 */

// JWT y autenticación
export interface JWTDecoded {
  id: string;
  email: string;
  role?: string;
  iat?: number;
  exp?: number;
  [key: string]: unknown;
}

// Respuestas de errores
export interface ErrorResponse {
  message: string;
  code?: string;
  statusCode?: number;
  details?: unknown;
}

// Función para obtener mensaje de error
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

// Datos de usuario
export interface UserUpdateData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  [key: string]: unknown;
}

// Filtros genéricos para búsquedas
export interface FilterOptions {
  [key: string]: unknown;
}

// Queries MongoDB/Mongoose
export interface MongoQuery {
  [key: string]: unknown;
}

// Sort/Ordenamiento
export interface SortOptions {
  [key: string]: 1 | -1 | 'asc' | 'desc';
}

// Respuesta paginada
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

// Metadata genérica
export interface Metadata {
  [key: string]: unknown;
}

// Email object
export interface EmailAddress {
  email: string;
  primary?: boolean;
}

// Provider de autenticación
export interface AuthProvider {
  provider: string;
  lastLogin?: Date;
  [key: string]: unknown;
}

// Activity metadata
export interface ActivityMetadata {
  userAgent?: string;
  ipAddress?: string;
  device?: string;
  [key: string]: unknown;
}

export type AnyObject = Record<string, unknown>;
