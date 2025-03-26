export interface Parameter {
  name: string
  type: "string" | "number" | "boolean" | "select" | "path"
  description?: string
  required?: boolean
  defaultValue?: string | number | boolean
  placeholder?: string
  options?: string[] // For select type
}

export interface Command {
  name: string
  description: string
  category?: string
  parameters?: Parameter[]
}

export interface CommandParameters {
  [key: string]: string | number | boolean | undefined
}

export interface DragItem {
  index: number
  id: string
  type: string
}

