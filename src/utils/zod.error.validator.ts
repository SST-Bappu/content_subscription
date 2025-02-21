import { ZodError } from 'zod';

/**
 * Extracts Zod error messages and formats them for API responses.
 */
export function formatZodErrors(error: ZodError): string[] {
    return error.errors.map(err => `${err.path.join('.')} - ${err.message}`);
}