"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"
import TeacherCard from "@/components/ui/TeacherCard"

// Import teachers data
import teachersData from "@/data/teachers.json"

export default function TeachersPage() {
  const [teachers, setTeachers] = useState(teachersData)
  const [filteredTeachers, setFilteredTeachers] = useState(teachersData)
  const [searchQuery, setSearchQuery] = useState("")
  const [subject, setSubject] = useState("all")
  const [location, setLocation] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 100])
  
  // Extract unique subjects and locations
  const subjects = ["all", ...new Set(teachers.map(teacher => teacher.subject))]
  const locations = ["all", ...new Set(teachers.map(teacher => teacher.city))]
  
  // Filter teachers based on selected criteria
  useEffect(() => {
    let filtered = [...teachers]
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(teacher => 
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.city.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Filter by subject
    if (subject && subject !== "all") {
      filtered = filtered.filter(teacher => teacher.subject === subject)
    }
    
    // Filter by location
    if (location && location !== "all") {
      filtered = filtered.filter(teacher => teacher.city === location)
    }
    
    // Filter by price range
    filtered = filtered.filter(teacher => 
      teacher.price >= priceRange[0] && teacher.price <= priceRange[1]
    )
    
    setFilteredTeachers(filtered)
  }, [teachers, searchQuery, subject, location, priceRange])
  
  // Handle price range change
  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value)
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Find Your Perfect Teacher</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse our qualified teachers and find the perfect match for your learning needs.
        </p>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-card shadow-sm rounded-lg p-6 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Search Input */}
          <div className="md:col-span-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, subject, or location..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Subject Filter */}
          <div>
            <Label htmlFor="subject-filter">Subject</Label>
            <Select
              value={subject}
              onValueChange={setSubject}
            >
              <SelectTrigger id="subject-filter" className="w-full">
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((sub) => (
                  <SelectItem key={sub} value={sub}>
                    {sub === "all" ? "All Subjects" : sub}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Location Filter */}
          <div>
            <Label htmlFor="location-filter">Location</Label>
            <Select
              value={location}
              onValueChange={setLocation}
            >
              <SelectTrigger id="location-filter" className="w-full">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc === "all" ? "All Locations" : loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Price Range Filter */}
          <div className="md:col-span-2">
            <div className="mb-2 flex justify-between">
              <Label>Price Range ($/hour)</Label>
              <span className="text-sm text-muted-foreground">
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            </div>
            <Slider
              defaultValue={[0, 100]}
              max={100}
              step={5}
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              className="py-4"
            />
          </div>
        </div>
      </div>
      
      {/* Teachers Grid */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            {filteredTeachers.length} Teachers Available
          </h2>
          <Select defaultValue="price_low">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="reviews">Most Reviews</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {filteredTeachers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTeachers.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                id={teacher.id}
                name={teacher.name}
                subject={teacher.subject}
                city={teacher.city}
                price={teacher.price}
                priceUnit={teacher.priceUnit}
                rating={teacher.rating}
                reviews={teacher.reviews}
                profileImage={teacher.profileImage}
                experience={teacher.experience}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No teachers found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters to find more teachers.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSubject("all")
                setLocation("all")
                setPriceRange([0, 100])
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}