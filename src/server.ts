import fastify from "fastify"
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const app = fastify()

const prisma = new PrismaClient({
  log: ['query']
})

app.post('/events', async (req,res) => {
  const createEventSchena =z.object({
    title: z.string().min(4),
    details: z.string().nullable(),
    maximumAttendees: z.number().int().positive().nullable()
  })

  const data = createEventSchena.parse(req.body)


  const event = await prisma.event.create({
    data: {
      title: data.title,
      details: data.details,
      maximumAttendees:data.maximumAttendees,
      slug: new Date().toISOString()
    }
  })

  // console.log(event)
  return res.status(201).send({eventId: event.id})
})

app.get('/events', async (req,res)=>{


  const allEvents= await prisma.event.findMany()
  return res.status(200).send(allEvents)
})

app.listen({port:3333}).then(()=>{
  console.log('HTTP server running')
})