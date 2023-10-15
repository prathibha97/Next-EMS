import { Project } from '@prisma/client';
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
import { format } from 'date-fns';

interface ProjectDeadlineReminderEmailProps {
  project: Project;
}

const ProjectDeadlineReminderEmail = ({
  project,
}: ProjectDeadlineReminderEmailProps) => {
  const previewText = `Upcoming Project Deadlines`;

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
                width='120'
                height='40'
                alt='Sphiria Digital Studio Logo'
                className='my-0 mx-auto'
              />
            </Section>
            <Text className='text-lg font-bold text-center mt-4'>
              Upcoming Project Deadlines
            </Text>
            <Text className='text-sm mt-4'>Hello HR Team,</Text>
            <Text className='text-sm'>
              Here are the upcoming project deadlines:
            </Text>
            <ul className='list-disc pl-6 mt-4'>
              <li className='text-sm'>
                {project.name}: Deadline on{' '}
                {format(project.endDate as Date, 'MMMM dd, yyyy')}
              </li>
            </ul>
            <Section className='text-center mt-8 mb-8'>
              <Text className='text-sm'>
                Please review and take appropriate action.
              </Text>
            </Section>
            <Text className='text-sm'>
              Cheers,
              <br />
              Sphiria Digital Studio
            </Text>
            <Text className='text-sm'>
              Contact us at: contact@sphiriadigital.com
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ProjectDeadlineReminderEmail;
