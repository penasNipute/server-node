import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_errors/bad-request";



export async function checkIn(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>()
  .get('/attendees/:attendeeId/check-in',{
      schema:{
        summary:"Check in attendee for event",
      tags:["Check-ins"],
        params: z.object({
          attendeeId : z.coerce.number()
        }),
        response:{
          201: z.null()
        }
      }
    },
  async (req,res) => {

    const { attendeeId } = req.params

    const attendeeCheckIn = await prisma.checkIn.findUnique({
      where:{
        attendeeId,
      }
    })

    if(attendeeCheckIn){
      throw new BadRequest('Attendee already checked in!')
    }

    await prisma.checkIn.create({
      data: {
        attendeeId
      }
    })
  }
  )
  
}