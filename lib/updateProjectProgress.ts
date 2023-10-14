import prisma from "./prisma";

export async function updateProjectProgress(projectId: string) {
  const totalTasks = await prisma.task.count({
    where: { projectId },
  });
  const completedTasks = await prisma.task.count({
    where: { projectId, status: 'Done' },
  });

  const progress = (completedTasks / totalTasks) * 100;

  await prisma.project.update({
    where: { id: projectId },
    data: { progress },
  });
}
