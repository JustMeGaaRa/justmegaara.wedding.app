import { getGuestById } from "@/lib/guests";
import { getQuestionnaire } from "@/lib/questionnaire";
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

  const questionnaire = getQuestionnaire();

  return <WeddingApp 
    guestName={guest.name} 
    inviteId={guest.id} 
    questions={questionnaire} 
  />;
}
