import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import FeatureCard from "@/components/home/FeatureCard"
import TestimonialCard from "@/components/home/TestimonialCard"
import { BookOpen, Search, Calendar, Award, CheckCircle, Users } from "lucide-react"

// Import mock data
import testimonials from "@/data/testimonials.json"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 animate-fade-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Find the Perfect <span className="text-primary">Teacher</span> for Your Learning Journey
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
                Connect with experienced teachers in your area for personalized education that fits your goals, schedule, and learning style.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/teachers">Find Teachers</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/teacher/register">Become a Teacher</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 animate-fade-in">
              <div className="relative w-full h-[400px] md:h-[500px]">
                <Image
                  src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Students learning with a teacher"
                  fill
                  priority
                  className="object-cover rounded-lg shadow-xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose FindMyTeacher?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform connects students with qualified teachers for personalized learning experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Search}
              title="Find Local Teachers"
              description="Search for teachers by subject, location, and price to find your perfect match."
            />
            <FeatureCard
              icon={BookOpen}
              title="Personalized Learning"
              description="Get customized instruction tailored to your specific needs and learning style."
            />
            <FeatureCard
              icon={Calendar}
              title="Flexible Scheduling"
              description="Book lessons at times that work for you, with no long-term commitments."
            />
            <FeatureCard
              icon={Award}
              title="Verified Teachers"
              description="All teachers are verified for qualifications and experience before joining."
            />
            <FeatureCard
              icon={CheckCircle}
              title="Secure Platform"
              description="Our platform ensures safe communication and payments for peace of mind."
            />
            <FeatureCard
              icon={Users}
              title="Community Support"
              description="Join a community of learners and educators dedicated to educational excellence."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Finding the right teacher is easy with our simple 3-step process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Search for Teachers</h3>
              <p className="text-muted-foreground">
                Browse our extensive list of teachers filtered by subject, location, and price.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Contact and Schedule</h3>
              <p className="text-muted-foreground">
                Message teachers directly to discuss your needs and arrange lessons.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Start Learning</h3>
              <p className="text-muted-foreground">
                Begin your personalized learning journey with your chosen teacher.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <Link href="/teachers">Find Your Teacher Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Students Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from students who have found their perfect learning match through FindMyTeacher.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                name={testimonial.name}
                text={testimonial.text}
                image={testimonial.image}
                rating={testimonial.rating}
                location={testimonial.location}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-3xl mx-auto">
            Ready to Transform Your Learning Experience?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of students who have found their perfect teacher match and taken their education to the next level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/teachers">Find a Teacher</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white/10" asChild>
              <Link href="/register">Sign Up as Student</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}