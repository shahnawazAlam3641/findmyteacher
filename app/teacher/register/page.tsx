"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Eye, 
  EyeOff,
  Upload,
  Check,
  CreditCard,
} from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  subject: z.string().min(1, {
    message: "Please select a subject.",
  }),
  city: z.string().min(1, {
    message: "Please enter your city.",
  }),
  bio: z.string().min(50, {
    message: "Bio must be at least 50 characters.",
  }).max(500, {
    message: "Bio must not exceed 500 characters.",
  }),
  experience: z.string().min(1, {
    message: "Please select your experience level.",
  }),
  education: z.string().min(5, {
    message: "Please provide your education details.",
  }),
  price: z.string().min(1, {
    message: "Please enter your hourly rate.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export default function TeacherRegisterPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [imageUploaded, setImageUploaded] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      city: "",
      bio: "",
      experience: "",
      education: "",
      price: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setShowPaymentModal(true)
  }
  
  function processPayment() {
    setPaymentProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      // Store login state in localStorage
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("isTeacher", "true")
      
      toast.success("Registration successful! Welcome to FindMyTeacher.")
      router.push("/teacher/dashboard")
      
      setPaymentProcessing(false)
      setShowPaymentModal(false)
      setIsSubmitting(false)
    }, 2000)
  }
  
  function handleImageUpload() {
    // Simulate image upload
    setTimeout(() => {
      setImageUploaded(true)
      toast.success("Profile image uploaded successfully!")
    }, 1000)
  }

  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English Literature",
    "History",
    "Computer Science",
    "Music",
    "Art",
    "Languages",
    "Economics",
    "Business Studies"
  ]
  
  const experienceLevels = [
    "1-2 years",
    "3-5 years",
    "5-10 years",
    "10+ years"
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Become a Teacher</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Join our platform to connect with students and grow your teaching business
          </p>
        </div>
        
        <Tabs defaultValue="teacher" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="student">
              <Link href="/register" className="w-full h-full flex items-center justify-center">
                Student
              </Link>
            </TabsTrigger>
            <TabsTrigger value="teacher">Teacher</TabsTrigger>
          </TabsList>
          
          <TabsContent value="teacher" className="mt-6">
            <div className="bg-card shadow-sm rounded-lg p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="New York" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Teaching Information</h2>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Subject</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your primary teaching subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {subjects.map((subject) => (
                                <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Experience</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select experience level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {experienceLevels.map((level) => (
                                  <SelectItem key={level} value={level}>{level}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hourly Rate ($)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="45" {...field} />
                            </FormControl>
                            <FormDescription>
                              Set your hourly teaching rate in USD
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="education"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Education Background</FormLabel>
                          <FormControl>
                            <Input placeholder="M.S. Mathematics, University of..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell students about your teaching experience, approach, and specialties..." 
                              rows={5}
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            {field.value.length}/500 characters
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div>
                      <FormLabel>Profile Image</FormLabel>
                      <div className="mt-2 flex items-center space-x-4">
                        <div className="relative w-24 h-24 rounded-md overflow-hidden bg-muted flex items-center justify-center border">
                          {imageUploaded ? (
                            <Image 
                              src="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg" 
                              alt="Profile" 
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <Upload className="h-10 w-10 text-muted-foreground" />
                          )}
                        </div>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={handleImageUpload}
                        >
                          {imageUploaded ? (
                            <>
                              <Check className="h-4 w-4 mr-2" />
                              Uploaded
                            </>
                          ) : (
                            "Upload Image"
                          )}
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Upload a professional photo for your profile. JPG or PNG, max 5MB.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Account Setup</h2>
                    
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="••••••••" 
                                {...field} 
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                                <span className="sr-only">
                                  {showPassword ? "Hide password" : "Show password"}
                                </span>
                              </Button>
                            </div>
                          </FormControl>
                          <FormDescription>
                            Must be at least 6 characters.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                type={showConfirmPassword ? "text" : "password"} 
                                placeholder="••••••••" 
                                {...field} 
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                                <span className="sr-only">
                                  {showConfirmPassword ? "Hide password" : "Show password"}
                                </span>
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I accept the{" "}
                            <Link 
                              href="/terms" 
                              className="text-primary hover:text-primary/80 transition-colors"
                            >
                              terms and conditions
                            </Link>
                          </FormLabel>
                          <FormDescription>
                            Including the $500 registration fee for teacher verification and platform access.
                          </FormDescription>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Register as Teacher"}
                  </Button>
                  
                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link 
                      href="/teacher/login" 
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      Log in
                    </Link>
                  </p>
                </form>
              </Form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Complete Your Registration</h2>
            <p className="text-muted-foreground mb-6">
              A one-time registration fee of $500 is required to join as a verified teacher.
              This covers profile verification, platform access, and premium listing benefits.
            </p>
            
            <div className="border rounded-md p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span>Registration Fee</span>
                <span>$500.00</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>$500.00</span>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">Card Details</label>
                <div className="border rounded-md p-3 flex">
                  <CreditCard className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">•••• •••• •••• 4242</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="w-1/2"
                onClick={() => {
                  setShowPaymentModal(false)
                  setIsSubmitting(false)
                }}
                disabled={paymentProcessing}
              >
                Cancel
              </Button>
              <Button 
                className="w-1/2"
                onClick={processPayment}
                disabled={paymentProcessing}
              >
                {paymentProcessing ? "Processing..." : "Pay $500"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}