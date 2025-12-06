import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

const plans = [
  {
    name: "Single Template",
    description: "Perfect for individual projects",
    price: 49,
    priceNote: "one-time payment",
    featured: false,
    features: [
      { name: "1 template license", included: true },
      { name: "Lifetime updates", included: true },
      { name: "6 months support", included: true },
      { name: "Source files", included: true },
      { name: "Commercial use", included: true },
      { name: "Multiple projects", included: false },
      { name: "Team license", included: false },
      { name: "Priority support", included: false },
    ],
    cta: "Buy Template",
    href: "/templates",
  },
  {
    name: "Pro Bundle",
    description: "Best value for freelancers",
    price: 149,
    priceNote: "one-time payment",
    featured: true,
    features: [
      { name: "5 template licenses", included: true },
      { name: "Lifetime updates", included: true },
      { name: "12 months support", included: true },
      { name: "Source files", included: true },
      { name: "Commercial use", included: true },
      { name: "Multiple projects", included: true },
      { name: "Team license", included: false },
      { name: "Priority support", included: true },
    ],
    cta: "Get Pro Bundle",
    href: "/templates",
  },
  {
    name: "Team License",
    description: "For teams and agencies",
    price: 399,
    priceNote: "one-time payment",
    featured: false,
    features: [
      { name: "All templates", included: true },
      { name: "Lifetime updates", included: true },
      { name: "Unlimited support", included: true },
      { name: "Source files", included: true },
      { name: "Commercial use", included: true },
      { name: "Unlimited projects", included: true },
      { name: "Up to 10 team members", included: true },
      { name: "Priority support", included: true },
    ],
    cta: "Get Team License",
    href: "/contact",
  },
]

const faqs = [
  {
    question: "What's included in each template?",
    answer:
      "Each template includes the full source code, documentation, all components, and assets needed to build your project. You get access to lifetime updates for that template.",
  },
  {
    question: "Can I use templates for client projects?",
    answer:
      "Yes! All our licenses include commercial use rights. You can use templates for unlimited client projects with the Pro Bundle and Team License.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes, we offer a 14-day money-back guarantee. If you're not satisfied with your purchase, contact us for a full refund.",
  },
  {
    question: "How do updates work?",
    answer:
      "You get lifetime updates for all templates in your license. When we release new features or improvements, you'll have access to download the latest version.",
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your needs. All plans include lifetime updates and our quality guarantee.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border ${
                  plan.featured ? "border-accent bg-card shadow-xl shadow-accent/10" : "border-border bg-card"
                } p-8 transition-all duration-300 hover:border-accent/50`}
              >
                {plan.featured && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground">
                    Most Popular
                  </Badge>
                )}

                <div className="text-center">
                  <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                  <div className="mt-6">
                    <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                    <span className="text-muted-foreground ml-2">{plan.priceNote}</span>
                  </div>
                </div>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature.name} className="flex items-center gap-3">
                      {feature.included ? (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20">
                          <Check className="h-3 w-3 text-accent" />
                        </div>
                      ) : (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted">
                          <X className="h-3 w-3 text-muted-foreground" />
                        </div>
                      )}
                      <span className={feature.included ? "text-foreground" : "text-muted-foreground"}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`mt-8 w-full ${
                    plan.featured
                      ? "bg-accent text-accent-foreground hover:bg-accent/90"
                      : "bg-foreground text-background hover:bg-foreground/90"
                  }`}
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-24">
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
              Frequently asked questions
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
                  <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-24 text-center">
            <p className="text-lg text-muted-foreground">Have questions? We're here to help.</p>
            <Button
              asChild
              variant="outline"
              className="mt-4 border-border text-foreground hover:bg-secondary bg-transparent"
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
