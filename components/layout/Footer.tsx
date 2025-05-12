import Link from "next/link"
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon, MailIcon, PhoneIcon, MapIcon } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-primary font-bold text-xl mb-4">FindMyTeacher</h3>
            <p className="text-muted-foreground mb-4">
              Connecting students with the best local teachers and coaching centers since 2025.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FacebookIcon size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <TwitterIcon size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <InstagramIcon size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <LinkedinIcon size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/teachers" className="text-muted-foreground hover:text-primary transition-colors">
                  Find Teachers
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">For Teachers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/teacher/register" className="text-muted-foreground hover:text-primary transition-colors">
                  Join as a Teacher
                </Link>
              </li>
              <li>
                <Link href="/teacher/login" className="text-muted-foreground hover:text-primary transition-colors">
                  Teacher Login
                </Link>
              </li>
              <li>
                <Link href="/teacher/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Teacher Dashboard
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  How it Works
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapIcon size={20} className="mr-2 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  123 Education Street, Learning City, 12345
                </span>
              </li>
              <li className="flex items-center">
                <PhoneIcon size={20} className="mr-2 text-primary shrink-0" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <MailIcon size={20} className="mr-2 text-primary shrink-0" />
                <span className="text-muted-foreground">support@findmyteacher.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} FindMyTeacher. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}