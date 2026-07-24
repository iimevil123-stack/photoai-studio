"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus } from "lucide-react"

interface CreateProjectDialogProps {
  onCreated: () => void
}

export function CreateProjectDialog({ onCreated }: CreateProjectDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [type, setType] = useState("general")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name) return
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, type }),
      })
      if (res.ok) {
        setOpen(false)
        setName("")
        setType("general")
        onCreated()
      }
    } catch {
      // Silently fail
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="bg-amber-500 hover:bg-amber-600 text-white">
          <Plus className="mr-2 h-4 w-4" />
          新建项目
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新建摄影项目</DialogTitle>
          <DialogDescription>创建一个新项目来管理你的照片和AI分析</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">项目名称 *</Label>
            <Input
              id="name"
              placeholder="例如：婚礼-王女士"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">项目类型</Label>
            <Select value={type} onValueChange={(v) => setType(v || "general")}>
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">通用</SelectItem>
                <SelectItem value="portrait">人像</SelectItem>
                <SelectItem value="wedding">婚礼</SelectItem>
                <SelectItem value="landscape">风景</SelectItem>
                <SelectItem value="commercial">商业</SelectItem>
                <SelectItem value="event">活动</SelectItem>
                <SelectItem value="street">街拍</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting || !name}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white"
          >
            {isSubmitting ? "创建中..." : "创建项目"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
