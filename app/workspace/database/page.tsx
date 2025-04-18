import { PageHeader } from "@/components/page-header"
import { Database } from "@/components/database"

export default function DatabasePage() {
  return (
    <div className="h-full flex flex-col">
      <PageHeader title="Task Database" emoji="📊" lastEdited="Edited 2 hours ago" />
      <div className="flex-1 overflow-auto px-4 md:px-8 lg:px-12 py-6">
        <Database data={databaseData} />
      </div>
    </div>
  )
}

const databaseData = {
  columns: [
    { id: "name", title: "Name", type: "text" },
    { id: "status", title: "Status", type: "select" },
    { id: "priority", title: "Priority", type: "select" },
    { id: "dueDate", title: "Due Date", type: "date" },
    { id: "assignee", title: "Assignee", type: "person" },
  ],
  rows: [
    {
      id: "1",
      name: "Redesign homepage",
      status: "In Progress",
      priority: "High",
      dueDate: "2023-06-15",
      assignee: "Alex Turner",
    },
    {
      id: "2",
      name: "Fix navigation bug",
      status: "To Do",
      priority: "Medium",
      dueDate: "2023-06-20",
      assignee: "Jamie Smith",
    },
    {
      id: "3",
      name: "Update documentation",
      status: "Done",
      priority: "Low",
      dueDate: "2023-06-10",
      assignee: "Casey Jones",
    },
    {
      id: "4",
      name: "Implement new feature",
      status: "In Progress",
      priority: "High",
      dueDate: "2023-06-25",
      assignee: "Alex Turner",
    },
    {
      id: "5",
      name: "Review pull requests",
      status: "To Do",
      priority: "Medium",
      dueDate: "2023-06-18",
      assignee: "Jamie Smith",
    },
  ],
  statusOptions: [
    { value: "To Do", color: "gray" },
    { value: "In Progress", color: "blue" },
    { value: "Done", color: "green" },
  ],
  priorityOptions: [
    { value: "Low", color: "gray" },
    { value: "Medium", color: "yellow" },
    { value: "High", color: "red" },
  ],
}
