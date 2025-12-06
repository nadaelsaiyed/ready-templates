import Image from "next/image"

const testimonials = [
  {
    content:
      "TemplateForge saved us weeks of development time. The code quality is exceptional and the documentation made customization a breeze.",
    author: {
      name: "Sarah Chen",
      role: "CTO at TechStartup",
      image: "/professional-woman-headshot.png",
    },
  },
  {
    content:
      "I've tried many template providers, but TemplateForge stands out with their attention to detail and modern design patterns.",
    author: {
      name: "Marcus Rodriguez",
      role: "Senior Developer at Agency Co",
      image: "/professional-man-headshot.png",
    },
  },
  {
    content:
      "The best investment I've made for my freelance business. My clients love the results and I deliver projects faster than ever.",
    author: {
      name: "Emily Watson",
      role: "Freelance Developer",
      image: "/professional-woman-developer.png",
    },
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by developers worldwide
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what our customers have to say about their experience with TemplateForge.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/50"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-4 text-foreground">&ldquo;{testimonial.content}&rdquo;</blockquote>
              <div className="mt-6 flex items-center gap-4">
                <Image
                  src={testimonial.author.image || "/placeholder.svg"}
                  alt={testimonial.author.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.author.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.author.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
