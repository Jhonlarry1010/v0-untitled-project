"use client"

import { useState } from "react"
import { ChevronDown, Filter, Plus, SortAsc, SortDesc, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface Column {
  id: string
  title: string
  type: string
}

interface Row {
  id: string
  [key: string]: any
}

interface SelectOption {
  value: string
  color: string
}

interface DatabaseProps {
  data: {
    columns: Column[]
    rows: Row[]
    statusOptions?: SelectOption[]
    priorityOptions?: SelectOption[]
  }
}

export function Database({ data }: DatabaseProps) {
  const [columns, setColumns] = useState(data.columns)
  const [rows, setRows] = useState(data.rows)
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [editingCell, setEditingCell] = useState<{ rowId: string; columnId: string } | null>(null)

  const handleSort = (columnId: string) => {
    if (sortColumn === columnId) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(columnId)
      setSortDirection("asc")
    }

    const sortedRows = [...rows].sort((a, b) => {
      const aValue = a[columnId]
      const bValue = b[columnId]

      if (aValue === bValue) return 0

      const direction = sortDirection === "asc" ? 1 : -1

      if (aValue === null || aValue === undefined) return 1 * direction
      if (bValue === null || bValue === undefined) return -1 * direction

      return aValue > bValue ? 1 * direction : -1 * direction
    })

    setRows(sortedRows)
  }

  const addRow = () => {
    const newRow: Row = { id: Date.now().toString() }
    columns.forEach((column) => {
      if (column.type === "select") {
        newRow[column.id] = ""
      } else if (column.type === "date") {
        newRow[column.id] = ""
      } else if (column.type === "person") {
        newRow[column.id] = ""
      } else {
        newRow[column.id] = ""
      }
    })
    setRows([...rows, newRow])
  }

  const updateCell = (rowId: string, columnId: string, value: any) => {
    setRows(rows.map((row) => (row.id === rowId ? { ...row, [columnId]: value } : row)))
  }

  const getStatusColor = (status: string) => {
    const option = data.statusOptions?.find((opt) => opt.value === status)
    return option?.color || "gray"
  }

  const getPriorityColor = (priority: string) => {
    const option = data.priorityOptions?.find((opt) => opt.value === priority)
    return option?.color || "gray"
  }

  const renderCell = (row: Row, column: Column) => {
    const isEditing = editingCell?.rowId === row.id && editingCell?.columnId === column.id

    switch (column.type) {
      case "text":
        return isEditing ? (
          <Input
            value={row[column.id] || ""}
            onChange={(e) => updateCell(row.id, column.id, e.target.value)}
            onBlur={() => setEditingCell(null)}
            autoFocus
            className="h-8"
          />
        ) : (
          <div
            className="px-2 py-1 cursor-pointer"
            onClick={() => setEditingCell({ rowId: row.id, columnId: column.id })}
          >
            {row[column.id] || ""}
          </div>
        )

      case "select":
        if (column.id === "status") {
          return (
            <div className="px-2 py-1">
              <Select value={row[column.id] || ""} onValueChange={(value) => updateCell(row.id, column.id, value)}>
                <SelectTrigger className="h-7 w-32">
                  <SelectValue>
                    {row[column.id] ? (
                      <Badge
                        variant="outline"
                        className={`bg-${getStatusColor(row[column.id])}-100 text-${getStatusColor(row[column.id])}-800 border-${getStatusColor(row[column.id])}-200`}
                      >
                        {row[column.id]}
                      </Badge>
                    ) : (
                      "Select status"
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {data.statusOptions?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <Badge
                        variant="outline"
                        className={`bg-${option.color}-100 text-${option.color}-800 border-${option.color}-200`}
                      >
                        {option.value}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )
        } else if (column.id === "priority") {
          return (
            <div className="px-2 py-1">
              <Select value={row[column.id] || ""} onValueChange={(value) => updateCell(row.id, column.id, value)}>
                <SelectTrigger className="h-7 w-32">
                  <SelectValue>
                    {row[column.id] ? (
                      <Badge
                        variant="outline"
                        className={`bg-${getPriorityColor(row[column.id])}-100 text-${getPriorityColor(row[column.id])}-800 border-${getPriorityColor(row[column.id])}-200`}
                      >
                        {row[column.id]}
                      </Badge>
                    ) : (
                      "Select priority"
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {data.priorityOptions?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <Badge
                        variant="outline"
                        className={`bg-${option.color}-100 text-${option.color}-800 border-${option.color}-200`}
                      >
                        {option.value}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )
        }
        return null

      case "date":
        return isEditing ? (
          <Input
            type="date"
            value={row[column.id] || ""}
            onChange={(e) => updateCell(row.id, column.id, e.target.value)}
            onBlur={() => setEditingCell(null)}
            autoFocus
            className="h-8"
          />
        ) : (
          <div
            className="px-2 py-1 cursor-pointer"
            onClick={() => setEditingCell({ rowId: row.id, columnId: column.id })}
          >
            {row[column.id] || ""}
          </div>
        )

      case "person":
        return (
          <div className="px-2 py-1 flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>{row[column.id]?.substring(0, 2) || "??"}</AvatarFallback>
            </Avatar>
            <Select value={row[column.id] || ""} onValueChange={(value) => updateCell(row.id, column.id, value)}>
              <SelectTrigger className="h-7 border-0 p-0 hover:bg-transparent focus:ring-0">
                <SelectValue placeholder="Assign to..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Alex Turner">Alex Turner</SelectItem>
                <SelectItem value="Jamie Smith">Jamie Smith</SelectItem>
                <SelectItem value="Casey Jones">Casey Jones</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )

      default:
        return <div className="px-2 py-1">{row[column.id] || ""}</div>
    }
  }

  return (
    <div className="border rounded-md">
      <div className="p-2 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <SortAsc className="h-4 w-4" />
            Sort
          </Button>
        </div>
        <Button size="sm" className="h-8 gap-1" onClick={addRow}>
          <Plus className="h-4 w-4" />
          New
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              {columns.map((column) => (
                <th key={column.id} className="text-left font-medium text-sm p-2">
                  <div className="flex items-center gap-1">
                    <span>{column.title}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleSort(column.id)}>
                      {sortColumn === column.id ? (
                        sortDirection === "asc" ? (
                          <SortAsc className="h-3 w-3" />
                        ) : (
                          <SortDesc className="h-3 w-3" />
                        )
                      ) : (
                        <ChevronDown className="h-3 w-3 opacity-50" />
                      )}
                    </Button>
                  </div>
                </th>
              ))}
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-muted/50">
                {columns.map((column) => (
                  <td key={`${row.id}-${column.id}`} className="p-0">
                    {renderCell(row, column)}
                  </td>
                ))}
                <td className="p-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
