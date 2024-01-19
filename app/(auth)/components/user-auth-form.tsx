'use client';
import { setAuthenticated } from '@/app/redux/features/authSlice';
import { useAppDispatch } from '@/app/redux/hooks';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import usePasswordResetModal from '@/hooks/usePasswordResetModal';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Icons } from '../../../components/icons';
import { Button } from '../../../components/ui/button';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
type Variant = 'LOGIN' | 'REGISTER';

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const passwordResetModal = usePasswordResetModal();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [variant, setVariant] = useState<Variant>('LOGIN');

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const form = useForm<FieldValues>({
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
          toast({
            title: 'User registered successfully!',
            description: 'Please assoiciate the user with an employee account',
          });
          form.reset();
          setVariant('LOGIN');
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
        redirect: true,
      })
        .then((callback) => {
          console.log(callback);
          if (callback?.error) {
            return toast({
              title: 'Something went wrong!',
              description: 'Could not sign in, please try again',
              variant: 'destructive',
            });
          }

          if (callback?.ok && !callback?.error) {
            dispatch(setAuthenticated(true));
            // router.push('/dashboard');
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div className={cn('grid gap-6 mx-auto w-full', className)} {...props}>
      <div className='flex flex-col space-y-2 text-center mt-10 sm:mt-0'>
        <h1 className='text-2xl font-semibold tracking-tight'>
          {variant === 'LOGIN' ? 'Login to your account' : 'Create an account'}
        </h1>
        <p className='text-sm text-muted-foreground'>
          {variant === 'LOGIN'
            ? 'Login to your account'
            : 'Enter your email and password below to create your account'}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <div className='grid gap-4 w-full'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='sr-only'>Email</FormLabel>
                    <Input
                      {...field}
                      placeholder='name@example.com'
                      type='email'
                      className='w-full'
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='sr-only'>Password</FormLabel>
                    <Input
                      {...field}
                      placeholder='Enter your password'
                      type='password'
                      className='w-full'
                    />
                    <FormMessage />
                  </FormItem>
                )}
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
          <div
            className='text-center text-sm text-gray-500 hover:cursor-pointer hover:text-black hover:underline mt-1'
            onClick={passwordResetModal.onOpen}
          >
            Reset Password
          </div>
        </form>
      </Form>
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
