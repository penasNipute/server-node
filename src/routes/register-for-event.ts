import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_errors/bad-request";

export async function registerForEvent (app:FastifyInstance) {

  app
  .withTypeProvider<ZodTypeProvider>().post('/events/:eventId/attendees', {
    schema:{
      summary:"Register an attendee  for an event",
      tags:["Attendees"],
      body: z.object({
        name: z.string().min(3),
        email: z.string().email(),
     }),

     params: z.object({
      eventId: z.string().uuid()
     }),

     response:{
      201:z.object({
        attendeeId: z.number()
      })
     }
    }
  } ,
   async (req,res) => {

    const { eventId } = req.params

    const { name, email } = req.body

    const attendeeFromEmail = await prisma.attendee.findUnique({
      where:{
        eventId_email:{
          email,
          eventId
        }
      }
    })

    if(attendeeFromEmail){
      throw new BadRequest('Attendee already registed for this event')
    }

    const [event, amountOfAttendeesForEvent] = await Promise.all([
      prisma.event.findUnique({
        where:{
          id:eventId
        }
      }),

      prisma.attendee.count({
        where:{
          eventId
        }
       })  
    ])


    if(event?.maximumAttendees && amountOfAttendeesForEvent >= event.maximumAttendees){
      throw new BadRequest('The maxinum number of attendes for this event has been reached.')
    }

    const attendee = await prisma.attendee.create({
      data:{
        name,
        email,
        eventId
      }
    })
    return res.status(202).send({attendeeId: attendee.id})
  })
}