import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ThemeToggle } from "@/components/ThemeToggle";

// An async Server Component. It checks the session itself so the header
// can show "Signed in as ..." without every page having to pass it down.
// This is a courtesy display, not the security boundary: each protected
// page and Server Action checks getClaims() again on its own.
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
          {email && <p className="text-muted-foreground">Signed in as {email}</p>}
          <Link href="/settings" className="text-muted-foreground hover:text-foreground">
            Settings
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
