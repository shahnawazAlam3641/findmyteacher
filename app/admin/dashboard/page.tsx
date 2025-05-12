"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Users, 
  GraduationCap, 
  DollarSign, 
  MessageSquare 
} from "lucide-react"

// Import mock data
import teachersData from "@/data/teachers.json"
import paymentsData from "@/data/payments.json"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  
  // Simple mock admin check
  useEffect(() => {
    // For demo purposes, we'll just simulate an admin check
    const isAdmin = true
    
    if (!isAdmin) {
      router.push("/login")
      return
    }
    
    setIsLoading(false)
  }, [router])
  
  // Mock stats
  const stats = {
    totalStudents: 45,
    totalTeachers: teachersData.length,
    totalRevenue: paymentsData.reduce((sum, payment) => sum + payment.amount, 0),
    activeChats: 12,
    pendingVerifications: 3,
    thisWeekRegistrations: 5
  }
  
  // Mock recent users
  const recentUsers = [
    { id: "u1", name: "Emma Thompson", type: "Student", date: "Mar 26, 2025" },
    { id: "u2", name: "Alex Rodriguez", type: "Student", date: "Mar 25, 2025" },
    { id: "u3", name: "Robert Lee", type: "Teacher", date: "Mar 24, 2025" },
    { id: "u4", name: "Sophie Bennett", type: "Student", date: "Mar 23, 2025" },
    { id: "u5", name: "James Wilson", type: "Teacher", date: "Mar 22, 2025" }
  ]
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/4 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded" />
          </div>
          <div className="h-96 bg-slate-200 dark:bg-slate-700 rounded" />
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <h3 className="text-2xl font-bold">{stats.totalStudents}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Teachers</p>
                <h3 className="text-2xl font-bold">{stats.totalTeachers}</h3>
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
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <h3 className="text-2xl font-bold">${stats.totalRevenue}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Chats</p>
                <h3 className="text-2xl font-bold">{stats.activeChats}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.type}</TableCell>
                    <TableCell>{user.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Platform Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-muted-foreground">Pending Verifications</span>
                <span className="font-medium">{stats.pendingVerifications}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-muted-foreground">This Week Registrations</span>
                <span className="font-medium">{stats.thisWeekRegistrations}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-muted-foreground">Average Response Time</span>
                <span className="font-medium">3.2 hours</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-muted-foreground">Total Subjects Covered</span>
                <span className="font-medium">24</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-muted-foreground">Platform Fee Rate</span>
                <span className="font-medium">5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Cities Covered</span>
                <span className="font-medium">12</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Teacher Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Rate ($/hour)</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachersData.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">{teacher.name}</TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell>{teacher.city}</TableCell>
                  <TableCell>${teacher.price}</TableCell>
                  <TableCell>{teacher.rating} ({teacher.reviews} reviews)</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}