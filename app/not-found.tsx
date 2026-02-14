import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="text-center">
        <h1 className="font-sora text-6xl font-bold text-foreground">404</h1>
        <p className="mt-4 text-xl text-muted-foreground">Page not found</p>
        <p className="mt-2 text-muted-foreground">
          Sorry, the page you're looking for doesn't exist. Let's get you back on track.
        </p>
        <Button asChild className="mt-8 bg-primary hover:bg-blue-600">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
