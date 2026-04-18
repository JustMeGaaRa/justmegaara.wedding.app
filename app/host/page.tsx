import { getGuests } from "@/lib/guests";
import HostDashboard from "./HostDashboard";
import { headers } from "next/headers";
import { getAllRSVPs } from "@/lib/airtable";
import "../wedding.css";

export default async function HostPage() {
  const guests = getGuests();
  const rsvps = await getAllRSVPs();
  
  // Merge RSVP info into guests
  const guestsWithStats = guests.map(guest => {
    const rsvp = rsvps.find(r => r.fields.invitation_id === guest.id);
    return {
      ...guest,
      opens: rsvp?.fields.opens || 0,
      hasRSVP: !!rsvp?.fields.has_rsvp
    };
  });
  
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  return <HostDashboard guests={guestsWithStats} baseUrl={baseUrl} />;
}
