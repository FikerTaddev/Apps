import { UserAlreadyExistsError } from '../error/app.js';

/**
 * Wraps a database operation to catch specific PostgreSQL error codes 
 * and throw custom application errors.
 */
export const wrapDbOp = async <T>(operation: () => Promise<T>): Promise<T> => {
  try {
    return await operation();
  } catch (err: any) {
    // Handle specific PG codes (e.g., 23505 is Unique Violation)
    if (err && typeof err === 'object' && err.code === '23505') {
      throw new UserAlreadyExistsError();
    } 
    
    // Re-throw the original error if it's not a handled case 
    throw err; 
  }
};