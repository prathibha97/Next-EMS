import usePasswordResetModal from '@/hooks/usePasswordResetModal';
import Image from 'next/image';
import PASSWORD_UPDATED from '../../public/password_updated.png';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';

function PasswordUpdated() {
  const loginModal = usePasswordResetModal();
  return (
    <div className='flex flex-col items-center justify-center'>
      <div>
        <Card className=' m-4 sm:mb-0 sm:w-[25rem] grid'>
          <CardHeader>
            <div className='flex items-center justify-center mb-6'>
              <Image
                src={PASSWORD_UPDATED}
                alt='password-updated'
                className='object-scale-down w-[80px]'
              />
            </div>

            <h2 className='text-[25px] text-primary text-center mb-4'>
              Password Updated
            </h2>
          </CardHeader>
          <CardContent>
            <p className='text-primary_font_color text-center'>
              Your password has been updated!
            </p>

            <p className='text-primary_font_color text-center'>
              Sign in with your new password
            </p>

            <div className='mt-6 mb-2 w-full max-w-screen-lg '>
              <Button className='mt-6 w-full' onClick={loginModal.onClose}>
                <h6 className='normal-case'>Login</h6>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PasswordUpdated;
