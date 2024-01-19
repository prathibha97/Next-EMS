import { useAppSelector } from '@/app/redux/hooks';
import {
  ResetPasswordFormSchema,
  ResetPasswordFormValues,
} from '@/lib/validation/reset-password-form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Image from 'next/image';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import RESET_PASSWORD from '../../public/reset_password.png';
import ActionButton from '../buttons/action-button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Input } from '../ui/input';

interface ResetPasswordProps {
  handleNextStep: () => void;
}

const ResetPassword: FC<ResetPasswordProps> = ({ handleNextStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const [loading, setLoading] = useState(false);

  const { email } = useAppSelector((state) => state.otp);

  const handleResetPassword = async (values: ResetPasswordFormValues) => {
    setLoading(true);
    try {
      await axios.post('/api/auth/reset', {
        email,
        password: values.newPassword,
      });
      handleNextStep();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <div>
        <Card className='m-4 sm:mb-0 sm:w-[25rem] grid'>
          <CardHeader>
            <div className='flex items-center justify-center mb-6 mt-3'>
              <Image
                src={RESET_PASSWORD}
                alt='reset-password'
                className='object-scale-down w-[80px]'
              />
            </div>

            <h2 className='text-[25px] text-primary text-center mb-4'>
              New Credentials
            </h2>
          </CardHeader>
          <CardContent>
            <p className='text-primary_font_color text-center'>
              Your identity has been verified!
            </p>

            <p className='text-primary_font_color text-center'>
              Set your new password
            </p>

            <form
              className='mt-8 mb-2 w-full max-w-screen-lg'
              onSubmit={handleSubmit(handleResetPassword)}
            >
              <div className='flex items-center gap-6 justify-between'></div>
              <div className='w-full mb-4'>
                <Input
                  type='password'
                  className='w-full'
                  placeholder='New Password'
                  {...register('newPassword')}
                />
              </div>
              <div className='w-full'>
                <Input
                  type='password'
                  className='w-full'
                  placeholder='Confirm Password'
                  {...register('confirmPassword')}
                />
              </div>
              {errors.newPassword && (
                <p className='text-red-500 mt-2'>
                  {errors.newPassword.message}
                </p>
              )}
              {errors.confirmPassword && (
                <p className='text-red-500 mt-2'>
                  {errors.confirmPassword.message}
                </p>
              )}

              <ActionButton
                className='mt-6 w-full'
                type='submit'
                disabled={!isValid}
                label='Reset Password'
                isLoading={loading}
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
