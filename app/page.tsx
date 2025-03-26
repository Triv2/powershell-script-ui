"use client"

import { useState, useEffect } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { powershellCommands } from "@/lib/powershell-commands"
import type { Command } from "@/lib/types"
import CommandPanel from "@/components/custom/command-panel"
import ExecutionPanel from "@/components/custom/execution-panel"
import ScriptAssemblyArea from "@/components/custom/script-assembly-area"
import ParameterPanel from "@/components/custom/parameter-panel"

export default function PowerShellScriptDesigner() {
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null)
  const [scriptCommands, setScriptCommands] = useState<Command[]>([])
  const [favorites, setFavorites] = useState<Command[]>([])
  const [recentCommands, setRecentCommands] = useState<Command[]>([])
  const [scriptOutput, setScriptOutput] = useState<string>("")
  const [scriptError, setScriptError] = useState<string>("")

  // Load favorites and recent commands from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    const storedRecent = localStorage.getItem("recentCommands")

    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }

    if (storedRecent) {
      setRecentCommands(JSON.parse(storedRecent))
    }
  }, [])

  // Save favorites and recent commands to localStorage when they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
    localStorage.setItem("recentCommands", JSON.stringify(recentCommands))
  }, [favorites, recentCommands])

  const handleCommandSelect = (command: Command) => {
    setSelectedCommand(command)

    // Add to recent commands if not already there
    if (!recentCommands.some((cmd) => cmd.name === command.name)) {
      const updatedRecent = [command, ...recentCommands].slice(0, 10)
      setRecentCommands(updatedRecent)
    }
  }

  const handleAddToScript = (command: Command) => {
    setScriptCommands([...scriptCommands, command])
  }

  const handleRemoveCommand = (index: number) => {
    const updatedCommands = [...scriptCommands]
    updatedCommands.splice(index, 1)
    setScriptCommands(updatedCommands)
  }

  const handleMoveCommand = (dragIndex: number, hoverIndex: number) => {
    const dragCommand = scriptCommands[dragIndex]
    const updatedCommands = [...scriptCommands]
    updatedCommands.splice(dragIndex, 1)
    updatedCommands.splice(hoverIndex, 0, dragCommand)
    setScriptCommands(updatedCommands)
  }

  const handleToggleFavorite = (command: Command) => {
    if (favorites.some((fav) => fav.name === command.name)) {
      setFavorites(favorites.filter((fav) => fav.name !== command.name))
    } else {
      setFavorites([...favorites, command])
    }
  }

  const handleRunScript = () => {
    // In a real application, this would send the script to a backend
    // For demo purposes, we'll just generate the script text
    const scriptText = scriptCommands
      .map((cmd) => {
        const params = Object.entries(cmd.parameters || {})
          .filter(([_, value]) => value !== undefined && value !== "")
          .map(([key, value]) => `-${key} ${value}`)
          .join(" ")

        return `${cmd.name} ${params}`
      })
      .join("\n")

    setScriptOutput(scriptText)
    setScriptError("")
  }

  const handleExportScript = () => {
    const scriptText = scriptCommands
      .map((cmd) => {
        const params = Object.entries(cmd.parameters || {})
          .filter(([_, value]) => value !== undefined && value !== "")
          .map(([key, value]) => `-${key} ${value}`)
          .join(" ")

        return `${cmd.name} ${params}`
      })
      .join("\n")

    const blob = new Blob([scriptText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "script.ps1"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopyToClipboard = () => {
    const scriptText = scriptCommands
      .map((cmd) => {
        const params = Object.entries(cmd.parameters || {})
          .filter(([_, value]) => value !== undefined && value !== "")
          .map(([key, value]) => `-${key} ${value}`)
          .join(" ")

        return `${cmd.name} ${params}`
      })
      .join("\n")

    navigator.clipboard.writeText(scriptText)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-4 max-w-7xl">
        <Card className="mb-6 border-0 shadow-sm">
          <CardHeader className="pb-2 pt-6 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold">PowerShell Script Designer</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 bg-blue-50 text-blue-800 text-sm">
              Build PowerShell scripts visually by selecting commands and configuring parameters.
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <CommandPanel
              commands={powershellCommands}
              favorites={favorites}
              recentCommands={recentCommands}
              onSelectCommand={handleCommandSelect}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>

          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-6">
              {/* Script Preview at the top */}
              <Card className="shadow-sm">
                <CardHeader className="pb-2 pt-4 px-4">
                  <CardTitle className="text-lg font-medium">Script Preview</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <ExecutionPanel scriptCommands={scriptCommands} onRunScript={handleRunScript} />
                </CardContent>
              </Card>

              {/* Script Assembly Area */}
              <Card className="shadow-sm">
                <CardHeader className="pb-2 pt-4 px-4">
                  <CardTitle className="text-lg font-medium">Script Assembly</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <ScriptAssemblyArea
                    commands={scriptCommands}
                    onRemoveCommand={handleRemoveCommand}
                    onMoveCommand={handleMoveCommand}
                  />
                </CardContent>
              </Card>

              {/* Parameter Panel */}
              {selectedCommand && (
                <Card className="shadow-sm">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <CardTitle className="text-lg font-medium">Configure Parameters</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ParameterPanel command={selectedCommand} onAddToScript={handleAddToScript} />
                  </CardContent>
                </Card>
              )}

              {/* Output and Export Tabs */}
              <Card className="shadow-sm">
                <CardHeader className="pb-2 pt-4 px-4">
                  <CardTitle className="text-lg font-medium">Output & Export</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <Tabs defaultValue="output" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="output">Execution Output</TabsTrigger>
                      <TabsTrigger value="export">Export Options</TabsTrigger>
                    </TabsList>

                    <TabsContent value="output" className="mt-4">
                      <div className="rounded-md p-4 bg-muted">
                        {scriptOutput ? (
                          <pre className="bg-black text-green-400 p-4 rounded overflow-auto max-h-60">
                            {scriptOutput}
                          </pre>
                        ) : (
                          <p className="text-muted-foreground">Run the script to see output</p>
                        )}

                        {scriptError && (
                          <div className="mt-4">
                            <h4 className="text-md font-medium text-destructive">Errors</h4>
                            <pre className="bg-black text-destructive p-4 rounded overflow-auto max-h-40">
                              {scriptError}
                            </pre>
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="export" className="mt-4">
                      <div className="rounded-md p-4 bg-muted">
                        <div className="flex flex-col gap-4">
                          <button
                            onClick={handleExportScript}
                            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
                          >
                            Save as .ps1 File
                          </button>

                          <button
                            onClick={handleCopyToClipboard}
                            className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90"
                          >
                            Copy to Clipboard
                          </button>

                          <div className="mt-2">
                            <label
                              htmlFor="import-script"
                              className="bg-muted-foreground text-background px-4 py-2 rounded-md hover:bg-muted-foreground/90 cursor-pointer inline-block"
                            >
                              Import Existing Script
                            </label>
                            <input
                              id="import-script"
                              type="file"
                              accept=".ps1"
                              className="hidden"
                              onChange={(e) => {
                                // In a real app, this would parse the script
                                // and convert it to commands
                                console.log("Import file:", e.target.files?.[0])
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

