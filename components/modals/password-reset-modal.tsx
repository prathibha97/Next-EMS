'use client';

import usePasswordResetModal from '@/hooks/usePasswordResetModal';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import OtpInput from '../auth/otp-input';
import PasswordUpdated from '../auth/password-updated';
import ResetPassword from '../auth/reset-password';
import ValidateEmail from '../auth/validate-email';
import Modal from './modal';

interface PasswordResetModalProps {}

const PasswordResetModal: FC<PasswordResetModalProps> = ({}) => {
  const router = useRouter();
  const loginModal = usePasswordResetModal();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <ValidateEmail handleNextStep={() => handleNextStep()} />;
      case 2:
        return <OtpInput handleNextStep={() => handleNextStep()} />;
      case 3:
        return <ResetPassword handleNextStep={() => handleNextStep()} />;
      case 4:
        return <PasswordUpdated />;
      default:
        return null;
    }
  };

  const bodyContent = (
    <div className='flex flex-col items-center justify-center'>
      {renderStepContent()}
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      title='Reset Password'
      actionLabel='Continue'
      onSubmit={() => handleNextStep()}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default PasswordResetModal;
