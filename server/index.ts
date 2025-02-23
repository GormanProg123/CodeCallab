import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const app = express()
const prisma = new PrismaClient()
const port = 5000

app.use(cors())
app.use(express.json())

app.get('/api/code', async (req, res) => {
  try {
    const code = await prisma.code.findFirst()
    res.json(code)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error loading code')
  }
})

app.post('/api/code', async (req, res) => {
  const { code } = req.body
  try {
    const newCode = await prisma.code.upsert({
      where: { id: 1 },
      update: { code },
      create: { code },
    })
    res.status(201).json(newCode)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error saving code')
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
