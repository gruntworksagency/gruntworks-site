"use client"
import { cn } from "@/lib/utils"
// Removed import from @/components/ui/avatar
import type { TestimonialAuthorData } from "@/app/components/TestimonialsSection/types";

// Included Avatar components directly
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className,
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className,
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// Avatar components are now defined locally
// export { Avatar, AvatarImage, AvatarFallback }


export interface TestimonialCardProps {
  author: TestimonialAuthorData
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  const CardComponent = href ? 'a' : 'div'

  return (
    <CardComponent
      {...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        "relative flex flex-col rounded-lg overflow-hidden",
        "p-s sm:p-m text-start",
        "transition-all duration-200 ease-out", // Global motion: 200ms ease-out
        "bg-brand-charcoalBlack text-brand-creamWhite", // Use brand colors
        "hover:translate-y-[-4px] group",
        className
      )}
    >
      <div className="flex items-center gap-3 z-10">
        <Avatar className="h-12 w-12 film-grain-overlay"> {/* Apply overlay to Avatar root */}
          <AvatarImage
            src={author.avatarSrc}
            alt={author.name}
            className="grayscale" // Desaturation on the image itself
          />
          <AvatarFallback>{author.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-md font-semibold leading-none text-brand-creamWhite">
            {author.name}
          </h3>
          <p className="text-sm text-brand-creamWhite/80">
            {author.title}
          </p>
        </div>
      </div>
      <p className="sm:text-md mt-s text-sm text-brand-creamWhite/80 z-10">
        {text}
      </p>

      <div
        className={cn(
          "absolute inset-0 z-0 opacity-10 transition-opacity duration-200 ease-out",
          "bg-blend-overlay"
        )}
        style={{ backgroundImage: "url('/textures/soil-grain-overlay.png')" }}
      />
    </CardComponent>
  )
} 