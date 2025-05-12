import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TeacherCardProps {
  id: string
  name: string
  subject: string
  city: string
  price: number
  priceUnit: string
  rating: number
  reviews: number
  profileImage: string
  experience?: string
}

export default function TeacherCard({
  id,
  name,
  subject,
  city,
  price,
  priceUnit,
  rating,
  reviews,
  profileImage,
  experience,
}: TeacherCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="aspect-[4/3] relative">
        <Image
          src={profileImage}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-medium">{name}</h3>
          <Badge variant="outline" className="bg-accent/10 text-accent-foreground">
            ${price}/{priceUnit}
          </Badge>
        </div>
        
        <div className="flex items-center text-muted-foreground mb-2">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{city}</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary" className="font-normal">
            {subject}
          </Badge>
          
          {experience && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock size={14} className="mr-1" />
              <span>{experience}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center mt-3">
          <div className="flex items-center">
            <Star size={16} className="text-amber-500 mr-1" />
            <span className="font-medium">{rating}</span>
          </div>
          <span className="text-sm text-muted-foreground ml-2">
            ({reviews} reviews)
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0">
        <Button asChild className="w-full">
          <Link href={`/teachers/${id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}