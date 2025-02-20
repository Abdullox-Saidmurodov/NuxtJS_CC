// /api/user POST

// Hashing passwords
// - Prevents PW from being stored in plaintext
// - mypassword123 hgvjhgvhghvhghlkjbnnb;k.,kbjnknfjghvjbghjn,n

// Salts
// - salt - string of random characters
// - Typically added to the beginning of a user's PW
// - mypassword123 becomes x#fSA#Amypassword123
// - Used to prevent hackers from using precomputed hash tables to crack a PW
// - Each user gets their own salt so even if two users have the same PW their password's look completely different



import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    // console.log("HELLO")
    // console.log(body)

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(body.password, salt)

    // Sends to database
    const user = await prisma.User.create({
        data: {
            email: body.email,
            password: passwordHash,
            salt: salt,
        }
    })
    return { data: 'success!' }
})

// GET
// POST
// PATCH
// PUT
// DELETE