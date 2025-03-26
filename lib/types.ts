export interface Parameter {
  name: string
  type: "string" | "number" | "boolean" | "select" | "path"
  description?: string
  required?: boolean
  defaultValue?: any
  placeholder?: string
  options?: string[] // For select type
}

export interface Command {
  name: string
  description: string
  category?: string
  parameters?: Parameter[]
}

