import { Editor } from "@/components/editor"

export default function PublicNotePage({ params }: { params: { noteId: string } }) {
  // In a real app, we would fetch the note data based on the noteId
  // For this demo, we'll use mock data
  const mockNote = {
    title: "Public Shared Note",
    emoji: "📝",
    lastEdited: "Shared via public link",
    content: [
      {
        id: "1",
        type: "heading",
        content: "This is a publicly shared note",
        level: 1,
      },
      {
        id: "2",
        type: "paragraph",
        content: "Anyone with the link can view this content without signing in.",
      },
      {
        id: "3",
        type: "heading",
        content: "How public sharing works",
        level: 2,
      },
      {
        id: "4",
        type: "list",
        content: "Generate a public link for your note",
      },
      {
        id: "5",
        type: "list",
        content: "Share the link with anyone",
      },
      {
        id: "6",
        type: "list",
        content: "They can view the content without an account",
      },
      {
        id: "7",
        type: "paragraph",
        content: `This note was shared with ID: ${params.noteId}`,
      },
    ],
  }

  return (
    <div className="h-full flex flex-col">
      <div className="border-b bg-background sticky top-0 z-10 flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          {mockNote.emoji && <div className="text-2xl">{mockNote.emoji}</div>}
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">{mockNote.title}</h1>
            <span className="text-xs text-muted-foreground">{mockNote.lastEdited}</span>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto px-4 md:px-8 lg:px-12 py-6">
        <Editor defaultContent={mockNote.content} readOnly={true} />
      </div>
    </div>
  )
}
