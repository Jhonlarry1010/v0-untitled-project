"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Search,
  Settings,
  Clock,
  Trash,
  FileText,
  Database,
  MoreHorizontal,
  Home,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Sidebar() {
  const pathname = usePathname()
  const [workspaceOpen, setWorkspaceOpen] = useState(true)
  const [pagesOpen, setPagesOpen] = useState(true)

  return (
    <div className="w-64 border-r h-screen flex flex-col bg-background">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>AT</AvatarFallback>
            </Avatar>
            <span className="font-medium">Alex&apos;s Workspace</span>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="pl-8 h-9" />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="px-2 py-1">
          <div className="flex items-center justify-between py-1 px-2 rounded hover:bg-accent">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Recent</span>
            </div>
          </div>

          <div className="flex items-center justify-between py-1 px-2 rounded hover:bg-accent">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Settings & members</span>
            </div>
          </div>

          <div className="flex items-center justify-between py-1 px-2 rounded hover:bg-accent">
            <div className="flex items-center gap-2">
              <Trash className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Trash</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="px-2">
            <button
              onClick={() => setWorkspaceOpen(!workspaceOpen)}
              className="flex items-center justify-between w-full py-1 px-2 rounded hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                {workspaceOpen ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-sm font-medium">Workspace</span>
              </div>
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <Plus className="h-3 w-3" />
              </Button>
            </button>

            {workspaceOpen && (
              <div className="ml-2 mt-1">
                <Link href="/workspace">
                  <div
                    className={cn(
                      "flex items-center gap-2 py-1 px-2 rounded text-sm",
                      pathname === "/workspace" ? "bg-accent" : "hover:bg-accent",
                    )}
                  >
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <span>Getting Started</span>
                  </div>
                </Link>

                <Link href="/workspace/database">
                  <div
                    className={cn(
                      "flex items-center gap-2 py-1 px-2 rounded text-sm",
                      pathname === "/workspace/database" ? "bg-accent" : "hover:bg-accent",
                    )}
                  >
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <span>Task Database</span>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <div className="px-2 mt-2">
            <button
              onClick={() => setPagesOpen(!pagesOpen)}
              className="flex items-center justify-between w-full py-1 px-2 rounded hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                {pagesOpen ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-sm font-medium">Pages</span>
              </div>
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <Plus className="h-3 w-3" />
              </Button>
            </button>

            {pagesOpen && (
              <div className="ml-2 mt-1">
                <Link href="/workspace/page-1">
                  <div
                    className={cn(
                      "flex items-center gap-2 py-1 px-2 rounded text-sm",
                      pathname === "/workspace/page-1" ? "bg-accent" : "hover:bg-accent",
                    )}
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>Project Roadmap</span>
                  </div>
                </Link>

                <Link href="/workspace/page-2">
                  <div
                    className={cn(
                      "flex items-center gap-2 py-1 px-2 rounded text-sm",
                      pathname === "/workspace/page-2" ? "bg-accent" : "hover:bg-accent",
                    )}
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>Meeting Notes</span>
                  </div>
                </Link>

                <Link href="/workspace/page-3">
                  <div
                    className={cn(
                      "flex items-center gap-2 py-1 px-2 rounded text-sm",
                      pathname === "/workspace/page-3" ? "bg-accent" : "hover:bg-accent",
                    )}
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>Ideas & Inspiration</span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>AT</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Alex Turner</span>
            <span className="text-xs text-muted-foreground">alex@example.com</span>
          </div>
        </div>
      </div>
    </div>
  )
}
