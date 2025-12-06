"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, MessageSquare, Github, Twitter, Linkedin, Check } from "lucide-react"

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 3000)
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setNewsletterSubmitted(true)
    setTimeout(() => setNewsletterSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Get in Touch</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a question, suggestion, or just want to say hi? We'd love to hear from you.
            </p>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="text-2xl font-bold text-foreground">Send us a message</h2>
              <p className="mt-2 text-muted-foreground">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleFormSubmit} className="mt-8 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-foreground">
                      First Name
                    </Label>
                    <Input id="firstName" placeholder="John" required className="bg-secondary border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-foreground">
                      Last Name
                    </Label>
                    <Input id="lastName" placeholder="Doe" required className="bg-secondary border-border" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="bg-secondary border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-foreground">
                    Subject
                  </Label>
                  <Input id="subject" placeholder="How can we help?" required className="bg-secondary border-border" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your question..."
                    rows={5}
                    required
                    className="bg-secondary border-border resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-foreground text-background hover:bg-foreground/90"
                  disabled={formSubmitted}
                >
                  {formSubmitted ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Message Sent!
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info & Newsletter */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="rounded-2xl border border-border bg-card p-8">
                <h2 className="text-2xl font-bold text-foreground">Contact Information</h2>
                <div className="mt-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <p className="text-muted-foreground">support@templateforge.dev</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <MessageSquare className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Live Chat</h3>
                      <p className="text-muted-foreground">Available Mon-Fri, 9am-5pm EST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Location</h3>
                      <p className="text-muted-foreground">San Francisco, CA</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 border-t border-border pt-8">
                  <h3 className="font-semibold text-foreground">Follow Us</h3>
                  <div className="mt-4 flex gap-4">
                    <Link
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <Twitter className="h-5 w-5" />
                    </Link>
                    <Link
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <Github className="h-5 w-5" />
                    </Link>
                    <Link
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="rounded-2xl border border-accent/50 bg-card p-8">
                <h2 className="text-2xl font-bold text-foreground">Subscribe to our newsletter</h2>
                <p className="mt-2 text-muted-foreground">
                  Get a free template and weekly tips on web development delivered to your inbox.
                </p>

                <form onSubmit={handleNewsletterSubmit} className="mt-6 flex flex-col gap-4 sm:flex-row">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="flex-1 bg-secondary border-border"
                  />
                  <Button
                    type="submit"
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                    disabled={newsletterSubmitted}
                  >
                    {newsletterSubmitted ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Subscribed!
                      </>
                    ) : (
                      "Subscribe"
                    )}
                  </Button>
                </form>

                <p className="mt-4 text-xs text-muted-foreground">
                  By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
