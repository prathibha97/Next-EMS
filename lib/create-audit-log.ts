import { ACTION, ENTITY_TYPE } from '@prisma/client';

import prisma from '@/lib/prisma';
import useEmployee from '@/hooks/useEmployee';

interface Props {
  entityId: string;
  projectId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

export const createAuditLog = async (props: Props) => {
  try {
    const {getLoggedInEmployee} = await useEmployee();
    const user = await getLoggedInEmployee();

    if (!user) {
      throw new Error('User not found!');
    }

    const { entityId, entityType, entityTitle, action, projectId } = props;

    await prisma.auditLog.create({
      data: {
        entityId,
        projectId,
        entityType,
        entityTitle,
        action,
        userId: user.id,
        userImage: user?.profile_photo,
        userName: user?.name,
      },
    });
  } catch (error) {
    console.log('[AUDIT_LOG_ERROR]', error);
  }
};
