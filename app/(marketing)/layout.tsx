import Link from "next/link"
import { getServerSession } from "next-auth/next"

import { marketingConfig } from "@/config/marketing"
import { authOptions } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { UserAccountNav } from "@/components/user-account-nav"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const session = await getServerSession(authOptions)
  return (
    <div className="flex min-h-screen flex-col">
      <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 flex w-full border-b bg-background/75 backdrop-blur">
        <div className=" container mx-auto flex h-16 content-between items-center justify-between space-x-0 py-6">
          <MainNav items={marketingConfig.mainNav} />
          <nav>
            {session?.user ? (
              <UserAccountNav
                user={{
                  name: session.user.name,
                  image: session.user.image,
                  email: session.user.email,
                }}
              />
            ) : (
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "px-4"
                )}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
