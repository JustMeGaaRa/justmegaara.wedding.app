import { getGuestById } from "@/lib/guests";
import WeddingApp from "@/app/WeddingApp";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function InvitePage({ params }: PageProps) {
  const { id } = await params;
  const guest = getGuestById(id);

  if (!guest) {
    redirect('/invite/not-found');
  }

  return <WeddingApp guestName={guest.name} />;
}
