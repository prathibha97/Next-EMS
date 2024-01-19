import { useAppSelector } from '@/app/redux/hooks';
import axios from 'axios';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import OTP from '../../public/otp.png';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

interface OtpInputProps {
  handleNextStep: () => void;
}

const OtpInput: FC<OtpInputProps> = ({ handleNextStep }) => {
  const VERIFICATION_CODE_LENGTH = 5;
  const { email } = useAppSelector((state) => state.otp);
  const TIMER_DURATION = 600;

  const [verificationCode, setVerificationCode] = useState(
    Array(VERIFICATION_CODE_LENGTH).fill('')
  );
  const [message, setMessage] = useState('');
  const [isCodeCorrect, setIsCodeCorrect] = useState(false);
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [remainingTime, setRemainingTime] = useState(TIMER_DURATION);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    const formattedTime = `${minutes
      .toString()
      .padStart(2, '0')} minutes and ${seconds
      .toString()
      .padStart(2, '0')} seconds`;
    return formattedTime;
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedCode = [...verificationCode];
    updatedCode[index] = value;

    if (value !== '' && index < VERIFICATION_CODE_LENGTH - 1) {
      document.getElementById(`inputField${index + 1}`)?.focus();
    }

    setVerificationCode(updatedCode);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (remainingTime > 0) {
        setRemainingTime((prev) => prev - 1);
      } else {
        setIsTimerExpired(true);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [remainingTime]);

  useEffect(() => {
    const enteredCode = verificationCode.join('');
    const validateOTP = async () => {
      try {
        const { data } = await axios.post('/api/email/verify', {
          email,
          userEnteredOTP: verificationCode.join(''),
        });
        setIsCodeCorrect(data.verified);
        setMessage(data.message);
      } catch (error) {
        setIsCodeCorrect(false);
        setMessage('Invalid OTP verification code');
      }
    };

    // Trigger API call only if the email is not empty
    if (enteredCode.trim()) {
      validateOTP();
    } else {
      setIsCodeCorrect(false);
      setMessage('OTP is required');
    }
  }, [verificationCode, email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      handleNextStep();
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage('Failed to verify OTP. Please try again.');
    }
  };

  const handleResendOTP = async () => {
    try {
      await axios.post(`/email/send-otp`, { email });
      setRemainingTime(TIMER_DURATION);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  return (
    <div className='bg-[#f3f1fb]'>
      <div className='flex flex-col items-center justify-center bg-[#f3f1fb]'>
        <div>
          <Card>
            <CardContent>
              <div className='flex items-center justify-center mb-6 mt-3'>
                <Image
                  src={OTP}
                  alt='otp-image'
                  className='object-scale-down w-[80px]'
                />
              </div>

              <h2 className='text-[25px] text-primary text-center mb-4'>
                Enter Verification Code
              </h2>

              <p className='text-primary_font_color text-center'>
                Enter the 5-digit code that we have sent through your email
              </p>
              <form
                className='mt-8 mb-2 w-full max-w-screen-lg '
                onSubmit={handleSubmit}
              >
                <div className='flex items-center gap-3 justify-between mx-9'>
                  {verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      type='text'
                      id={`inputField${index}`}
                      className={`bg-[#fff] border-2 p-2 w-[45px] h-[45px] border-black text-center ${
                        message === 'Incorrect OTP'
                          ? 'border-red-500'
                          : message === 'OTP verified successfully'
                          ? 'border-green-500'
                          : 'border-black'
                      }`}
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                  ))}
                </div>
                {message && (
                  <p
                    className={`text-center mt-4 ${
                      message === 'OTP verified successfully'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {message}
                  </p>
                )}
                {remainingTime > 0 ? (
                  <p className='text-center mt-4 text-gray-500'>
                    Time remaining: {formatTime(remainingTime)}
                  </p>
                ) : (
                  <p className='text-center mt-4 text-gray-500'>OPT Expired</p>
                )}
                <div className='flex justify-center'>
                  <Button
                    className='mt-6 w-1/2'
                    type='submit'
                    disabled={!isCodeCorrect || isTimerExpired}
                  >
                    <h6 className='normal-case'>Continue</h6>
                  </Button>
                </div>
                {remainingTime === 0 && (
                  <div className='flex items-center justify-center gap-2 mt-6'>
                    <p className='text-[14px] mt-0.5'>
                      Haven't received the code?
                      <span
                        className='text-[#8645FF] ml-1 cursor-pointer underline'
                        onClick={handleResendOTP}
                      >
                        Resend
                      </span>
                    </p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OtpInput;
