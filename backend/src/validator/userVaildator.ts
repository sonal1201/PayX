import {z} from "zod"

export const userValidator = z.object({
    firstname: z.string(),
    lastname: z.string(),
    username: z.string().min(4,"username must be greater than 4 char"),
    gmail: z.string().email().optional(),
    password: z.string().min(8,"password must be greater than 6")
})

export type  User = z.infer<typeof userValidator>