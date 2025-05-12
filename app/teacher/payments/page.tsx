"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Download, ArrowLeft, CalendarIcon } from "lucide-react"

// Import payments data
import paymentsData from "@/data/payments.json"

export default function PaymentsPage() {
  const router = useRouter()
  const [payments, setPayments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Check if teacher is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    const isTeacher = localStorage.getItem("isTeacher") === "true"
    
    if (!isLoggedIn || !isTeacher) {
      router.push("/teacher/login")
      return
    }
    
    // For demo, filter payments for first teacher
    const filteredPayments = paymentsData.filter(payment => payment.teacher === "1")
    setPayments(filteredPayments)
    setIsLoading(false)
  }, [router])
  
  // Function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/4 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Payment History</h1>
          <p className="text-muted-foreground">
            Track and manage your earnings and platform fees
          </p>
        </div>
        <Button className="mt-4 md:mt-0">
          <Download className="mr-2 h-4 w-4" />
          Download Statement
        </Button>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,400.00</div>
            <p className="text-xs text-muted-foreground mt-1">
              Since joining FindMyTeacher
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Platform Fees Paid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$495.00</div>
            <p className="text-xs text-muted-foreground mt-1">
              5% of total earnings
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current Month Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,350.00</div>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                +12% from last month
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="fees">Platform Fees</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                View all your financial transactions on FindMyTeacher
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">
                        {payment.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                          {formatDate(payment.date)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {payment.description || 
                          (payment.type === "registration" 
                            ? "Teacher Registration Fee" 
                            : payment.type === "platform_fee" 
                              ? "Monthly Platform Fee" 
                              : "Payment")}
                      </TableCell>
                      <TableCell className={payment.type === "platform_fee" ? "text-red-500" : ""}>
                        {payment.type === "platform_fee" ? "-" : ""}${payment.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={payment.status === "completed" ? "outline" : "secondary"}
                          className={payment.status === "completed" 
                            ? "bg-green-50 text-green-700 border-green-200" 
                            : "bg-amber-50 text-amber-700 border-amber-200"}
                        >
                          {payment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* Add mock lesson payments */}
                  <TableRow>
                    <TableCell className="font-medium">
                      p10
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        Mar 25, 2025
                      </div>
                    </TableCell>
                    <TableCell>
                      Lesson Payment - Emma Thompson
                    </TableCell>
                    <TableCell>
                      $180.00
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        completed
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      p11
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        Mar 22, 2025
                      </div>
                    </TableCell>
                    <TableCell>
                      Lesson Payment - Alex Rodriguez
                    </TableCell>
                    <TableCell>
                      $200.00
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        completed
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Previous</Button>
              <Button variant="outline">Next</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="earnings">
          <Card>
            <CardHeader>
              <CardTitle>Earnings History</CardTitle>
              <CardDescription>
                View your earnings from student lessons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      p10
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        Mar 25, 2025
                      </div>
                    </TableCell>
                    <TableCell>
                      Emma Thompson
                    </TableCell>
                    <TableCell>
                      $180.00
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        completed
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      p11
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        Mar 22, 2025
                      </div>
                    </TableCell>
                    <TableCell>
                      Alex Rodriguez
                    </TableCell>
                    <TableCell>
                      $200.00
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        completed
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      p9
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        Mar 18, 2025
                      </div>
                    </TableCell>
                    <TableCell>
                      Emma Thompson
                    </TableCell>
                    <TableCell>
                      $180.00
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        completed
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Previous</Button>
              <Button variant="outline">Next</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="fees">
          <Card>
            <CardHeader>
              <CardTitle>Platform Fees</CardTitle>
              <CardDescription>
                View platform fees charged (5% of your earnings)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.filter(p => p.type === "platform_fee").map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">
                        {payment.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                          {formatDate(payment.date)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {payment.description || "Monthly Platform Fee"}
                      </TableCell>
                      <TableCell className="text-red-500">
                        -${payment.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          {payment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Previous</Button>
              <Button variant="outline">Next</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}