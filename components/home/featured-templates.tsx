"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ExternalLink } from "lucide-react"
import { templates } from "@/lib/templates-data"

export function FeaturedTemplates() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const featuredTemplates = templates.slice(0, 6)

  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Featured Templates</h2>
            <p className="mt-2 text-muted-foreground">Hand-picked templates loved by developers worldwide.</p>
          </div>
          <Button asChild variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
            <Link href="/templates">
              View All Templates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTemplates.map((template) => (
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
                  {template.tags.map((tag) => (
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
    </section>
  )
}
