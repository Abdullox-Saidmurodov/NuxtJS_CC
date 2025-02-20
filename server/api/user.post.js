// /api/user POST
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    // console.log("HELLO")
    console.log(body)
    const user = await prisma.User.create({
        data: {
            email: body.email,
            password: body.password,
        }
    })
    console.log(user)
    // try {
    //     await prisma.user.create({
    //         data: {
    //             email: body.email,
    //             password: body.password,
    //         }
    //     })
    // } catch (err) {
    //     console.error(err)
    // }
    return { data: 'success!' }
})

// GET
// POST
// PATCH
// PUT
// DELETE