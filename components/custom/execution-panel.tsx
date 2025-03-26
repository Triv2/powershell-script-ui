"use client"

import { Play } from "lucide-react"
import type { Command } from "@/lib/types"

interface ExecutionPanelProps {
  scriptCommands: Command[]
  onRunScript: () => void
}

export default function ExecutionPanel({ scriptCommands, onRunScript }: ExecutionPanelProps) {
  const scriptText = scriptCommands
    .map((cmd) => {
      const params = Object.entries(cmd.parameters || {})
        .filter(([_, value]) => value !== undefined && value !== "")
        .map(([key, value]) => `-${key} ${value}`)
        .join(" ")

      return `${cmd.name} ${params}`
    })
    .join("\n")

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={onRunScript}
            className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={scriptCommands.length === 0}
          >
            <Play className="h-4 w-4" />
            Run Script
          </button>
        </div>
        <div className="text-xs text-muted-foreground">
          {scriptCommands.length} command{scriptCommands.length !== 1 ? "s" : ""} in script
        </div>
      </div>

      {scriptCommands.length === 0 ? (
        <div className="bg-black/90 text-muted-foreground p-4 rounded-md min-h-[150px] flex items-center justify-center">
          <p>Add commands to preview your script</p>
        </div>
      ) : (
        <pre className="bg-black/90 text-blue-400 p-4 rounded-md overflow-auto min-h-[150px] max-h-[300px] font-mono text-sm">
          {scriptText}
        </pre>
      )}
    </div>
  )
}

