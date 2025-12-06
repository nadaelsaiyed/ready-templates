"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ExternalLink, Search, SlidersHorizontal, X } from "lucide-react"
import { templates } from "@/lib/templates-data"

const categories = [
  { id: "all", name: "All", count: 12 },
  { id: "saas", name: "SaaS", count: 3 },
  { id: "ecommerce", name: "E-Commerce", count: 2 },
  { id: "portfolio", name: "Portfolio", count: 2 },
  { id: "landing", name: "Landing Page", count: 2 },
  { id: "blog", name: "Blog", count: 1 },
  { id: "corporate", name: "Corporate", count: 2 },
]

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Find your Template</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Jumpstart your development with premium templates built for modern web applications.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-border"
              />
            </div>
            <Button
              variant="outline"
              className="lg:hidden border-border bg-transparent"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="mt-8 flex gap-8">
            {/* Sidebar Filters */}
            <aside className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-64 shrink-0`}>
              <div className="sticky top-28 space-y-6">
                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">Filter Templates</h3>
                    <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setShowFilters(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Category</h4>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                          selectedCategory === category.id
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className="text-xs opacity-70">{category.count}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">Features</h4>
                    {["Next.js 14", "TypeScript", "Tailwind CSS", "Dark Mode", "SEO Ready"].map((feature) => (
                      <label
                        key={feature}
                        className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                      >
                        <Checkbox className="border-border data-[state=checked]:bg-accent data-[state=checked]:border-accent" />
                        {feature}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Templates Grid */}
            <div className="flex-1">
              <div className="mb-4 text-sm text-muted-foreground">Showing {filteredTemplates.length} templates</div>

              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredTemplates.map((template) => (
                  <Link
                    key={template.id}
                    href={`/templates/${template.id}`}
                    className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
                    onMouseEnter={() => setHoveredId(template.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={template.image || "/placeholder.svg"}
                        alt={template.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {template.featured && (
                        <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">Featured</Badge>
                      )}
                      <div
                        className={`absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${hoveredId === template.id ? "opacity-100" : "opacity-0"}`}
                      >
                        <Button
                          variant="outline"
                          className="border-foreground text-foreground hover:bg-foreground hover:text-background bg-transparent"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Preview
                        </Button>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-secondary text-secondary-foreground capitalize">
                          {template.category}
                        </Badge>
                        <span className="text-lg font-bold text-foreground">${template.price}</span>
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                        {template.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{template.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {template.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="rounded-md bg-secondary px-2 py-1 text-xs text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
