"use client"

import { useState } from "react"
import { Search, Star, StarOff, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Command } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CommandPanelProps {
  commands: Record<string, Command[]>
  favorites: Command[]
  recentCommands: Command[]
  onSelectCommand: (command: Command) => void
  onToggleFavorite: (command: Command) => void
}

export default function CommandPanel({
  commands,
  favorites,
  recentCommands,
  onSelectCommand,
  onToggleFavorite,
}: CommandPanelProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const categories = Object.keys(commands)

  const filteredCommands = searchTerm
    ? Object.entries(commands).reduce(
        (acc, [category, cmds]) => {
          const filtered = cmds.filter(
            (cmd) =>
              cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              cmd.description.toLowerCase().includes(searchTerm.toLowerCase()),
          )

          if (filtered.length > 0) {
            acc[category] = filtered
          }

          return acc
        },
        {} as Record<string, Command[]>,
      )
    : commands

  const isFavorite = (command: Command) => {
    return favorites.some((fav) => fav.name === command.name)
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-lg font-medium">Commands</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search commands..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-1">
              <Star className="h-4 w-4" /> Favorites
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> Recent
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="max-h-[500px] overflow-y-auto mt-4">
            {Object.keys(filteredCommands).length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No commands found</p>
            ) : (
              Object.entries(filteredCommands).map(([category, cmds]) => (
                <div key={category} className="mb-4">
                  <h3 className="text-md font-medium mb-2 text-blue-600">{category}</h3>
                  <ul className="space-y-1">
                    {cmds.map((cmd) => (
                      <li
                        key={cmd.name}
                        className="flex items-center justify-between p-2 hover:bg-accent rounded-md cursor-pointer"
                        onClick={() => onSelectCommand(cmd)}
                      >
                        <div>
                          <p className="font-medium">{cmd.name}</p>
                          <p className="text-xs text-muted-foreground">{cmd.description}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onToggleFavorite(cmd)
                          }}
                          className="text-yellow-500 hover:text-yellow-600"
                        >
                          {isFavorite(cmd) ? <StarOff className="h-5 w-5" /> : <Star className="h-5 w-5" />}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="favorites" className="max-h-[500px] overflow-y-auto mt-4">
            {favorites.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No favorites yet</p>
            ) : (
              <ul className="space-y-1">
                {favorites.map((cmd) => (
                  <li
                    key={cmd.name}
                    className="flex items-center justify-between p-2 hover:bg-accent rounded-md cursor-pointer"
                    onClick={() => onSelectCommand(cmd)}
                  >
                    <div>
                      <p className="font-medium">{cmd.name}</p>
                      <p className="text-xs text-muted-foreground">{cmd.description}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onToggleFavorite(cmd)
                      }}
                      className="text-yellow-500 hover:text-yellow-600"
                    >
                      <StarOff className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>

          <TabsContent value="recent" className="max-h-[500px] overflow-y-auto mt-4">
            {recentCommands.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No recent commands</p>
            ) : (
              <ul className="space-y-1">
                {recentCommands.map((cmd) => (
                  <li
                    key={cmd.name}
                    className="flex items-center justify-between p-2 hover:bg-accent rounded-md cursor-pointer"
                    onClick={() => onSelectCommand(cmd)}
                  >
                    <div>
                      <p className="font-medium">{cmd.name}</p>
                      <p className="text-xs text-muted-foreground">{cmd.description}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onToggleFavorite(cmd)
                      }}
                      className="text-yellow-500 hover:text-yellow-600"
                    >
                      {isFavorite(cmd) ? <StarOff className="h-5 w-5" /> : <Star className="h-5 w-5" />}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

