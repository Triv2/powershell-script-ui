"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { Command, Parameter, CommandParameters } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"

interface ParameterPanelProps {
  command: Command
  onAddToScript: (command: Command & { parameters: CommandParameters }) => void
}

export default function ParameterPanel({ command, onAddToScript }: ParameterPanelProps) {
  const [parameters, setParameters] = useState<CommandParameters>(
    command.parameters?.reduce((acc, param) => {
      acc[param.name] = param.defaultValue !== undefined ? param.defaultValue : ""
      return acc
    }, {} as CommandParameters) || {},
  )

  const handleParameterChange = (name: string, value: string | number | boolean | undefined) => {
    setParameters({
      ...parameters,
      [name]: value,
    })
  }

  const handleAddToScript = () => {
    onAddToScript({
      ...command,
      //@ts-expect-error stupid imports from dnd erroring
      parameters,
    })
  }

  return (
    <div>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold">{command.name}</h2>
          <p className="text-muted-foreground text-sm">{command.description}</p>
        </div>
        <Button onClick={handleAddToScript} className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          Add to Script
        </Button>
      </div>

      <div className="space-y-4">
        {command.parameters?.map((param) => (
          <Card key={param.name} className="overflow-hidden">
            <CardContent className="p-3">
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={param.name} className="font-medium">
                    {param.name}
                    {param.required && <span className="text-destructive ml-1">*</span>}
                  </Label>
                  {param.description && <span className="text-xs text-muted-foreground">{param.description}</span>}
                </div>

                {renderParameterInput(param, parameters[param.name], (value) =>
                  handleParameterChange(param.name, value),
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {!command.parameters?.length && <p className="text-muted-foreground">This command has no parameters.</p>}
      </div>
    </div>
  )
}

function renderParameterInput(
  param: Parameter,
  value: string | number | boolean | undefined,
  onChange: (value: string | number | boolean | undefined) => void,
) {
  switch (param.type) {
    case "boolean":
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={param.name}
            checked={value === true}
            onCheckedChange={(checked) => onChange(checked === true)}
          />
          <Label htmlFor={param.name}>Enabled</Label>
        </div>
      )

    case "select":
      return (
        <select
          id={param.name}
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">Select an option</option>
          {param.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )

    case "path":
      return (
        <div className="flex gap-2">
          <Input
            id={param.name}
            type="text"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={param.placeholder || `Enter ${param.name}`}
          />
          <Button
            variant="outline"
            onClick={() => {
              // In a real app, this would open a file picker
              // For demo purposes, we'll just set a sample path
              onChange("C:\\path\\to\\file.txt")
            }}
          >
            Browse
          </Button>
        </div>
      )

    case "number":
      return (
        <Input
          id={param.name}
          type="number"
          value={value as number}
          onChange={(e) => {
            const numValue = e.target.value === "" ? undefined : Number(e.target.value)
            onChange(numValue)
          }}
          placeholder={param.placeholder || `Enter ${param.name}`}
        />
      )

    default:
      return (
        <Input
          id={param.name}
          type="text"
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          placeholder={param.placeholder || `Enter ${param.name}`}
        />
      )
  }
}

