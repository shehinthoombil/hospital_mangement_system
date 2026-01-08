const prisma = require("../prisma")

async function test() {
  const caseFields = Object.keys(
    prisma.case.fields ?? {}
  )
  console.log(caseFields)
}

test()
