import { UserAlreadyExistsError } from '../error/app.js';

export const wrapDbOp = async (operation) => {
  try {
    return await operation();
  } catch (err) {
    // Handle specific PG codes
    if (err.code === '23505') {
      throw new UserAlreadyExistsError();
    } 
    throw err; 
  }
};

