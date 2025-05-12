"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Star, 
  GraduationCap,
  BriefcaseIcon,
  MessageCircle,
  ArrowLeft
} from "lucide-react"

interface TeacherProfileProps {
  teacher: any
}

export function TeacherProfile({ teacher }: TeacherProfileProps) {
  const router = useRouter()
  
  return (
    <div className="container mx-auto px-4 py-12">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Teachers
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Teacher Profile Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-card shadow-sm rounded-lg overflow-hidden">
            <div className="aspect-[4/3] relative">
              <Image
                src={teacher.profileImage}
                alt={teacher.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-2">{teacher.name}</h1>
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin size={16} className="mr-1" />
                <span>{teacher.city}</span>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="font-normal">
                    {teacher.subject}
                  </Badge>
                  <div className="flex items-center">
                    <Star size={16} className="text-amber-500 mr-1" />
                    <span className="font-medium">{teacher.rating}</span>
                    <span className="text-sm text-muted-foreground ml-1">
                      ({teacher.reviews} reviews)
                    </span>
                  </div>
                </div>
                <p className="text-xl font-semibold">${teacher.price}/{teacher.priceUnit}</p>
              </div>
              
              <Button className="w-full mb-3" asChild>
                <a href="/chat">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact Teacher
                </a>
              </Button>
            </div>
          </div>
          
          {/* Teaching Details */}
          <div className="bg-card shadow-sm rounded-lg p-6 mt-6">
            <h3 className="font-medium mb-4">Teaching Details</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <BriefcaseIcon size={18} className="text-primary mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p>{teacher.experience}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <GraduationCap size={18} className="text-primary mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-muted-foreground">Education</p>
                  <p>{teacher.education}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock size={18} className="text-primary mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-muted-foreground">Availability</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {teacher.availability.map((day: string) => (
                      <Badge key={day} variant="outline" className="text-xs">
                        {day}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <Calendar size={18} className="text-primary mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-muted-foreground">Teaching Mode</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {teacher.teachingMode.map((mode: string) => (
                      <Badge key={mode} variant="outline" className="text-xs">
                        {mode}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Teacher Details */}
        <div className="md:col-span-2">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-6">
              <div className="bg-card shadow-sm rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">About {teacher.name}</h2>
                <p className="text-muted-foreground mb-6">{teacher.bio}</p>
                
                <h3 className="font-medium mb-3">What to expect</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-primary/5 p-4 rounded-lg flex">
                    <CheckCircle size={20} className="text-primary mr-3 shrink-0" />
                    <p className="text-sm">Personalized learning plans tailored to your needs</p>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-lg flex">
                    <CheckCircle size={20} className="text-primary mr-3 shrink-0" />
                    <p className="text-sm">Regular progress assessments and feedback</p>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-lg flex">
                    <CheckCircle size={20} className="text-primary mr-3 shrink-0" />
                    <p className="text-sm">Flexible scheduling to fit your availability</p>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-lg flex">
                    <CheckCircle size={20} className="text-primary mr-3 shrink-0" />
                    <p className="text-sm">Supplementary materials and practice resources</p>
                  </div>
                </div>
                
                <h3 className="font-medium mb-3">Subject expertise</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Calculus", "Algebra", "Geometry", "Statistics", "Trigonometry"].map((topic) => (
                    <Badge key={topic} variant="secondary">
                      {topic}
                    </Badge>
                  ))}
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">First Lesson Guarantee</h3>
                  <p className="text-sm text-muted-foreground">
                    Not satisfied with your first lesson? Let us know and we'll find you a different teacher or refund your payment.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="gallery" className="mt-6">
              <div className="bg-card shadow-sm rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[teacher.profileImage, ...teacher.galleryImages].map((image, index) => (
                    <div key={index} className="aspect-video relative rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`${teacher.name} teaching ${index}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="bg-card shadow-sm rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Student Reviews</h2>
                <div className="flex items-center mb-6">
                  <div className="mr-4">
                    <div className="text-2xl font-bold">{teacher.rating}</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < Math.floor(teacher.rating) ? "text-amber-500 fill-amber-500" : "text-muted-foreground"}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {teacher.reviews} reviews
                    </div>
                  </div>
                  <div className="grow">
                    {/* Rating breakdown */}
                    <div className="space-y-1">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center text-sm">
                          <span className="w-3">{rating}</span>
                          <Star size={12} className="text-amber-500 fill-amber-500 mx-1" />
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mx-2">
                            <div 
                              className="bg-amber-500 h-2 rounded-full" 
                              style={{ 
                                width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1}%` 
                              }}
                            ></div>
                          </div>
                          <span className="text-muted-foreground">
                            {rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Mock reviews */}
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border-b pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-center mb-2">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                          <Image
                            src={`https://images.pexels.com/photos/10${i}0/pexels-photo-10${i}0.jpeg?auto=compress&cs=tinysrgb&w=600`}
                            alt="Student"
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                        <div>
                          <p className="font-medium">Student {i}</p>
                          <div className="flex">
                            {[...Array(5)].map((_, j) => (
                              <Star
                                key={j}
                                size={14}
                                className={j < 5 ? "text-amber-500 fill-amber-500" : "text-muted-foreground"}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground ml-auto">2 weeks ago</span>
                      </div>
                      <p className="text-muted-foreground">
                        {i === 1 
                          ? `${teacher.name} is an excellent teacher! Very knowledgeable and patient. Explains complex concepts in a way that's easy to understand.` 
                          : i === 2 
                            ? `My grades have improved significantly since I started lessons with ${teacher.name}. Highly recommended for anyone struggling with ${teacher.subject}.` 
                            : `Great teacher who is very accommodating with scheduling. Always prepared and makes the lessons engaging and productive.`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}