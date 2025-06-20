import z from 'zod'

export default z.object({
    MONGODB_URI:z.string().url(),
    PORT: z.coerce.number().default(3000)
});