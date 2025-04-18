import { PageHeader } from "@/components/page-header"
import { Editor } from "@/components/editor"
import { getPageById } from "@/lib/data"

export default function Page({ params }: { params: { pageId: string } }) {
  const page = getPageById(params.pageId)

  if (!page) {
    return <div className="p-8">Page not found</div>
  }

  return (
    <div className="h-full flex flex-col">
      <PageHeader title={page.title} emoji={page.emoji} lastEdited={page.lastEdited} />
      <div className="flex-1 overflow-auto px-4 md:px-8 lg:px-12 py-6">
        <Editor defaultContent={page.content} />
      </div>
    </div>
  )
}
