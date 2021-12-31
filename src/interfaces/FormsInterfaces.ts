//! The form names for the inputs must be the same properties of the form state to work correctly.

export type FormNames =
    | 'name'
    | 'user'
    | 'email'
    | 'phone'
    | 'password'
    | 'confirmPassword';

export interface FormState {
    name: { value: string, status: boolean | null, };
    user: { value: string, status: boolean | null, };
    email: { value: string, status: boolean | null, };
    phone: { value: string, status: boolean | null, };
    password: { value: string, status: boolean | null, };
    confirmPassword: { value: string, status: boolean | null, };
}