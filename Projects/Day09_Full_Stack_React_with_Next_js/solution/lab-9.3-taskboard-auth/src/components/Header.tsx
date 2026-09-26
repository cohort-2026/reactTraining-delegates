import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

// An async Server Component. Showing "Signed in as ..." here is a
// courtesy, not the security boundary: every protected page and every
// task Server Action calls getClaims() again on its own.
export async function Header() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const email = data?.claims?.email as string | undefined;

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 p-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          TaskBoard
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          {email && (
            <form action={logout} className="flex items-center gap-2">
              <span className="text-muted-foreground">{email}</span>
              <Button type="submit" variant="ghost" size="sm">Log out</Button>
            </form>
          )}
          <Link href="/settings" className="text-muted-foreground hover:text-foreground">
            Settings
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
