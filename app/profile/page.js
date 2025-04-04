// app/profile/page.js
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import ProfileClient from '@/components/ProfileClient';

export default async function Profile() {
  // Fetch the session
  const session = await auth();

  // Redirect if there's no session
  if (!session) {
    redirect('/');
  }

  // Pass the user data to the Client Component
  return <ProfileClient user={session.user} />;
}