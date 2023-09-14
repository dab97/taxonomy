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
      <header className="sticky top-0 z-40 supports-backdrop-blur:bg-background/60 backdrop-blur bg-background/75 w-full border-b">
        <div className=" container mx-auto flex h-16 items-center justify-between space-x-0 content-between py-6">
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
