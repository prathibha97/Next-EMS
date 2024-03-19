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
import { FC, useEffect, useState } from 'react';

interface ProjectSelectorProps {
  projects: Project[];
}

export const ProjectSelector: FC<ProjectSelectorProps> = ({ projects }) => {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  const storedProjectId = localStorage.getItem('selectedProjectId');
  useEffect(() => {
    if (!initialLoad) {
      if (
        storedProjectId &&
        projects.some((project) => project.id === storedProjectId)
      ) {
        setSelectedProject(storedProjectId);
        router.replace(`/boards?projectId=${storedProjectId}`);
      } else {
        setSelectedProject(projects.length > 0 ? projects[0].id : null);
      }
      setInitialLoad(true);
    }
  }, [projects, initialLoad]);

  const handleProjectChange = (projectId: string) => {
    setSelectedProject(projectId);
    localStorage.setItem('selectedProjectId', projectId);
    router.push(`/boards?projectId=${projectId}`);
    router.refresh();
  };

  return (
    <Select
      onValueChange={(value) => handleProjectChange(value)}
      defaultValue={storedProjectId!}
    >
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select Project' />
      </SelectTrigger>
      <SelectContent>
        {projects.map((project) => (
          <SelectItem
            key={project.id}
            value={project.id}
            // @ts-ignore
            selected={selectedProject === project.id}
            onClick={() => handleProjectChange(project.id)}
          >
            {project.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
