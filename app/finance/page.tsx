import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, CreditCard, BarChart3, Users, Settings } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SchoolFinance</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
              Testimonials
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/register" className="hidden md:block">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-24 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Simplify School Financial Management
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Streamline fee collection, manage payments, and gain financial insights with our comprehensive
                    school finance management system.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/demo">
                    <Button size="lg" variant="outline" className="w-full">
                      Request Demo
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-muted/30">
                  <img
                    src="/school-finance-overview.png"
                    alt="Dashboard Preview"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Key Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to manage your school's finances efficiently
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <CreditCard className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Fee Management</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Create and manage fee structures, terms, and payment schedules
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Parent Portal</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Dedicated portal for parents to view and pay fees online
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <BarChart3 className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Financial Reports</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Comprehensive reports and analytics for financial insights
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Settings className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Customization</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Tailor the system to your school's specific requirements
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Pricing Plans</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that fits your institution's needs
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col rounded-lg border shadow-sm">
                <div className="p-6">
                  <h3 className="text-2xl font-bold">Basic</h3>
                  <div className="mt-4 text-3xl font-bold">
                    $99<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">For small schools with basic financial needs</p>
                  <ul className="mt-6 space-y-2 text-sm">
                    <li className="flex items-center">✓ Up to 500 students</li>
                    <li className="flex items-center">✓ Fee management</li>
                    <li className="flex items-center">✓ Basic reports</li>
                    <li className="flex items-center">✓ Email support</li>
                  </ul>
                </div>
                <div className="flex flex-col p-6 border-t">
                  <Button>Get Started</Button>
                </div>
              </div>
              <div className="flex flex-col rounded-lg border shadow-sm relative">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-bl-lg rounded-tr-lg">
                  Popular
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold">Professional</h3>
                  <div className="mt-4 text-3xl font-bold">
                    $199<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    For medium-sized schools with advanced requirements
                  </p>
                  <ul className="mt-6 space-y-2 text-sm">
                    <li className="flex items-center">✓ Up to 1,500 students</li>
                    <li className="flex items-center">✓ Advanced fee management</li>
                    <li className="flex items-center">✓ Comprehensive reports</li>
                    <li className="flex items-center">✓ Priority support</li>
                    <li className="flex items-center">✓ Parent & student portals</li>
                  </ul>
                </div>
                <div className="flex flex-col p-6 border-t">
                  <Button>Get Started</Button>
                </div>
              </div>
              <div className="flex flex-col rounded-lg border shadow-sm">
                <div className="p-6">
                  <h3 className="text-2xl font-bold">Enterprise</h3>
                  <div className="mt-4 text-3xl font-bold">Custom</div>
                  <p className="mt-2 text-sm text-muted-foreground">For large institutions with complex requirements</p>
                  <ul className="mt-6 space-y-2 text-sm">
                    <li className="flex items-center">✓ Unlimited students</li>
                    <li className="flex items-center">✓ Custom fee structures</li>
                    <li className="flex items-center">✓ Advanced analytics</li>
                    <li className="flex items-center">✓ 24/7 dedicated support</li>
                    <li className="flex items-center">✓ API access</li>
                    <li className="flex items-center">✓ Custom integrations</li>
                  </ul>
                </div>
                <div className="flex flex-col p-6 border-t">
                  <Button variant="outline">Contact Sales</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Customers Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Trusted by educational institutions worldwide
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col rounded-lg border p-6 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex-shrink-0">
                    <img src="/diverse-group-city.png" alt="Avatar" className="rounded-full" />
                  </div>
                  <div>
                    <h3 className="font-bold">Sarah Johnson</h3>
                    <p className="text-sm text-muted-foreground">Principal, Westview Academy</p>
                  </div>
                </div>
                <p className="mt-4 text-sm">
                  "This system has transformed how we manage our school finances. The reporting features are
                  exceptional, and our parents love the online payment portal."
                </p>
              </div>
              <div className="flex flex-col rounded-lg border p-6 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex-shrink-0">
                    <img src="/diverse-group-city.png" alt="Avatar" className="rounded-full" />
                  </div>
                  <div>
                    <h3 className="font-bold">Michael Chen</h3>
                    <p className="text-sm text-muted-foreground">Finance Director, Oakridge School</p>
                  </div>
                </div>
                <p className="mt-4 text-sm">
                  "The analytics and reporting capabilities have given us insights we never had before. We've reduced
                  outstanding payments by 40% since implementing this system."
                </p>
              </div>
              <div className="flex flex-col rounded-lg border p-6 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex-shrink-0">
                    <img src="/diverse-group-city.png" alt="Avatar" className="rounded-full" />
                  </div>
                  <div>
                    <h3 className="font-bold">Priya Patel</h3>
                    <p className="text-sm text-muted-foreground">Administrator, Greenfield International</p>
                  </div>
                </div>
                <p className="mt-4 text-sm">
                  "The customer support is outstanding. They helped us customize the system to our unique requirements
                  and were always available when we needed assistance."
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Get in Touch</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Have questions? Our team is here to help. Contact us for more information or to schedule a demo.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span>info@schoolfinance.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>123 Education Street, Suite 456, San Francisco, CA 94107</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-full max-w-md space-y-4 rounded-lg border p-6 shadow-sm">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Send us a message</h3>
                    <p className="text-sm text-muted-foreground">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                  </div>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="first-name" className="text-sm font-medium">
                          First name
                        </label>
                        <input
                          id="first-name"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="last-name" className="text-sm font-medium">
                          Last name
                        </label>
                        <input
                          id="last-name"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                    </div>
                    <Button className="w-full">Send Message</Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2023 SchoolFinance. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
