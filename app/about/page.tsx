import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Github, Twitter, Linkedin } from "lucide-react"

const milestones = [
  { year: "2021", title: "Founded", description: "Started with a vision to help developers ship faster." },
  {
    year: "2022",
    title: "First 1,000 customers",
    description: "Reached our first major milestone with growing community.",
  },
  {
    year: "2023",
    title: "50+ Templates",
    description: "Expanded our library with premium, production-ready templates.",
  },
  {
    year: "2024",
    title: "10,000+ Developers",
    description: "Now serving thousands of developers and businesses worldwide.",
  },
]

const team = [
  {
    name: "Alex Thompson",
    role: "Founder & Lead Developer",
    image: "/professional-male-developer.png",
    bio: "Full-stack developer with 10+ years of experience building web applications.",
    social: {
      twitter: "#",
      github: "#",
      linkedin: "#",
    },
  },
  {
    name: "Sarah Kim",
    role: "Design Lead",
    image: "/images/team-2.png",
    bio: "UI/UX designer passionate about creating beautiful, functional interfaces.",
    social: {
      twitter: "#",
      github: "#",
      linkedin: "#",
    },
  },
  {
    name: "Michael Chen",
    role: "Senior Developer",
    image: "/professional-asian-male-developer-headshot.jpg",
    bio: "React and Next.js specialist focused on performance optimization.",
    social: {
      twitter: "#",
      github: "#",
      linkedin: "#",
    },
  },
]

const values = [
  {
    title: "Quality First",
    description: "Every template is meticulously crafted with attention to detail and best practices.",
  },
  {
    title: "Developer Experience",
    description: "Clean code, comprehensive documentation, and easy customization are our priorities.",
  },
  {
    title: "Continuous Improvement",
    description: "We constantly update our templates with the latest technologies and features.",
  },
  {
    title: "Community Driven",
    description: "We listen to our community and build templates that solve real problems.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Built by developers, for developers
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              We're a small team of passionate developers and designers on a mission to help you ship beautiful,
              production-ready websites faster than ever.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="mt-20 border-y border-border bg-secondary/30 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Our Story</h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>
                    TemplateForge was born out of frustration. As developers, we spent countless hours setting up the
                    same boilerplate code, configuring the same tools, and building the same UI components for every new
                    project.
                  </p>
                  <p>
                    We knew there had to be a better way. So we started building templates that we wished existed—ones
                    with clean code, modern design, and all the features needed to launch a professional website.
                  </p>
                  <p>
                    Today, we're proud to help thousands of developers and businesses launch their projects faster. Our
                    templates have been used to build SaaS products, e-commerce stores, portfolios, and more.
                  </p>
                </div>
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image src="/developer-team-working-together-modern-office.jpg" alt="Our team" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">Our Values</h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div key={value.title} className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="border-y border-border bg-secondary/30 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">Our Journey</h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {milestones.map((milestone) => (
                <div key={milestone.year} className="relative">
                  <div className="text-4xl font-bold text-accent">{milestone.year}</div>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">{milestone.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{milestone.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">Meet the Team</h2>
            <p className="mt-4 text-center text-muted-foreground">The people behind TemplateForge</p>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="group rounded-xl border border-border bg-card p-6 text-center transition-all duration-300 hover:border-accent/50"
                >
                  <div className="mx-auto h-32 w-32 overflow-hidden rounded-full">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-accent">{member.role}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{member.bio}</p>
                  <div className="mt-4 flex justify-center gap-4">
                    <Link
                      href={member.social.twitter}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </Link>
                    <Link
                      href={member.social.github}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </Link>
                    <Link
                      href={member.social.linkedin}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="rounded-2xl border border-border bg-card p-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Ready to get started?</h2>
              <p className="mt-4 text-muted-foreground">
                Join thousands of developers who are building better websites with TemplateForge.
              </p>
              <Button asChild size="lg" className="mt-8 bg-foreground text-background hover:bg-foreground/90">
                <Link href="/templates">Browse Templates</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
