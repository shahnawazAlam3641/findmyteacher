"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isTeacher, setIsTeacher] = useState(false)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    const userIsTeacher = localStorage.getItem("isTeacher") === "true"
    
    setIsLoggedIn(userLoggedIn)
    setIsTeacher(userIsTeacher)

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("isTeacher")
    setIsLoggedIn(false)
    setIsTeacher(false)
    window.location.href = "/"
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Teachers", href: "/teachers" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ]

  const authLinks = isLoggedIn
    ? isTeacher
      ? [
          { name: "Dashboard", href: "/teacher/dashboard" },
          { name: "Logout", href: "#", onClick: handleLogout },
        ]
      : [
          { name: "Chat", href: "/chat" },
          { name: "Logout", href: "#", onClick: handleLogout },
        ]
    : [
        { name: "Login", href: "/login" },
        { name: "Register", href: "/register" },
        { name: "Teach", href: "/teacher/register" },
      ]

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 py-4",
        isScrolled 
          ? "bg-white/95 dark:bg-slate-900/95 shadow-sm backdrop-blur-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          href="/" 
          className="font-bold text-2xl text-primary"
        >
          FindMyTeacher
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {authLinks.map((link, index) => 
            link.name === "Teach" || (link.name === "Register" && !isLoggedIn) ? (
              <Button 
                key={link.name} 
                asChild 
                variant="default"
                onClick={link.onClick}
              >
                <Link href={link.href}>{link.name}</Link>
              </Button>
            ) : (
              <Button 
                key={link.name} 
                asChild 
                variant={index === authLinks.length - 1 && link.name !== "Logout" ? "default" : "ghost"}
                onClick={link.onClick}
              >
                <Link href={link.href}>{link.name}</Link>
              </Button>
            )
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 pt-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px w-full bg-border my-2" />
              {authLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-foreground hover:text-primary transition-colors",
                    link.name === "Teach" && "text-primary font-medium"
                  )}
                  onClick={link.onClick}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}