"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function StickyContactButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all"
        aria-label="Contact us"
      >
        <MessageCircle size={24} />
      </button>

      {/* Contact Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 bg-white rounded-lg shadow-xl border border-border w-80 max-w-[calc(100vw-2rem)]">
          <div className="p-4 border-b border-border flex justify-between items-center">
            <h3 className="font-semibold text-foreground">Quick Contact</h3>
            <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X size={20} />
            </button>
          </div>

          <div className="p-4 space-y-3">
            <p className="text-sm text-muted-foreground">
              Have a question? Get in touch with our team for immediate assistance.
            </p>

            <div className="space-y-2">
              <a
                href="tel:+254700000000"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary transition-colors text-sm text-foreground"
              >
                <span>📞</span>
                <span>+254 700 000 000</span>
              </a>
              <a
                href="mailto:info@joshina.com"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary transition-colors text-sm text-foreground"
              >
                <span>✉️</span>
                <span>info@joshina.com</span>
              </a>
            </div>

            <Button asChild className="w-full" size="sm">
              <Link href="/contact">Send Message</Link>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
