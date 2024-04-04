import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/check-in.ts
import z from "zod";
async function checkIn(app) {
  app.withTypeProvider().get(
    "/attendees/:attendeeId/check-in",
    {
      schema: {
        summary: "Check in attendee for event",
        tags: ["Check-ins"],
        params: z.object({
          attendeeId: z.coerce.number()
        }),
        response: {
          201: z.null()
        }
      }
    },
    async (req, res) => {
      const { attendeeId } = req.params;
      const attendeeCheckIn = await prisma.checkIn.findUnique({
        where: {
          attendeeId
        }
      });
      if (attendeeCheckIn) {
        throw new BadRequest("Attendee already checked in!");
      }
      await prisma.checkIn.create({
        data: {
          attendeeId
        }
      });
    }
  );
}

export {
  checkIn
};
