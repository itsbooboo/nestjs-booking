import z from 'zod'

export default z.object({
    MONGODB_URI:z.string().url(),
    JWT_SECRET:z.string(),
    JWT_EXPIRES:z.coerce.number(),
    ARGON2_SALT:z.string(),

});