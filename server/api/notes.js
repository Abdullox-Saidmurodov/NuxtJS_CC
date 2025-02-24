// /api/notes return all the notes

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    try {
        const notes = await prisma.Note.findMany()

        return notes
    } catch(error) {
        console.log(error)
    }
})