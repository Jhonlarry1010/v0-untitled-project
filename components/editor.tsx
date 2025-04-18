"use client"

import type React from "react"
import { useState } from "react"
import { List, ListOrdered, CheckSquare, ImageIcon, Code, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

type BlockType = "paragraph" | "heading" | "todo" | "list" | "ordered-list" | "image" | "code"

interface Block {
  id: string
  type: BlockType | string
  content: string
  level?: number
  checked?: boolean
  url?: string
}

interface EditorProps {
  defaultContent?: Block[]
  readOnly?: boolean
}

export function Editor({ defaultContent = [], readOnly = false }: EditorProps) {
  const [blocks, setBlocks] = useState<Block[]>(
    defaultContent.length > 0 ? defaultContent : [{ id: "1", type: "paragraph", content: "" }],
  )
  const [activeBlock, setActiveBlock] = useState<string | null>(null)

  const addBlock = (index: number, type: BlockType = "paragraph") => {
    if (readOnly) return

    const newId = Date.now().toString()
    const newBlocks = [...blocks]
    newBlocks.splice(index + 1, 0, { id: newId, type, content: "" })
    setBlocks(newBlocks)
    setActiveBlock(newId)

    // Focus the new block after render
    setTimeout(() => {
      const element = document.getElementById(`block-${newId}`)
      if (element) {
        element.focus()
      }
    }, 0)
  }

  const updateBlock = (id: string, updates: Partial<Block>) => {
    if (readOnly) return
    setBlocks(blocks.map((block) => (block.id === id ? { ...block, ...updates } : block)))
  }

  const deleteBlock = (id: string) => {
    if (readOnly) return
    if (blocks.length > 1) {
      setBlocks(blocks.filter((block) => block.id !== id))
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, block: Block, index: number) => {
    if (readOnly) return

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      addBlock(index)
    } else if (e.key === "Backspace" && block.content === "") {
      e.preventDefault()
      deleteBlock(block.id)

      // Focus previous block
      if (index > 0) {
        const prevBlockId = blocks[index - 1].id
        setActiveBlock(prevBlockId)
        setTimeout(() => {
          const element = document.getElementById(`block-${prevBlockId}`)
          if (element) {
            element.focus()
          }
        }, 0)
      }
    }
  }

  const renderBlock = (block: Block, index: number) => {
    const isActive = activeBlock === block.id && !readOnly

    switch (block.type) {
      case "heading":
        const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements
        return (
          <div className="relative group">
            {isActive && (
              <div className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setActiveBlock(block.id)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
            <HeadingTag
              id={`block-${block.id}`}
              contentEditable={!readOnly}
              suppressContentEditableWarning
              className={cn(
                "outline-none focus:outline-none focus:ring-0 border-0 py-1",
                block.level === 1 ? "text-3xl font-bold" : "",
                block.level === 2 ? "text-2xl font-semibold" : "",
                block.level === 3 ? "text-xl font-medium" : "",
                readOnly ? "pointer-events-none" : "",
              )}
              onFocus={() => !readOnly && setActiveBlock(block.id)}
              onBlur={() => !readOnly && setActiveBlock(null)}
              onKeyDown={(e) => handleKeyDown(e, block, index)}
              onInput={(e) => updateBlock(block.id, { content: e.currentTarget.textContent || "" })}
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          </div>
        )

      case "todo":
        return (
          <div className="relative group flex items-start gap-2 py-1">
            {isActive && (
              <div className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setActiveBlock(block.id)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
            <Checkbox
              checked={block.checked}
              onCheckedChange={
                readOnly ? undefined : (checked) => updateBlock(block.id, { checked: checked as boolean })
              }
              className="mt-1"
              disabled={readOnly}
            />
            <div
              id={`block-${block.id}`}
              contentEditable={!readOnly}
              suppressContentEditableWarning
              className={cn(
                "outline-none focus:outline-none focus:ring-0 border-0 flex-1",
                block.checked ? "line-through text-muted-foreground" : "",
                readOnly ? "pointer-events-none" : "",
              )}
              onFocus={() => !readOnly && setActiveBlock(block.id)}
              onBlur={() => !readOnly && setActiveBlock(null)}
              onKeyDown={(e) => handleKeyDown(e, block, index)}
              onInput={(e) => updateBlock(block.id, { content: e.currentTarget.textContent || "" })}
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          </div>
        )

      case "list":
        return (
          <div className="relative group flex items-start gap-2 py-1">
            {isActive && (
              <div className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setActiveBlock(block.id)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
            <div className="mt-1 ml-1">•</div>
            <div
              id={`block-${block.id}`}
              contentEditable={!readOnly}
              suppressContentEditableWarning
              className={cn(
                "outline-none focus:outline-none focus:ring-0 border-0 flex-1",
                readOnly ? "pointer-events-none" : "",
              )}
              onFocus={() => !readOnly && setActiveBlock(block.id)}
              onBlur={() => !readOnly && setActiveBlock(null)}
              onKeyDown={(e) => handleKeyDown(e, block, index)}
              onInput={(e) => updateBlock(block.id, { content: e.currentTarget.textContent || "" })}
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          </div>
        )

      case "ordered-list":
        return (
          <div className="relative group flex items-start gap-2 py-1">
            {isActive && (
              <div className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setActiveBlock(block.id)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
            <div className="mt-1 ml-1 min-w-[1rem] text-right">{index + 1}.</div>
            <div
              id={`block-${block.id}`}
              contentEditable={!readOnly}
              suppressContentEditableWarning
              className={cn(
                "outline-none focus:outline-none focus:ring-0 border-0 flex-1",
                readOnly ? "pointer-events-none" : "",
              )}
              onFocus={() => !readOnly && setActiveBlock(block.id)}
              onBlur={() => !readOnly && setActiveBlock(null)}
              onKeyDown={(e) => handleKeyDown(e, block, index)}
              onInput={(e) => updateBlock(block.id, { content: e.currentTarget.textContent || "" })}
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          </div>
        )

      case "code":
        return (
          <div className="relative group py-1">
            {isActive && (
              <div className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setActiveBlock(block.id)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
            <pre className="bg-muted p-3 rounded-md">
              <code
                id={`block-${block.id}`}
                contentEditable={!readOnly}
                suppressContentEditableWarning
                className={cn(
                  "outline-none focus:outline-none focus:ring-0 border-0 font-mono text-sm",
                  readOnly ? "pointer-events-none" : "",
                )}
                onFocus={() => !readOnly && setActiveBlock(block.id)}
                onBlur={() => !readOnly && setActiveBlock(null)}
                onKeyDown={(e) => handleKeyDown(e, block, index)}
                onInput={(e) => updateBlock(block.id, { content: e.currentTarget.textContent || "" })}
                dangerouslySetInnerHTML={{ __html: block.content }}
              />
            </pre>
          </div>
        )

      case "image":
        return (
          <div className="relative group py-2">
            {isActive && (
              <div className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setActiveBlock(block.id)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
            {block.url ? (
              <div className="relative">
                <img
                  src={block.url || "/placeholder.svg"}
                  alt={block.content || "Image"}
                  className="max-w-full rounded-md"
                />
                {!readOnly && (
                  <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveBlock(block.id)} />
                )}
              </div>
            ) : (
              !readOnly && (
                <div
                  className="border-2 border-dashed border-muted-foreground/20 rounded-md p-8 text-center cursor-pointer"
                  onClick={() => setActiveBlock(block.id)}
                >
                  <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Click to add an image</p>
                </div>
              )
            )}
            {isActive && (
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Enter image URL..."
                  value={block.url || ""}
                  onChange={(e) => updateBlock(block.id, { url: e.target.value })}
                  className="w-full p-2 text-sm border rounded-md"
                />
                <input
                  type="text"
                  placeholder="Enter caption..."
                  value={block.content || ""}
                  onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                  className="w-full p-2 text-sm border rounded-md mt-2"
                />
              </div>
            )}
          </div>
        )

      default: // paragraph
        return (
          <div className="relative group">
            {isActive && (
              <div className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setActiveBlock(block.id)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
            <p
              id={`block-${block.id}`}
              contentEditable={!readOnly}
              suppressContentEditableWarning
              className={cn(
                "outline-none focus:outline-none focus:ring-0 border-0 py-1",
                readOnly ? "pointer-events-none" : "",
              )}
              onFocus={() => !readOnly && setActiveBlock(block.id)}
              onBlur={() => !readOnly && setActiveBlock(null)}
              onKeyDown={(e) => handleKeyDown(e, block, index)}
              onInput={(e) => updateBlock(block.id, { content: e.currentTarget.textContent || "" })}
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          </div>
        )
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {blocks.map((block, index) => (
        <div key={block.id} className="relative">
          {renderBlock(block, index)}

          {activeBlock === block.id && !readOnly && (
            <div className="absolute left-0 -ml-10 top-1/2 -translate-y-1/2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Plus className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56" align="start">
                  <div className="grid gap-1">
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={() => updateBlock(block.id, { type: "paragraph" })}
                    >
                      Text
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={() => updateBlock(block.id, { type: "heading", level: 1 })}
                    >
                      Heading 1
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={() => updateBlock(block.id, { type: "heading", level: 2 })}
                    >
                      Heading 2
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={() => updateBlock(block.id, { type: "heading", level: 3 })}
                    >
                      Heading 3
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={() => updateBlock(block.id, { type: "todo", checked: false })}
                    >
                      <CheckSquare className="mr-2 h-4 w-4" />
                      To-do
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={() => updateBlock(block.id, { type: "list" })}
                    >
                      <List className="mr-2 h-4 w-4" />
                      Bulleted list
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={() => updateBlock(block.id, { type: "ordered-list" })}
                    >
                      <ListOrdered className="mr-2 h-4 w-4" />
                      Numbered list
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={() => updateBlock(block.id, { type: "code" })}
                    >
                      <Code className="mr-2 h-4 w-4" />
                      Code
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={() => updateBlock(block.id, { type: "image", url: "" })}
                    >
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Image
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      ))}
      <div className="h-32"></div> {/* Extra space at the bottom */}
    </div>
  )
}
