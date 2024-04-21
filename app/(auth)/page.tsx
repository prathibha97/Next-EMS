import { UserAuthForm } from '@/app/(auth)/components/user-auth-form';

export default function AuthenticationPage() {
  return (
    <div className='h-screen flex items-center justify-center m-5'>
      <div className='container w-[500px] flex flex-col justify-center border rounded-md md:p-10 items-center'>
        {/* <Image
          src={'/logo.png'}
          alt='Image'
          width={90}
          height={90}
          className='rounded-lg'
        /> */}
        <UserAuthForm className='' />
      </div>
    </div>
  );
}
