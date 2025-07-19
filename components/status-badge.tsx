"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: string
  variant?: "success" | "error" | "info" | "warning" | "primary" | "secondary"
}

export function StatusBadge({ status, variant, className, ...props }: StatusBadgeProps) {
  // Determine variant based on status if not explicitly provided
  const badgeVariant = variant || getBadgeVariantFromStatus(status)

  // Map of variants to their respective Tailwind styles
  const variantClasses = {
    success: "bg-[#56CA00]/[0.16] text-[#56CA00]",
    error: "bg-[#FF4C51]/[0.16] text-[#FF4C51]",
    info: "bg-[#16B1FF]/[0.16] text-[#16B1FF]",
    warning: "bg-[#FFB400]/[0.16] text-[#FFB400]",
    primary: "bg-[#8C57FF]/[0.16] text-[#8C57FF]",
    secondary: "bg-[#8A8D93]/[0.16] text-[#8A8D93]",
  }

  // Get the appropriate style based on the variant
  const badgeClass = variantClasses[badgeVariant] || variantClasses.secondary

  // Format the display text
  const displayText = formatStatusText(status)

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        badgeClass,
        className,
      )}
      {...props}
    >
      {displayText}
    </span>
  )
}

// Helper function to determine badge variant from status string
function getBadgeVariantFromStatus(status: string): StatusBadgeProps["variant"] {
  const lowercaseStatus = status.toLowerCase()

  if (
    lowercaseStatus.includes("success") ||
    lowercaseStatus.includes("active") ||
    lowercaseStatus.includes("approved") ||
    lowercaseStatus.includes("completed") ||
    lowercaseStatus.includes("paid") ||
    lowercaseStatus.includes("refund")
  ) {
    return "success"
  }

  if (
    lowercaseStatus.includes("error") ||
    lowercaseStatus.includes("failed") ||
    lowercaseStatus.includes("rejected") ||
    lowercaseStatus.includes("inactive")
  ) {
    return "error"
  }

  if (lowercaseStatus.includes("info") || lowercaseStatus.includes("confirmed") || lowercaseStatus.includes("review")) {
    return "info"
  }

  if (
    lowercaseStatus.includes("warning") ||
    lowercaseStatus.includes("pending") ||
    lowercaseStatus.includes("upcoming") ||
    lowercaseStatus.includes("additional payment")
  ) {
    return "warning"
  }

  if (lowercaseStatus.includes("primary")) {
    return "primary"
  }

  return "secondary"
}

// Helper function to format status text for display
function formatStatusText(status: string): string {
  // If the status is a simple string like "active", "pending", etc., capitalize it
  if (/^[a-z]+$/i.test(status)) {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
  }

  // Otherwise, return the status as is (it might already be formatted)
  return status
}
