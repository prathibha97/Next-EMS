'use client';
import { setAuthenticated } from '@/app/redux/features/authSlice';
import { useAppDispatch } from '@/app/redux/hooks';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Icons } from '../../../../components/icons';
import { Button } from '../../../../components/ui/button';
import { FormInput } from '../../../../components/ui/formInput';
import { Label } from '../../../../components/ui/label';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
type Variant = 'LOGIN' | 'REGISTER';

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const session = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [variant, setVariant] = useState<Variant>('LOGIN');

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      await axios
        .post(`/api/register`, data)
        .then(() => {
          signIn('credentials', data);
        })
        .catch(() => {
          return toast({
            title: 'Something went wrong!',
            description: 'Could not register, please try again',
            variant: 'destructive',
          });
        })
        .finally(() => setIsLoading(false));
    }
    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            return toast({
              title: 'Something went wrong!',
              description: 'Could not sign in, please try again',
              variant: 'destructive',
            });
          }

          if (callback?.ok && !callback?.error) {
            // Dispatch actions to update authentication state and user data
            dispatch(setAuthenticated(true));
            // dispatch(setUser(session.data?.user));
            return toast({
              title: 'Logged in successfully',
            });
          }
          router.push('/dashboard');
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>
          {variant === 'LOGIN' ? 'Login to your account' : 'Create an account'}
        </h1>
        <p className='text-sm text-muted-foreground'>
          {variant === 'LOGIN'
            ? 'Login to your account'
            : 'Enter your email and password below to create your account'}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-2'>
          <div className='grid gap-4'>
            <Label className='sr-only' htmlFor='email'>
              Email
            </Label>
            <FormInput
              id='email'
              placeholder='name@example.com'
              type='email'
              register={register}
              errors={errors}
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect='off'
              disabled={isLoading}
            />
            <Label className='sr-only' htmlFor='email'>
              Email
            </Label>
            <FormInput
              id='password'
              register={register}
              errors={errors}
              placeholder='Enter your password'
              type='password'
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            )}
            {variant === 'LOGIN' ? 'Login' : 'Continue'}
          </Button>
        </div>
        <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
          <div>
            {variant === 'LOGIN' ? 'New User?' : 'Already have an account?'}
          </div>
          <div onClick={toggleVariant} className='underline cursor-pointer'>
            {variant === 'LOGIN' ? 'Create an Account' : 'Login'}
          </div>
        </div>
      </form>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
      </div>
      <p className='px-8 text-center text-sm text-muted-foreground'>
        By clicking {variant === 'LOGIN' ? 'Login' : 'continue'}, you agree to
        our{' '}
        <Link
          href='/terms'
          className='underline underline-offset-4 hover:text-primary'
        >
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link
          href='/privacy'
          className='underline underline-offset-4 hover:text-primary'
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
