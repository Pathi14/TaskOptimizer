import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _: NextRequest,
  {
    params,
  }: {
    params: Promise<{ projectId: number }>;
  },
) {
  const projectId = (await params).projectId;

  const statuses = [
    {
      id: 1,
      nom: 'À faire',
      projetId: 1,
      taches: [
        {
          id: 1,
          nom: 'Faire un plan',
          description: 'Faire un plan',
          statusId: 1,
        },
        {
          id: 2,
          nom: 'Faire un autre plan',
          description: 'Faire un autre plan',
          statusId: 1,
        },
        {
          id: 3,
          nom: 'Faire un plan encore',
          description: 'Faire un plan encore',
          statusId: 1,
        },
      ],
    },
    {
      id: 2,
      nom: 'En cours',
      projetId: 1,
      taches: [],
    },
    {
      id: 3,
      nom: 'Terminé',
      projetId: 1,
      taches: [
        {
          id: 4,
          nom: 'Une autre tache',
          description: 'Une autre tache',
          statusId: 3,
        },
      ],
    },
  ];

  const found = statuses.filter(
    (status) => status.projetId === Number(projectId),
  );

  return NextResponse.json(found);
}
