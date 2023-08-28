'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { ProfileForm } from './profile-form';

export default function SettingsProfilePage() {
  const session = useSession();
  const router = useRouter();

  // if (session.status === 'unauthenticated') {
  //   router.push('/');
  // }
  return (
    <div className='container space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Profile</h3>
        <p className='text-sm text-muted-foreground'>
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}
