import { setOpt } from '@/app/redux/features/otpSlice';
import { useAppDispatch } from '@/app/redux/hooks';
import FORGOT_PASS_ICON from '@/public/forgot_pass.png';
import axios from 'axios';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import ActionButton from '../buttons/action-button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';

interface ValidateEmailProps {
  handleNextStep: () => void;
}

const ValidateEmail: FC<ValidateEmailProps> = ({ handleNextStep }) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const validateEmail = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/users/validate?email=${email}`);
        setIsEmailValid(data.isValid);
        setMessage(data.message);
      } catch (error) {
        setIsEmailValid(false);
        setMessage('Error validating email');
      } finally {
        setLoading(false);
      }
    };

    // Trigger API call only if the email is not empty
    if (email.trim()) {
      validateEmail();
    } else {
      setIsEmailValid(false);
      setMessage('Email is required');
    }
  }, [email]);

  const handlePwResetRequest = async () => {
    try {
      const { data } = await axios.post(`/api/email/otp`, { email });
      console.log(data.message);

      if (data.message === 'Previous OTP is still valid') {
        // If the message is 'Previous OTP is still valid', go to the next step
        handleNextStep();
      } else {
        // If it's a different message, reset OTP value and proceed to the next step
        dispatch(setOpt({ OTPValue: '', email }));
        handleNextStep();
      }
    } catch (error: any) {
      // Handle errors here
      if (error.response && error.response.status === 400) {
        // If the error status is 400, check the error message
        const errorMessage = error.response.data.message;

        if (errorMessage === 'Previous OTP is still valid') {
          // If the message is 'Previous OTP is still valid', go to the next step
          handleNextStep();
        } else {
          console.error('Error sending OTP:', errorMessage);
        }
      } else {
        // Handle other types of errors
        console.error('Error sending OTP:', error);
      }
    }
  };

  return (
    <>
      <Card className='m-4 sm:mb-0 sm:w-[25rem] grid px-8 pt-8 pb-8'>
        <CardContent>
          <div className='flex items-center justify-center mb-6'>
            <Image
              src={FORGOT_PASS_ICON}
              alt='lock icon'
              className='object-scale-down w-[80px]'
            />
          </div>

          <h2 className='text-[25px] text-primary text-center mb-4'>
            Forgot Password?
          </h2>

          <p className='text-primary_font_color text-center'>
            Enter your email, and we'll send you an OTP to reset your password
          </p>
          <form
            className='mt-8 mb-2 w-full max-w-screen-lg'
            onSubmit={(e) => {
              e.preventDefault();
              handlePwResetRequest();
            }}
          >
            <div className='mb-1 flex flex-col gap-5'>
              <div>
                <Input
                  placeholder='Enter your email here'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full'
                />
              </div>

              {message && (
                <p
                  className={`text-${
                    isEmailValid ? 'green-500' : 'red-500'
                  } font-semibold text-center`}
                >
                  {message}
                </p>
              )}
            </div>

            <ActionButton
              label='Request'
              type='submit'
              className='w-full'
              disabled={!isEmailValid}
              isLoading={loading}
            />
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default ValidateEmail;
