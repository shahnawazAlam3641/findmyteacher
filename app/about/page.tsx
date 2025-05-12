import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Search, Award, Users, CheckCircle, GraduationCap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About FindMyTeacher</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Founded in 2025, FindMyTeacher is committed to revolutionizing education by connecting students with qualified, passionate teachers for personalized learning experiences.
              </p>
              <p className="text-lg text-muted-foreground">
                Our mission is to make quality education accessible to everyone by creating a platform where finding the right teacher is simple, transparent, and effective.
              </p>
            </div>
            <div className="md:w-1/2 relative h-[300px] md:h-[400px]">
              <Image
                src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Teacher helping student"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h2>
            <div className="h-1 w-20 bg-primary mx-auto"></div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground mb-6">
              FindMyTeacher was born from a simple observation: finding the right teacher shouldn't be complicated. Our founders, experienced educators themselves, recognized that many talented teachers struggled to connect with students who could benefit from their expertise.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              At the same time, students and parents were spending hours searching for qualified instructors who matched their specific needs, often settling for whatever option was most convenient rather than what was best for their learning goals.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              We set out to solve this problem by creating a platform that makes it easy to find teachers based on subject, location, price, and teaching style. Our goal is to remove barriers to quality education and create a community where teachers are valued for their expertise and students can find exactly the right learning support they need.
            </p>
            <p className="text-lg text-muted-foreground">
              Today, FindMyTeacher has helped thousands of students connect with dedicated teachers across dozens of subjects, creating learning relationships that go beyond traditional education models.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at FindMyTeacher.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Educational Excellence</h3>
              <p className="text-muted-foreground">
                We believe in promoting the highest standards of education through qualified and passionate teachers.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Inclusion & Accessibility</h3>
              <p className="text-muted-foreground">
                Education should be accessible to everyone, regardless of background or circumstances.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trust & Transparency</h3>
              <p className="text-muted-foreground">
                We verify teacher qualifications and promote honest reviews and clear pricing.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Learning</h3>
              <p className="text-muted-foreground">
                We recognize that every student learns differently and needs customized instruction.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Teacher Empowerment</h3>
              <p className="text-muted-foreground">
                We support teachers by providing them with tools to grow their teaching practice.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Continuous Growth</h3>
              <p className="text-muted-foreground">
                We believe in lifelong learning and constantly improving our platform and services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How FindMyTeacher Works</h2>
            <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-2xl font-semibold mb-4">For Students</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="mr-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">1</div>
                  <div>
                    <p className="font-medium">Create a free account</p>
                    <p className="text-muted-foreground">Sign up with basic information to start your search.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">2</div>
                  <div>
                    <p className="font-medium">Search for teachers</p>
                    <p className="text-muted-foreground">Filter by subject, location, price, and availability.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">3</div>
                  <div>
                    <p className="font-medium">Review profiles and contact</p>
                    <p className="text-muted-foreground">Read reviews, check qualifications, and message potential teachers.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">4</div>
                  <div>
                    <p className="font-medium">Schedule lessons and learn</p>
                    <p className="text-muted-foreground">Arrange sessions and begin your personalized learning journey.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4">For Teachers</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="mr-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">1</div>
                  <div>
                    <p className="font-medium">Register as a teacher</p>
                    <p className="text-muted-foreground">Create a profile with your qualifications and teaching experience.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">2</div>
                  <div>
                    <p className="font-medium">Complete verification</p>
                    <p className="text-muted-foreground">Submit documentation to verify your credentials and identity.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">3</div>
                  <div>
                    <p className="font-medium">Set your availability and rates</p>
                    <p className="text-muted-foreground">Define your schedule and pricing for different services.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">4</div>
                  <div>
                    <p className="font-medium">Respond to student inquiries</p>
                    <p className="text-muted-foreground">Communicate with interested students and arrange lessons.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Educational Community</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Whether you're a student looking to learn or a teacher wanting to share your knowledge, FindMyTeacher is the platform for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">Sign Up as Student</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white/10" asChild>
              <Link href="/teacher/register">Become a Teacher</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}