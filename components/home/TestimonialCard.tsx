import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  text: string
  image: string
  rating: number
  location: string
}

export default function TestimonialCard({
  name,
  text,
  image,
  rating,
  location,
}: TestimonialCardProps) {
  return (
    <Card className="h-full border-none shadow-md hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div>
            <p className="font-medium text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
        </div>
        
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < rating ? "text-amber-500 fill-amber-500" : "text-muted-foreground"}
            />
          ))}
        </div>
        
        <p className="text-muted-foreground flex-grow">{text}</p>
      </CardContent>
    </Card>
  )
}