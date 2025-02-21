/**
 * Defines the payload required for registration.
 */
export interface RegistrationRequestBody {
    email: string;
    name: string;
    password: string;
}


/**
 * Defines the payload required for login.
 */
export interface LoginRequestBody {
    email: string;
    password: string;
}