import { decode, JwtPayload } from 'jsonwebtoken';

/**
 * Convenience function to extract the user ID from the JWT.
 * @param {string} jwt - the jwt to use.
 * @returns {string | undefined} returns the user ID or undefined
 */
export default function getUserIdFromJwt(jwt: string): string | undefined {
  const decoded: JwtPayload = decode(jwt) as JwtPayload;

  return decoded.sub;
}
