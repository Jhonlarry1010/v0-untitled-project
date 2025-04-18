"use client"

import { useState } from "react"
import {
  Check,
  Copy,
  ExternalLink,
  Facebook,
  Instagram,
  Link,
  Linkedin,
  Lock,
  Mail,
  Share2,
  Twitter,
  Unlock,
  PhoneIcon as WhatsApp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface ShareDialogProps {
  title: string
}

export function ShareDialog({ title }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)
  const [isPublic, setIsPublic] = useState(false)
  const [publicLink, setPublicLink] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const generatePublicLink = () => {
    setIsGenerating(true)

    // Simulate API call to generate a public link
    setTimeout(() => {
      const randomId = Math.random().toString(36).substring(2, 10)
      const generatedLink = `https://notion-clone.vercel.app/public/${randomId}`
      setPublicLink(generatedLink)
      setIsPublic(true)
      setIsGenerating(false)
    }, 1000)
  }

  const openInBrowser = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const openShareUrl = (baseUrl: string) => {
    const url = baseUrl + encodeURIComponent(shareUrl)
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const shareViaWhatsApp = () => {
    openShareUrl(`https://wa.me/?text=${encodeURIComponent(title + ": ")}`)
  }

  const shareViaFacebook = () => {
    openShareUrl("https://www.facebook.com/sharer/sharer.php?u=")
  }

  const shareViaTwitter = () => {
    openShareUrl(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
    )
  }

  const shareViaLinkedIn = () => {
    openShareUrl(`https://www.linkedin.com/sharing/share-offsite/?url=`)
  }

  const shareViaEmail = () => {
    const subject = encodeURIComponent(title)
    const body = encodeURIComponent(`Check out this page: ${title}\n${shareUrl}`)
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Share</DialogTitle>
        <DialogDescription>Share this document with others via social media or direct link.</DialogDescription>
      </DialogHeader>
      <Tabs defaultValue="public" className="mt-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="public">Public Link</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="link">Copy Link</TabsTrigger>
        </TabsList>

        <TabsContent value="public" className="mt-4 space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              {isPublic ? <Unlock className="h-4 w-4 text-green-500" /> : <Lock className="h-4 w-4 text-orange-500" />}
              <Label htmlFor="public-mode">Make note public</Label>
            </div>
            <Switch
              id="public-mode"
              checked={isPublic}
              onCheckedChange={(checked) => {
                setIsPublic(checked)
                if (checked && !publicLink) {
                  generatePublicLink()
                }
              }}
            />
          </div>

          {isPublic ? (
            <div className="space-y-4">
              <div className="rounded-md bg-muted p-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    Public
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={() => setIsPublic(false)}>
                    Disable
                  </Button>
                </div>
                <p className="text-sm mt-2">Anyone with the link can view this note without signing in.</p>
              </div>

              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <label htmlFor="public-link" className="sr-only">
                    Public Link
                  </label>
                  <Input id="public-link" value={publicLink} readOnly className="h-9" />
                </div>
                <Button size="sm" className="px-3" onClick={() => handleCopy(publicLink)}>
                  <span className="sr-only">Copy</span>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <Button variant="outline" className="flex items-center gap-2" onClick={() => openInBrowser(publicLink)}>
                  <ExternalLink className="h-4 w-4" />
                  Open in browser
                </Button>

                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: title,
                        url: publicLink,
                      })
                    }
                  }}
                >
                  <Share2 className="h-4 w-4" />
                  Share link
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-md bg-muted p-4 text-center">
              <Lock className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <h3 className="text-sm font-medium">This note is private</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                Generate a public link to share this note with anyone.
              </p>
              <Button onClick={generatePublicLink} disabled={isGenerating}>
                {isGenerating ? "Generating..." : "Generate public link"}
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="social" className="mt-4">
          <div className="grid grid-cols-4 gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-16" onClick={shareViaWhatsApp}>
                    <WhatsApp className="h-8 w-8 text-green-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>WhatsApp</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-16" onClick={shareViaFacebook}>
                    <Facebook className="h-8 w-8 text-blue-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Facebook</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-16" onClick={shareViaTwitter}>
                    <Twitter className="h-8 w-8 text-blue-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Twitter</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-16" onClick={shareViaLinkedIn}>
                    <Linkedin className="h-8 w-8 text-blue-700" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>LinkedIn</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-16" onClick={shareViaEmail}>
                    <Mail className="h-8 w-8 text-gray-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Email</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-16"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: title,
                          url: shareUrl,
                        })
                      }
                    }}
                  >
                    <Share2 className="h-8 w-8 text-gray-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>More options</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-16"
                    onClick={() => {
                      window.open(`https://www.instagram.com/`, "_blank", "noopener,noreferrer")
                    }}
                  >
                    <Instagram className="h-8 w-8 text-pink-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Instagram</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </TabsContent>

        <TabsContent value="link" className="mt-4">
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <label htmlFor="link" className="sr-only">
                Link
              </label>
              <Input id="link" defaultValue={shareUrl} readOnly className="h-9" />
            </div>
            <Button type="submit" size="sm" className="px-3" onClick={() => handleCopy(shareUrl)}>
              <span className="sr-only">Copy</span>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Anyone with this link will be able to view this document.
          </p>
        </TabsContent>
      </Tabs>

      <DialogFooter className="sm:justify-start">
        <div className="flex items-center text-sm text-muted-foreground">
          <Link className="h-4 w-4 mr-1" />
          {isPublic ? "Public note - anyone with the link can view" : "Private note - only you can access"}
        </div>
      </DialogFooter>
    </DialogContent>
  )
}
