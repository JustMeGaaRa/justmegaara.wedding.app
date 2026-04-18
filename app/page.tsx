import WeddingApp from "./WeddingApp";

interface PageProps {
  searchParams: Promise<{ guest?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const rawGuest = params.guest || "друже";
  
  let guestName = rawGuest;
  try {
    guestName = decodeURIComponent(rawGuest);
  } catch {
    // Keep as is if decoding fails
  }

  return <WeddingApp guestName={guestName} />;
}
