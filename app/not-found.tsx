import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FrownIcon } from "lucide-react"

export default function NotFoundPage() {
  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
      <FrownIcon className="h-24 w-24 text-muted-foreground mb-6" />
      <h1 className="text-4xl md:text-5xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-md">
        Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/teachers">Find Teachers</Link>
        </Button>
      </div>
    </div>
  )
}