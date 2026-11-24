import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-20 text-center">
      <p className="de text-5xl font-semibold">404</p>
      <p className="mt-3 text-ink-2">Diese Seite gibt es nicht.</p>
      <Link href="/" className="mt-6 inline-block text-sm underline">
        Back to today
      </Link>
    </div>
  );
}
