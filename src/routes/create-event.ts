import { ZodTypeProvider } from "fastify-type-provider-zod"
import z from "zod"
import { slugify } from "../utils/generate-slug"
import { prisma } from "../lib/prisma"
import { FastifyInstance } from "fastify"
import { BadRequest } from "./_errors/bad-request"

export async function createEvent(app: FastifyInstance ){

  app
  .withTypeProvider<ZodTypeProvider>()
  .post('/events',{
    schema:{
      summary:"Create an event",
      tags:["Events"],
      body: z.object({
            title: z.string().min(4),
            details: z.string().nullable(),
            maximumAttendees: z.number().int().positive().nullable()
        }),
        response:{
          201: z.object({
            eventId: z.string().uuid()
          })
        }
      
    }
  }, async (req,res) => {
    

    const {
      title,
      details,
      maximumAttendees
    } = req.body

    const slug = slugify(title)

    const eventWithSameSlug = await prisma.event.findUnique({
      where:{slug}
    })

    if(eventWithSameSlug){
      throw new BadRequest('Another event with same slug already exists!')
    }
      
    const event = await prisma.event.create({
      data: {
        title,
        details,
        maximumAttendees,
        slug
      }
    })

    // console.log(event)
    return res.status(201).send({eventId: event.id})
  })
}