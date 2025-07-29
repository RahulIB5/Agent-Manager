import { parse } from "csv-parse/sync"
import * as XLSX from "xlsx"

interface RawEntry {
  firstName: string
  phone: string
  notes: string
}

export function parseCSV(buffer: Buffer): RawEntry[] {
  const rows: RawEntry[] = parse(buffer.toString(), {
    columns: true,
    skip_empty_lines: true,
  })
  return rows
}

export function parseExcel(buffer: Buffer): RawEntry[] {
  const workbook = XLSX.read(buffer, { type: "buffer" })
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]
  return XLSX.utils.sheet_to_json(sheet) as RawEntry[]
}

export function distributeItems(data: RawEntry[], agents: any[]) {
  const totalAgents = agents.length
  const result: Record<string, RawEntry[]> = {}

  agents.forEach((agent) => {
    result[agent._id.toString()] = []
  })

  for (let i = 0; i < data.length; i++) {
    const agentIndex = i % totalAgents
    const agentId = agents[agentIndex]._id.toString()
    result[agentId].push({
      firstName: data[i].firstName,
      phone: data[i].phone,
      notes: data[i].notes,
    })
  }

  return result
}
