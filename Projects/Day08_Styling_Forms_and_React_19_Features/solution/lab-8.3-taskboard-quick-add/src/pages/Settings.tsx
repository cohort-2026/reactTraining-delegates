import { ThemeButton } from "@/components/ThemeButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

export default function Settings() {
  const { user, logout } = useAuth();

  return (
    <section className="grid max-w-md gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center justify-between gap-2">
          <p>Signed in as {user?.name}.</p>
          <Button variant="outline" onClick={logout}>Log out</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <ThemeButton />
        </CardContent>
      </Card>
    </section>
  );
}
