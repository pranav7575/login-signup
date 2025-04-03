// app/profile/page.js
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Task from '@/components/task';

export default async function Profile() {
  // Fetch the session
  const session = await auth();

  // Redirect if there's no session
  if (!session) {
    redirect('/');
  }

  // Pass the user data to the Client Component
  return <Task user={session.user} />;
}