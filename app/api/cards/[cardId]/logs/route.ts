import { NextResponse } from 'next/server';
import { ENTITY_TYPE } from '@prisma/client';
import { getAuthSession } from '@/app/api/auth/[...nextauth]/options';
import prisma from '@/lib/prisma';


export async function GET(
  request: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session) {
      throw new NextResponse('Unauthorized', { status: 401 });
    }

    const auditLogs = await prisma.auditLog.findMany({
      where: {
        // orgId,
        entityId: params.cardId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 3,
    });

    return NextResponse.json(auditLogs);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
