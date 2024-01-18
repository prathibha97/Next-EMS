import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

const OtpEmail = ({
  otp,
  expirationTime,
  company = 'Sphiria Digital Studio',
}: OtpEmailProps) => {
  const previewText = `Your OTP for Password Reset: ${otp}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className='bg-white my-auto mx-auto font-sans'>
          <Container className='my-10 mx-auto p-5 w-[465px]'>
            <Section className='mt-8'>
              <Img
                src={`/next.svg`}
                width='80'
                height='80'
                alt='Logo Example'
                className='my-0 mx-auto'
              />
            </Section>
            <Text className='text-sm'>Hello,</Text>
            <Text className='text-sm'>
              You have requested to reset your password. Please use the
              following OTP to complete the process:
            </Text>
            <Text className='text-2xl font-bold text-center my-4'>{otp}</Text>
            <Text className='text-sm'>
              This OTP is valid for {expirationTime} minutes.
            </Text>
            <Text className='text-sm'>
              If you did not request a password reset, please ignore this email.
            </Text>
            <Text className='text-sm'>
              Cheers,
              <br />
              {company} Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

interface OtpEmailProps {
  company?: string;
  otp?: string;
  expirationTime?: any;
}

export default OtpEmail;
