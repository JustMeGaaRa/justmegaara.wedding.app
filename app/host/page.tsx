import { getGuests } from "@/lib/guests";
import HostDashboard from "./HostDashboard";
import { headers } from "next/headers";
import "../wedding.css";

export default async function HostPage() {
  const guests = getGuests();
  
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  return <HostDashboard guests={guests} baseUrl={baseUrl} />;
}
