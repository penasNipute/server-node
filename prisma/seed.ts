import { prisma } from '../src/lib/prisma'

async function seed() {
    await prisma.event.create({
      data:{
        id:"f992db0a-776f-4cce-8835-62285e6f3611",
        title:"Novo evento",
        details:"evento",
        slug:"novo-evento",
        maximumAttendees: 120
      }
    })


  
}

seed().then(() => {
  console.log('Database seeded!')
  prisma.$disconnect()
})