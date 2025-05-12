"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  MessageSquare,
  DollarSign,
  BarChart,
  PencilIcon,
  Calendar,
  Activity,
  Star
} from "lucide-react"

// Import teacher data
import teachersData from "@/data/teachers.json"
import chatsData from "@/data/chats.json"

export default function TeacherDashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [teacher, setTeacher] = useState<any>(null)
  
  // Mock data for teacher dashboard
  const mockStudents = [
    {
      id: "s1",
      name: "Emma Thompson",
      subject: "Mathematics",
      lastMessage: "2 days ago",
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: "s2",
      name: "Alex Rodriguez",
      subject: "Mathematics",
      lastMessage: "5 days ago",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ]
  
  const mockStats = {
    totalStudents: 2,
    activeChats: 2,
    totalEarnings: 4500,
    overallRating: 4.8,
    lessonsThisMonth: 12,
    upcomingLessons: 3
  }
  
  const upcomingLessons = [
    {
      id: "l1",
      student: "Emma Thompson",
      date: "Tomorrow, 4:00 PM",
      subject: "Algebra"
    },
    {
      id: "l2",
      student: "Alex Rodriguez",
      date: "Friday, 5:00 PM",
      subject: "Calculus"
    },
    {
      id: "l3",
      student: "New Student",
      date: "Saturday, 10:00 AM",
      subject: "Trigonometry"
    }
  ]
  
  useEffect(() => {
    // Check if teacher is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    const isTeacher = localStorage.getItem("isTeacher") === "true"
    
    if (!isLoggedIn || !isTeacher) {
      router.push("/teacher/login")
      return
    }
    
    // For demo purposes, use the first teacher from data
    setTeacher(teachersData[0])
    setIsLoading(false)
  }, [router])
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/4 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
          <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="h-40 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-40 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-40 bg-slate-200 dark:bg-slate-700 rounded" />
          </div>
        </div>
      </div>
    )
  }
  
  if (!teacher) return null
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome, {teacher.name}</h1>
          <p className="text-muted-foreground">
            Manage your teaching profile, connect with students, and monitor your progress.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button variant="outline" asChild>
            <Link href="/teacher/profile/edit">
              <PencilIcon className="mr-2 h-4 w-4" />
              Edit Profile
            </Link>
          </Button>
          <Button asChild>
            <Link href="/chat">
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Students</p>
                <h3 className="text-2xl font-bold">{mockStats.totalStudents}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lessons This Month</p>
                <h3 className="text-2xl font-bold">{mockStats.lessonsThisMonth}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <h3 className="text-2xl font-bold">${mockStats.totalEarnings}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overall Rating</p>
                <h3 className="text-2xl font-bold">{mockStats.overallRating}/5</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Upcoming Lessons</CardTitle>
                  <CardDescription>Your scheduled lessons for the next week</CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingLessons.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingLessons.map((lesson) => (
                        <div key={lesson.id} className="flex justify-between items-start border-b pb-4 last:border-0 last:pb-0">
                          <div>
                            <p className="font-medium">{lesson.student}</p>
                            <p className="text-sm text-muted-foreground">{lesson.subject}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm">{lesson.date}</p>
                            <Button variant="link" className="text-sm h-auto p-0">View Details</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No upcoming lessons scheduled</p>
                      <Button variant="outline" className="mt-4">
                        Check Availability
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Profile Stats</CardTitle>
                  <CardDescription>Your profile performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">Profile Views</p>
                      <p className="font-medium">48</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">Contact Rate</p>
                      <p className="font-medium">15%</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">Response Time</p>
                      <p className="font-medium">3 hours</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">Completion Rate</p>
                      <p className="font-medium">95%</p>
                    </div>
                    
                    <div className="pt-4 mt-4 border-t">
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/teacher/profile/edit">
                          Update Profile
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Your latest student communications</CardDescription>
              </CardHeader>
              <CardContent>
                {chatsData.length > 0 ? (
                  <div className="space-y-4">
                    {chatsData.map((chat) => {
                      const lastMessage = chat.messages[chat.messages.length - 1];
                      return (
                        <div key={chat.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex items-center">
                            <div className="relative h-10 w-10 rounded-full overflow-hidden mr-4">
                              <Image 
                                src={chat.participants.student.image}
                                alt={chat.participants.student.name}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{chat.participants.student.name}</p>
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {lastMessage.text}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-muted-foreground">
                              {new Date(lastMessage.timestamp).toLocaleDateString()}
                            </p>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href="/chat">Reply</Link>
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No recent messages</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Your Students</CardTitle>
              <CardDescription>Students you are currently teaching</CardDescription>
            </CardHeader>
            <CardContent>
              {mockStudents.length > 0 ? (
                <div className="space-y-6">
                  {mockStudents.map((student) => (
                    <div key={student.id} className="flex justify-between items-center border-b pb-6 last:border-0 last:pb-0">
                      <div className="flex items-center">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                          <Image 
                            src={student.image}
                            alt={student.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">{student.subject}</p>
                          <p className="text-xs text-muted-foreground">Last message: {student.lastMessage}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/chat">Message</Link>
                        </Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">You don't have any students yet</p>
                  <Button asChild>
                    <Link href="/teacher/profile/edit">Complete Your Profile</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
                <CardDescription>Your earnings for the past 6 months</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <Activity className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Earnings chart visualization</p>
                  <Button variant="link" asChild>
                    <Link href="/teacher/payments">View Detailed Report</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Student Growth</CardTitle>
                <CardDescription>New students over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Student growth visualization</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}