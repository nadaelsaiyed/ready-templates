"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Check, ExternalLink, Heart, ShoppingCart, Star, Package, Code2 } from "lucide-react"
import { getTemplateById, getRelatedTemplates } from "@/lib/templates-data"

export default function TemplateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const template = getTemplateById(Number(id))

  if (!template) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-foreground">Template Not Found</h1>
            <p className="mt-4 text-muted-foreground">The template you're looking for doesn't exist.</p>
            <Button onClick={() => router.push("/templates")} className="mt-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Templates
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const relatedTemplates = getRelatedTemplates(template.id, template.category)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => router.push("/templates")}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Templates
          </Button>

          <div className="grid gap-10 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Template Image */}
              <div className="relative aspect-video overflow-hidden rounded-xl border border-border">
                <Image
                  src={template.image || "/placeholder.svg"}
                  alt={template.name}
                  fill
                  className="object-cover"
                  priority
                />
                {template.featured && (
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">Featured</Badge>
                )}
              </div>

              {/* Template Info */}
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground capitalize">
                    {template.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">{template.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{template.downloads.toLocaleString()} downloads</span>
                </div>
                <h1 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">{template.name}</h1>
                <p className="mt-4 text-lg text-muted-foreground">{template.longDescription}</p>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="features" className="mt-8">
                <TabsList className="bg-secondary border border-border">
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="tech">Tech Stack</TabsTrigger>
                  <TabsTrigger value="changelog">Changelog</TabsTrigger>
                </TabsList>

                <TabsContent value="features" className="mt-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {template.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20">
                          <Check className="h-4 w-4 text-accent" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="tech" className="mt-6">
                  <div className="flex flex-wrap gap-3">
                    {template.techStack.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3"
                      >
                        <Code2 className="h-4 w-4 text-accent" />
                        <span className="text-foreground">{tech}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="changelog" className="mt-6">
                  <div className="rounded-lg border border-border bg-card p-6">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-accent" />
                      <span className="font-semibold text-foreground">Version {template.version}</span>
                      <span className="text-sm text-muted-foreground">
                        Released on {new Date(template.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                    <ul className="mt-4 space-y-2 text-muted-foreground">
                      <li>• Performance improvements and bug fixes</li>
                      <li>• Updated dependencies to latest versions</li>
                      <li>• Added new customization options</li>
                      <li>• Improved accessibility features</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Purchase Card */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-baseline justify-between">
                    <span className="text-4xl font-bold text-foreground">${template.price}</span>
                    <span className="text-muted-foreground">one-time</span>
                  </div>

                  <div className="mt-6 space-y-3">
                    <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Buy Template
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-border bg-transparent hover:bg-secondary"
                      asChild
                    >
                      <a href={template.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Preview
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground">
                      <Heart className="mr-2 h-4 w-4" />
                      Add to Wishlist
                    </Button>
                  </div>

                  <div className="mt-6 space-y-3 border-t border-border pt-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Version</span>
                      <span className="text-foreground">{template.version}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last Updated</span>
                      <span className="text-foreground">{new Date(template.lastUpdated).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Downloads</span>
                      <span className="text-foreground">{template.downloads.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* What's Included */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-foreground">What's Included</h3>
                  <ul className="mt-4 space-y-3">
                    {[
                      "Full source code",
                      "Documentation",
                      "Free updates for 1 year",
                      "Email support",
                      "Commercial license",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-foreground">Tags</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-secondary text-secondary-foreground">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Templates */}
          {relatedTemplates.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-bold text-foreground">Related Templates</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedTemplates.map((related) => (
                  <Link
                    key={related.id}
                    href={`/templates/${related.id}`}
                    className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-accent/50"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={related.image || "/placeholder.svg"}
                        alt={related.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-secondary text-secondary-foreground capitalize">
                          {related.category}
                        </Badge>
                        <span className="font-bold text-foreground">${related.price}</span>
                      </div>
                      <h3 className="mt-3 font-semibold text-foreground group-hover:text-accent transition-colors">
                        {related.name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
