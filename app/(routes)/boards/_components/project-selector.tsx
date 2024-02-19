'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Project } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

interface ProjectSelectorProps {
  projects: Project[];
}

export const ProjectSelector: FC<ProjectSelectorProps> = ({ projects }) => {
  const router = useRouter()
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const handleProjectChange = (projectId: string) => {
    setSelectedProject(projectId);
    router.push(`/boards?projectId=${projectId}`);
    router.refresh()
  };
  return (
    <Select onValueChange={(value) => handleProjectChange(value)}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select Project' />
      </SelectTrigger>
      <SelectContent>
        {projects.map((project) => (
          <SelectItem
            key={project.id}
            value={project.id}
            onClick={()=>router.push(`/boards?projectId=${project.id}`)}
          >
            {project.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
