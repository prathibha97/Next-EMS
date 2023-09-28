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

const LeaveRequestEmail = ({
  username,
  type,
  startDate,
  endDate,
  reason,
  company = 'Sphiria Digital Studio'
}: LeaveRequestEmailProps) => {
  const previewText = `Leave request from ${username}!`;

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
            <Text className='text-sm'>Hello HR Team,</Text>
            <Text className='text-sm'>
              Employee {username} has requested a leave.
            </Text>
            <Text className='text-sm'>
              Leave Type: {type}
              <br />
              Start Date: {startDate}
              <br />
              End Date: {endDate}
              <br />
              Reason: {reason}
            </Text>
            <Section className='text-center mt-[32px] mb-[32px]'>
              <Text className='text-sm'>
                Please review and take appropriate action.
              </Text>
            </Section>
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

interface LeaveRequestEmailProps {
  username?: string;
  company?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
  reason?: string;
}

export default LeaveRequestEmail;
