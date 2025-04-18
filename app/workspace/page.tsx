import { PageHeader } from "@/components/page-header"
import { Editor } from "@/components/editor"

export default function WorkspacePage() {
  return (
    <div className="h-full flex flex-col">
      <PageHeader title="Getting Started" emoji="👋" lastEdited="Edited just now" />
      <div className="flex-1 overflow-auto px-4 md:px-8 lg:px-12 py-6">
        <Editor defaultContent={defaultContent} />
      </div>
    </div>
  )
}

const defaultContent = [
  {
    id: "1",
    type: "heading",
    content: "Welcome to your workspace",
    level: 1,
  },
  {
    id: "2",
    type: "paragraph",
    content: "Use this document to get started with your new workspace.",
  },
  {
    id: "3",
    type: "heading",
    content: "What is Notion?",
    level: 2,
  },
  {
    id: "4",
    type: "paragraph",
    content: "Notion is an all-in-one workspace for your notes, tasks, wikis, and databases.",
  },
  {
    id: "5",
    type: "todo",
    content: "Create your first page",
    checked: true,
  },
  {
    id: "6",
    type: "todo",
    content: "Add some content",
    checked: false,
  },
  {
    id: "7",
    type: "todo",
    content: "Share with your team",
    checked: false,
  },
  {
    id: "8",
    type: "heading",
    content: "Get organized with databases",
    level: 2,
  },
  {
    id: "9",
    type: "paragraph",
    content: "Create powerful databases to organize your work.",
  },
]
