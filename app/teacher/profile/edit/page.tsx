"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
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
import { toast } from "sonner"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Upload, Check } from "lucide-react"

// Import teacher data
import teachersData from "@/data/teachers.json"

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
  teachingMode: z.array(z.string()).min(1, {
    message: "Please select at least one teaching mode.",
  }),
  availability: z.array(z.string()).min(1, {
    message: "Please select at least one day of availability.",
  }),
})

export default function EditProfilePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageUploaded, setImageUploaded] = useState(false)
  const [galleryUploaded, setGalleryUploaded] = useState(false)
  const [teacher, setTeacher] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // Possible form options
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
  
  const teachingModes = [
    "Online",
    "In-person",
    "Group sessions",
    "One-on-one"
  ]
  
  const days = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
  ]
  
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
      teachingMode: [],
      availability: [],
    },
  })
  
  // Check if teacher is logged in and populate form
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    const isTeacher = localStorage.getItem("isTeacher") === "true"
    
    if (!isLoggedIn || !isTeacher) {
      router.push("/teacher/login")
      return
    }
    
    // For demo purposes, use the first teacher from data
    const teacherData = teachersData[0]
    setTeacher(teacherData)
    
    // Populate form with teacher data
    form.reset({
      name: teacherData.name,
      email: teacherData.email,
      phone: "555-123-4567", // Mock data
      subject: teacherData.subject,
      city: teacherData.city,
      bio: teacherData.bio,
      experience: teacherData.experience,
      education: teacherData.education,
      price: String(teacherData.price),
      teachingMode: teacherData.teachingMode,
      availability: teacherData.availability,
    })
    
    setImageUploaded(true)
    setGalleryUploaded(true)
    setIsLoading(false)
  }, [form, router])

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log(values)
      toast.success("Profile updated successfully!")
      router.push("/teacher/dashboard")
      setIsSubmitting(false)
    }, 1500)
  }
  
  function handleImageUpload() {
    // Simulate image upload
    setTimeout(() => {
      setImageUploaded(true)
      toast.success("Profile image updated successfully!")
    }, 1000)
  }
  
  function handleGalleryUpload() {
    // Simulate gallery upload
    setTimeout(() => {
      setGalleryUploaded(true)
      toast.success("Gallery images uploaded successfully!")
    }, 1000)
  }
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse max-w-3xl mx-auto space-y-4">
          <div className="h-8 w-1/3 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded" />
          </div>
        </div>
      </div>
    )
  }
  
  if (!teacher) return null

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Edit Your Profile</h1>
          <p className="text-muted-foreground">
            Update your information to keep your teaching profile current and attractive to potential students.
          </p>
        </div>
        
        <div className="bg-card shadow-sm rounded-lg p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                          <Input {...field} />
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
                          <Input {...field} />
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
                          <Input {...field} />
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
                          <Input {...field} />
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
                            <SelectValue />
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
                              <SelectValue />
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
                          <Input type="number" {...field} />
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
                        <Input {...field} />
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
                
                <FormField
                  control={form.control}
                  name="teachingMode"
                  render={() => (
                    <FormItem>
                      <FormLabel>Teaching Mode</FormLabel>
                      <div className="space-y-2">
                        {teachingModes.map((mode) => (
                          <FormField
                            key={mode}
                            control={form.control}
                            name="teachingMode"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={mode}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(mode)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, mode])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== mode
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {mode}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="availability"
                  render={() => (
                    <FormItem>
                      <FormLabel>Availability</FormLabel>
                      <div className="space-y-2">
                        {days.map((day) => (
                          <FormField
                            key={day}
                            control={form.control}
                            name="availability"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={day}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(day)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, day])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== day
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {day}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
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
                          src={teacher.profileImage} 
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
                          Change Image
                        </>
                      ) : (
                        "Upload Image"
                      )}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <FormLabel>Gallery Images</FormLabel>
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryUploaded && teacher.galleryImages ? (
                      teacher.galleryImages.map((image: string, index: number) => (
                        <div key={index} className="relative aspect-video rounded-md overflow-hidden bg-muted">
                          <Image 
                            src={image} 
                            alt={`Gallery ${index + 1}`} 
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={handleGalleryUpload}
                          className="w-full py-8"
                        >
                          <Upload className="h-6 w-6 mr-2" />
                          Upload Gallery Images
                        </Button>
                      </div>
                    )}
                    
                    {galleryUploaded && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleGalleryUpload}
                        className="h-full aspect-video flex flex-col items-center justify-center"
                      >
                        <Upload className="h-6 w-6 mb-2" />
                        <span>Add More</span>
                      </Button>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Upload images of your teaching environment or previous classes (with permission).
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.push("/teacher/dashboard")}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}