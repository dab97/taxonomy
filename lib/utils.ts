import * as React from "react"
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { env } from "@/env.mjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("ru-Ru", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  })
}

export function formatNumber(input: number | bigint) {
  return Intl.NumberFormat("en-US").format(input)
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}

export function getContentFromChildren(children: React.ReactNode): string {
  if (Array.isArray(children)) {
    return children.map(getContentFromChildren).join("")
  } else if (typeof children === "string") {
    return children
  } else if (
    React.isValidElement(children) &&
    children.props &&
    children.props.children
  ) {
    return getContentFromChildren(children.props.children)
  }
  return ""
}

export async function copyCodeToClipboard(content: string) {
  try {
    await navigator.clipboard.writeText(content)
    console.log("Code copied to clipboard")
  } catch (err) {
    console.error("Failed to copy code to clipboard", err)
  }
}
