import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { subscribeNewsletter } from "@/lib/public.functions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function NewsletterForm() {
  const subscribe = useServerFn(subscribeNewsletter);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!email.trim()) return;
        setLoading(true);
        try {
          await subscribe({ data: { email: email.trim() } });
          toast.success("Subscribed! Thanks for joining.");
          setEmail("");
        } catch (err) {
          toast.error(err instanceof Error ? err.message : "Could not subscribe");
        } finally {
          setLoading(false);
        }
      }}
      className="flex gap-2"
    >
      <Input
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-full bg-background"
      />
      <Button type="submit" disabled={loading} className="rounded-full">
        {loading ? "…" : "Subscribe"}
      </Button>
    </form>
  );
}
