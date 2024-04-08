import fastify from "fastify"

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";

import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod"
import { createEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-events";
import { getAttendeeBadge } from "./routes/get-attendee-badge";
import { checkIn } from "./routes/check-in";
import { getEventAttendees } from "./routes/get-event-attendees";
import { errorHandler } from "./error-handler";


const app = fastify()

app.register(fastifySwagger, {
  swagger:{
    consumes:['application/json'],
    produces:['application/json'],
    info:{
      title:"pass.in",
      description:"Especificacoes da API para o back-end da aplicacao pass.in construida durante o NLW Unite da Rocketseat",
      version:"1.0.0",
      contact:{
        email:"penaswild@gmail.com",
        name:"Penas Nipute"
      }
    }    
  },
  transform:jsonSchemaTransform
})

app.register(fastifyCors, {
  origin:'*'
})

app.register(fastifySwaggerUi, {
  routePrefix:"/docs"
})

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);



app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)
app.register(checkIn)
app.register(getEventAttendees)


app.setErrorHandler(errorHandler)

app.listen({port:3333, host:'0.0.0.0'}).then(()=>{
  console.log('HTTP server running')
})