"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { mockTestimonials } from "@/lib/mock-testimonials-data"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? mockTestimonials.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === mockTestimonials.length - 1 ? 0 : prev + 1))
  }

  const currentTestimonial = mockTestimonials[currentIndex]

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from satisfied clients who found success with Joshina International Properties.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={currentTestimonial.image || "/placeholder.svg"}
                  alt={currentTestimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-foreground">{currentTestimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{currentTestimonial.title}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                  <Star key={i} size={20} className="fill-primary text-primary" />
                ))}
              </div>

              <p className="text-lg text-foreground mb-8 leading-relaxed italic">"{currentTestimonial.content}"</p>

              <div className="flex justify-center gap-4">
                <Button onClick={goToPrevious} variant="outline" size="sm">
                  <ChevronLeft size={20} />
                </Button>
                <div className="flex gap-2">
                  {mockTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex ? "bg-primary w-8" : "bg-muted-foreground"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                <Button onClick={goToNext} variant="outline" size="sm">
                  <ChevronRight size={20} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
