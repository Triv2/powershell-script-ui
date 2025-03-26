"use client"

import { useRef } from "react"
//@ts-expect-error stupid imports from dnd erroring
import { useDrag, useDrop } from "react-dnd"
import { Trash2, GripVertical } from "lucide-react"
import type { Command, CommandParameters, DragItem } from "@/lib/types"

interface ScriptAssemblyAreaProps {
  commands: Array<Command & { parameters: CommandParameters }>
  onRemoveCommand: (index: number) => void
  onMoveCommand: (dragIndex: number, hoverIndex: number) => void
}

export default function ScriptAssemblyArea({ commands, onRemoveCommand, onMoveCommand }: ScriptAssemblyAreaProps) {
  return (
    <div>
      {commands.length === 0 ? (
        <div className="border-2 border-dashed rounded-md p-8 text-center text-muted-foreground bg-muted/30">
          <p>Add commands to build your script</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {commands.map((command, index) => (
            <CommandItem
              key={`${command.name}-${index}`}
              index={index}
              command={command}
              onRemoveCommand={onRemoveCommand}
              onMoveCommand={onMoveCommand}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

interface CommandItemProps {
  index: number
  command: Command & { parameters: CommandParameters }
  onRemoveCommand: (index: number) => void
  onMoveCommand: (dragIndex: number, hoverIndex: number) => void
}

function CommandItem({ index, command, onRemoveCommand, onMoveCommand }: CommandItemProps) {
  const ref = useRef<HTMLLIElement>(null)

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: "COMMAND",
    item: { index, id: `${command.name}-${index}`, type: "COMMAND" },
    //@ts-expect-error stupid imports from dnd erroring
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: "COMMAND",
    //@ts-expect-error stupid imports from dnd erroring
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      onMoveCommand(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  drag(drop(ref))

  return (
    <li
      ref={dragPreview}
      className={`flex items-center gap-2 p-3 rounded-md bg-background ${isDragging ? "opacity-50" : ""}`}
    >
      {/*@ts-expect-error stupid imports from dnd erroring */}
      <div ref={ref} className="cursor-move">
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </div>

      <div className="flex-1">
        <p className="font-medium">{command.name}</p>
        <div className="text-sm text-muted-foreground">
          {Object.entries(command.parameters)
            .filter(([, value]) => value !== undefined && value !== "")
            .map(([key, value]) => (
              <span key={key} className="mr-2">
                -{key} {value}
              </span>
            ))}
        </div>
      </div>

      <button onClick={() => onRemoveCommand(index)} className="text-destructive hover:text-destructive/80">
        <Trash2 className="h-5 w-5" />
      </button>
    </li>
  )
}

