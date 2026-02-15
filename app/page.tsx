import { getProfile } from "@/lib/profile";
import PageContent from "@/components/page-content";

export default async function Home() {
  const profile = await getProfile();
  return <PageContent profile={profile} />;
}
