'use client';

import { Button } from '@/components/ui/button';
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
import axios from 'axios';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Icons } from '../../../components/icons';

interface UserAuthFormProps {
  className?: string;
}

export function UserAuthForm({ className }: UserAuthFormProps) {
  const router = useRouter();
  const passwordResetModal = usePasswordResetModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [variant, setVariant] = useState<'LOGIN' | 'REGISTER'>('LOGIN');

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);

    try {
      if (variant === 'REGISTER') {
        await axios.post(`/api/register`, data);
        toast({
          title: 'User registered successfully!',
          description: 'Please associate the user with an employee account',
        });
        form.reset();
        setVariant('LOGIN');
      } else {
        const signInResponse = await signIn('credentials', {
          ...data,
          redirect: false,
        });

        if (signInResponse && signInResponse.error) {
          setError('Invalid email or password');
        } else if (signInResponse && signInResponse.ok) {
          router.push('/dashboard');
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVariant = () => {
    setVariant(variant === 'LOGIN' ? 'REGISTER' : 'LOGIN');
    setError(null);
  };

  return (
    <div className={className}>
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
          <div className='grid gap-4'>
            <div className='grid gap-3 w-full'>
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
            {error && <div className='text-red-500 text-center'>{error}</div>}
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
      <p className='px-8 text-center text-sm text-muted-foreground mt-3'>
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
