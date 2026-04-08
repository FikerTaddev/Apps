import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

export const env = z.object({
    PORT: z.string().default('3200'),
    JWT_SECRET: z.string().default('secret'),
    DB_HOST: z.string().default('')
}).parse(process.env)