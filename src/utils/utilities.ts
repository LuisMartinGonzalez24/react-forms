
export const regularExpressions = {
    user: /^[a-zA-Z0-9_-]{4,16}$/, // Letters, numbers, hyphen and underscore
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters and spaces, can have accents
    password: /^.{4,12}$/, // 4 a 12 digits
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phone: /^\d{7,14}$/ // 7 to 14 numbers
}