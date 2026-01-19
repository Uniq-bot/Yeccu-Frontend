
/**
 * Checks whether a JWT stored in localStorage is expired
 * @returns {boolean} true = expired / invalid, false = valid
*/
import { useAuthStore } from "./auth";


export default isTokenExpired;