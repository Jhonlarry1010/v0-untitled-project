interface Block {
  id: string
  type: string
  content: string
  level?: number
  checked?: boolean
  url?: string
}

interface Page {
  id: string
  title: string
  emoji: string
  lastEdited: string
  content: Block[]
}

const pages: Page[] = [
  {
    id: "page-1",
    title: "Project Roadmap",
    emoji: "🗺️",
    lastEdited: "Edited 2 days ago",
    content: [
      {
        id: "1",
        type: "heading",
        content: "Project Roadmap",
        level: 1,
      },
      {
        id: "2",
        type: "paragraph",
        content: "Our plan for the next quarter.",
      },
      {
        id: "3",
        type: "heading",
        content: "Q1 Goals",
        level: 2,
      },
      {
        id: "4",
        type: "todo",
        content: "Launch new website",
        checked: true,
      },
      {
        id: "5",
        type: "todo",
        content: "Implement user authentication",
        checked: true,
      },
      {
        id: "6",
        type: "todo",
        content: "Create admin dashboard",
        checked: false,
      },
      {
        id: "7",
        type: "heading",
        content: "Q2 Goals",
        level: 2,
      },
      {
        id: "8",
        type: "todo",
        content: "Add payment processing",
        checked: false,
      },
      {
        id: "9",
        type: "todo",
        content: "Implement analytics",
        checked: false,
      },
    ],
  },
  {
    id: "page-2",
    title: "Meeting Notes",
    emoji: "📝",
    lastEdited: "Edited yesterday",
    content: [
      {
        id: "1",
        type: "heading",
        content: "Team Meeting - April 15, 2023",
        level: 1,
      },
      {
        id: "2",
        type: "paragraph",
        content: "Attendees: Alex, Jamie, Casey, Taylor",
      },
      {
        id: "3",
        type: "heading",
        content: "Agenda",
        level: 2,
      },
      {
        id: "4",
        type: "list",
        content: "Project updates",
      },
      {
        id: "5",
        type: "list",
        content: "Roadmap review",
      },
      {
        id: "6",
        type: "list",
        content: "Open discussion",
      },
      {
        id: "7",
        type: "heading",
        content: "Action Items",
        level: 2,
      },
      {
        id: "8",
        type: "todo",
        content: "Alex to update project documentation",
        checked: false,
      },
      {
        id: "9",
        type: "todo",
        content: "Jamie to schedule next meeting",
        checked: false,
      },
    ],
  },
  {
    id: "page-3",
    title: "Ideas & Inspiration",
    emoji: "💡",
    lastEdited: "Edited 3 days ago",
    content: [
      {
        id: "1",
        type: "heading",
        content: "Ideas & Inspiration",
        level: 1,
      },
      {
        id: "2",
        type: "paragraph",
        content: "A collection of ideas and inspiration for future projects.",
      },
      {
        id: "3",
        type: "heading",
        content: "Design Inspiration",
        level: 2,
      },
      {
        id: "4",
        type: "list",
        content: "Minimal and clean interfaces",
      },
      {
        id: "5",
        type: "list",
        content: "Dark mode with accent colors",
      },
      {
        id: "6",
        type: "list",
        content: "Micro-interactions for better UX",
      },
      {
        id: "7",
        type: "heading",
        content: "Feature Ideas",
        level: 2,
      },
      {
        id: "8",
        type: "list",
        content: "AI-powered content suggestions",
      },
      {
        id: "9",
        type: "list",
        content: "Collaborative editing in real-time",
      },
      {
        id: "10",
        type: "list",
        content: "Advanced search with filters",
      },
    ],
  },
]

export function getPageById(id: string): Page | undefined {
  return pages.find((page) => page.id === id)
}
