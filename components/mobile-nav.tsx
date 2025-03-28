"use client"
import Link from "next/link"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface MobileNavProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileNav({ isOpen, onOpenChange }: MobileNavProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-mint">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-left text-xl font-semibold text-amber-700">Elsa Skincare</SheetTitle>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={() => onOpenChange(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </SheetHeader>
        <div className="mt-6 flex flex-col space-y-3">
          <Link
            href="/"
            className="rounded-md px-3 py-2 text-lg font-medium text-amber-900 transition-colors hover:bg-amber-50 hover:text-amber-700"
            onClick={() => onOpenChange(false)}
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="rounded-md px-3 py-2 text-lg font-medium text-amber-900 transition-colors hover:bg-amber-50 hover:text-amber-700"
            onClick={() => onOpenChange(false)}
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="rounded-md px-3 py-2 text-lg font-medium text-amber-900 transition-colors hover:bg-amber-50 hover:text-amber-700"
            onClick={() => onOpenChange(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="rounded-md px-3 py-2 text-lg font-medium text-amber-900 transition-colors hover:bg-amber-50 hover:text-amber-700"
            onClick={() => onOpenChange(false)}
          >
            Contact
          </Link>
          <div className="pt-4">
            <Link href="/sign-in" passHref>
              <Button
                variant="outline"
                className="w-full justify-center border-amber-200 text-amber-700 hover:bg-amber-50"
                onClick={() => onOpenChange(false)}
              >
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up" passHref>
              <Button
                className="mt-3 w-full justify-center bg-amber-700 hover:bg-amber-800 text-mint"
                onClick={() => onOpenChange(false)}
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

