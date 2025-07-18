"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, Brain, Home, FileText, BarChart3, Info } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useMChat } from "@/context/MChatContext"

const navigationItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
    description: "Return to homepage"
  },
  {
    title: "Assessment",
    href: "/questionnaire",
    icon: FileText,
    description: "Take the M-CHAT-R screening"
  },
  {
    title: "Result",
    href: "/result",
    icon: BarChart3,
    description: "View assessment results"
  },
  {
    title: "About",
    href: "/about",
    icon: Info,
    description: "Learn about M-CHAT-R"
  }
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { answers } = useMChat()
  const [isOpen, setIsOpen] = React.useState(false)

  const answeredCount = Object.keys(answers).length
  const progressPercentage = (answeredCount / 20) * 100

  const handleNavigation = (href: string) => {
    setIsOpen(false)
    router.push(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and Brand */}
        <Link 
          href="/" 
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight">M-CHAT-R</span>
            <span className="text-xs text-muted-foreground leading-tight">Autism Screener</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Button
                key={item.href}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "flex items-center space-x-2 px-3",
                  isActive && "bg-primary text-primary-foreground"
                )}
                onClick={() => handleNavigation(item.href)}
              >
                <Icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Button>
            )
          })}
        </nav>

        {/* Progress Indicator (Desktop) */}
        {answeredCount > 0 && (
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex flex-col items-end">
              <span className="text-xs font-medium text-muted-foreground">
                Progress
              </span>
              <span className="text-sm font-bold text-primary">
                {answeredCount}/20
              </span>
            </div>
            <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="px-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader className="text-left">
                <SheetTitle className="flex items-center space-x-2">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                    <Brain className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span>M-CHAT-R Navigation</span>
                </SheetTitle>
                <SheetDescription>
                  Navigate through the autism screening assessment
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-4">
                {/* Progress Indicator (Mobile) */}
                {answeredCount > 0 && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Assessment Progress</span>
                      <span className="text-sm font-bold text-primary">
                        {answeredCount}/20
                      </span>
                    </div>
                    <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {progressPercentage.toFixed(0)}% completed
                    </p>
                  </div>
                )}

                <Separator />

                {/* Navigation Items */}
                <nav className="space-y-2">
                  {navigationItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    
                    return (
                      <Button
                        key={item.href}
                        variant={isActive ? "default" : "ghost"}
                        className={cn(
                          "w-full justify-start space-x-3 h-12",
                          isActive && "bg-primary text-primary-foreground"
                        )}
                        onClick={() => handleNavigation(item.href)}
                      >
                        <Icon className="h-5 w-5" />
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-xs opacity-80">{item.description}</span>
                        </div>
                      </Button>
                    )
                  })}
                </nav>

                <Separator />

                {/* Additional Actions */}
                <div className="space-y-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start space-x-2"
                    onClick={() => {
                      // Add reset functionality if needed
                      setIsOpen(false)
                    }}
                  >
                    
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}