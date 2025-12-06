import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 h-[800px] w-[800px] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm font-medium text-accent">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
            </span>
            New templates added weekly
          </p>

          <h1 className="mt-8 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
            Premium Templates for Modern Web Development
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
            Launch your projects faster with production-ready templates. Built with Next.js, Tailwind CSS, and best
            practices. Save weeks of development time.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90 px-8">
              <Link href="/templates">
                Browse Templates
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border bg-transparent text-foreground hover:bg-secondary"
            >
              <Link href="#demo" className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Watch Demo
              </Link>
            </Button>
          </div>

          <div className="mt-16 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">50+</span>
              <span>Templates</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">10k+</span>
              <span>Developers</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">99%</span>
              <span>Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
