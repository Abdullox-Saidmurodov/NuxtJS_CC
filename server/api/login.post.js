import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import validator from 'validator'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)

        if(!validator.isEmail(body.email)) {
            throw createError({
                statusCode: 400,
                message: 'Invalid email, plase change.',
            })
        }

        if (!validator.isStrongPassword(body.password, {
            minLength: 8, 
            minLowercase: 0, 
            minUppercase: 0, 
            minNumbers: 0, 
            minSymbols: 0,
        })) {
            throw createError({
                statusCode: 400,
                message: 'Password i not minimum 8 characters, please change.',
            })
        }
    
        // Sends to database
        const user = await prisma.User.findUnique({
            where: {
                email: body.email,
            }
        })

        const isValid = await bcrypt.compare(body.password, user.password)

        console.log("IS VALID:")
        console.log(isValid)

        if(!isValid) {
            throw createError({
                statusCode: 409,
                message: 'Username or password is invalid.',
            })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)

        setCookie(event, 'NoteNestJWT', token)

        return { data: 'success!' }
    } catch (error) {
        if(error.code == 'P2002') {
            throw createError({
                statusCode: 409,
                message: 'An email with this address already exist.',
            })
        }

        throw error
    }
})

// GET
// POST
// PATCH
// PUT
// DELETE