/**
 * Public routes that do not require authentication
 */
export const publicRoutes = ["/"]

/**
 * Auth routes that make authentication happen
 */
export const authRoutes = ["/auth/login", "/auth/register"]

/**
 * Protected routes that require authentication
 */
export const privateRoutes = ["/profile"]

/**
 * API routes that require authentication
 */
export const apiAuthPrefix = "/api/auth"

export const DEFAULT_LOGIN_REDIRECT = "/profile"
