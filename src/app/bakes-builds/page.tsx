import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default function BakesBuildsRedirect() {
  redirect('/blog?category=builds');
}
