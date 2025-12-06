import { Code2, Zap, Palette, Shield, Smartphone, Layers } from "lucide-react"

const features = [
  {
    name: "Production Ready",
    description: "Every template is built with best practices and ready to deploy to Vercel, Netlify, or any platform.",
    icon: Zap,
  },
  {
    name: "Modern Stack",
    description: "Built with Next.js 14, React 18, Tailwind CSS, and TypeScript for type-safe development.",
    icon: Code2,
  },
  {
    name: "Customizable",
    description: "Clean, well-documented code that's easy to customize and extend for your specific needs.",
    icon: Palette,
  },
  {
    name: "Responsive Design",
    description: "Pixel-perfect on every device. Mobile-first approach ensures great UX everywhere.",
    icon: Smartphone,
  },
  {
    name: "Component Library",
    description: "Includes a comprehensive set of reusable components built with shadcn/ui.",
    icon: Layers,
  },
  {
    name: "SEO Optimized",
    description: "Built-in SEO best practices including meta tags, structured data, and performance optimization.",
    icon: Shield,
  },
]

export function FeaturesSection() {
  return (
    <section className="border-y border-border bg-secondary/30 py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to ship faster
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our templates come with all the features you need to build professional websites without starting from
            scratch.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="group relative rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
