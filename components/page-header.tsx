"use client"

import { useState } from "react"
import { MoreHorizontal, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { ShareDialog } from "@/components/share-dialog"

interface PageHeaderProps {
  title: string
  emoji?: string
  lastEdited?: string
}

export function PageHeader({ title, emoji, lastEdited }: PageHeaderProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [pageTitle, setPageTitle] = useState(title)

  return (
    <div className="border-b sticky top-0 bg-background z-10">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          {emoji && <div className="text-2xl">{emoji}</div>}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
                className="text-xl font-bold bg-transparent border-none focus:outline-none focus:ring-0 p-0"
              />
              <Button variant="ghost" size="icon" onClick={() => setIsFavorite(!isFavorite)} className="h-6 w-6">
                <Star className={`h-4 w-4 ${isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`} />
              </Button>
            </div>
            {lastEdited && <span className="text-xs text-muted-foreground">{lastEdited}</span>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Share
              </Button>
            </DialogTrigger>
            <ShareDialog title={pageTitle} />
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Copy Link</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
