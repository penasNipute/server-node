import {
  registerForEvent
} from "./chunk-UT6BWY5B.mjs";
import {
  errorHandler
} from "./chunk-U4GMCLT4.mjs";
import {
  checkIn
} from "./chunk-U4AILBXX.mjs";
import {
  createEvent
} from "./chunk-KWWDRMSB.mjs";
import "./chunk-SPS5YSKY.mjs";
import {
  getAttendeeBadge
} from "./chunk-KQCAFQ4T.mjs";
import {
  getEventAttendees
} from "./chunk-ADWMOZV7.mjs";
import {
  getEvent
} from "./chunk-4NMFO2QS.mjs";
import "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
var app = fastify();
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description: "Especificacoes da API para o back-end da aplicacao pass.in construida durante o NLW Unite da Rocketseat",
      version: "1.0.0",
      contact: {
        email: "penaswild@gmail.com",
        name: "Penas Nipute"
      }
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifyCors, {
  origin: "*"
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.get("/events", async (req, res) => {
  const allEvents = await prisma.event.findMany();
  return res.status(200).send(allEvents);
});
app.setErrorHandler(errorHandler);
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running");
});
