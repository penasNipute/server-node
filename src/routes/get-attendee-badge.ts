import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function getAttendeeBadge(app: FastifyInstance) {  
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/attendees/:attendeeId/badge', {
      schema:{
        params: z.object({
          attendeeId: z.coerce.number().int(),
        }),
        response:{
          200: z.object({
            badge: z.object({
              name: z.string(),
              email: z.string().email(),
              eventTitle: z.string(),
              checkInURL: z.string().url()
            })
          })
        }
      }
    },
    async(req,res) => {

      const { attendeeId } = req.params

      const attendee = await prisma.attendee.findUnique({
        select:{
          name:true,
          email:true,
          event:{
            select:{
              title:true
            }
          }
        },
        where:{
          id: attendeeId,
        }
      })

      if(!attendee){
        throw new Error('Attendee not found')
      }

      const baseURL = `${req.protocol}://${req.hostname}`

      const checkInURL = new URL(`/attendee/${attendeeId}/check-in`, baseURL)

      return res.status(200).send({ 
        badge: {
          name:attendee.name,
          email: attendee.email,
          eventTitle: attendee.event.title,
          checkInURL: checkInURL.toString( )
        }
       })
    })
  
}