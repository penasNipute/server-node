import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/get-events.ts
import z from "zod";
async function getEvent(app) {
  app.withTypeProvider().get("/events/:eventId", {
    schema: {
      summary: "get an event",
      tags: ["Events"],
      params: z.object({
        eventId: z.string().uuid()
      }),
      response: {
        200: z.object({ event: z.object({
          "id": z.string().uuid(),
          "title": z.string(),
          "slug": z.string(),
          "details": z.string().nullable(),
          "maximumAttendees": z.number().int().nullable(),
          "attendeesAmount": z.number().int()
        }) })
      }
    }
  }, async (req, res) => {
    const { eventId } = req.params;
    const event = await prisma.event.findUnique({
      select: {
        id: true,
        title: true,
        slug: true,
        details: true,
        maximumAttendees: true,
        _count: {
          select: {
            attendees: true
          }
        }
      },
      where: {
        id: eventId
      }
    });
    if (!event) {
      throw new BadRequest("Event not found");
    }
    return res.status(200).send({
      "id": event.id,
      "title": event.title,
      "slug": event.slug,
      "details": event.details,
      "maximumAttendees": event.maximumAttendees,
      "attendeesAmount": event._count.attendees
    });
  });
}

export {
  getEvent
};
