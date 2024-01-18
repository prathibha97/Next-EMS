import { useAppSelector } from '@/app/redux/hooks';
import { FC } from 'react';

interface ResetPasswordProps {
  handleNextStep: () => void;
}

const ResetPassword: FC<ResetPasswordProps> = ({ handleNextStep }) => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isValid },
  // } = useForm<ResetPasswordFormValues>({
  //   resolver: zodResolver(ResetPasswordFormSchema),
  //   defaultValues: {
  //     newPassword: '',
  //     confirmPassword: '',
  //   },
  //   mode: 'onChange',
  // });

  const { email } = useAppSelector((state) => state.otp);

  // const handleResetPassword = async (values: ResetPasswordFormValues) => {
  //   try {
  //     await api.post('auth/reset-password', {
  //       email,
  //       password: values.newPassword,
  //     });
  //     handleNextStep();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className='bg-[#f3f1fb] h-screen'>
      <div className='flex flex-col items-center justify-center h-screen bg-[#f3f1fb]'>
        {/* <div>
          <div className='flex items-center justify-center mb-6'>
            <img src={LOGO} alt='aad' className='w-[150px] object-contain' />
          </div>
          <Card
            color='white'
            className='m-4 sm:mb-0 sm:w-[25rem] grid px-8 pt-8 pb-8'
          >
            <div className='flex items-center justify-center mb-6'>
              <img
                src={RESET_PASSWORD}
                alt='aad'
                className='object-scale-down w-[80px]'
              />
            </div>

            <h2 className='text-[25px] text-primary text-center mb-4'>
              New Credentials
            </h2>

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
              <div className='w-full bg-input_background rounded-full mb-4'>
                <Input
                  type='password'
                  className='rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10'
                  labelProps={{
                    className: 'hidden',
                  }}
                  containerProps={{ className: 'min-w-[100px]' }}
                  crossOrigin=''
                  placeholder='New Password'
                  {...register('newPassword')}
                />
              </div>
              <div className='w-full bg-input_background rounded-full'>
                <Input
                  type='password'
                  className='rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10'
                  labelProps={{
                    className: 'hidden',
                  }}
                  containerProps={{ className: 'min-w-[100px]' }}
                  crossOrigin=''
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

              <Button
                className='mt-6 bg-primary rounded-full'
                fullWidth
                type='submit'
                disabled={!isValid}
              >
                <h6 className='normal-case'>Reset Password</h6>
              </Button>
            </form>
          </Card>
        </div> */}
        <h1>reset</h1>
      </div>
    </div>
  );
};

export default ResetPassword;
