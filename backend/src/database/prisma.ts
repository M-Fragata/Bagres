import { PrismaClient } from "@prisma/client"
import path from "node:path"

// Caminho absoluto para o banco de dados
const dbPath = path.resolve(process.cwd(), "src", "database", "dev.db")

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${dbPath}`
    }
  }
})
