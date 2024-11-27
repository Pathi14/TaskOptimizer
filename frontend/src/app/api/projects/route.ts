import { NextResponse } from 'next/server';

export function GET() {
  const projects = [
    {
      id: 1,
      titre: 'Test projet 1',
      description: 'Test projet 1',
    },
    {
      id: 2,
      titre: 'Test projet 2',
      description: 'Test projet 2',
    },
    {
      id: 3,
      titre: 'Test projet 3',
      description: 'Test projet 3',
    },
    {
      id: 4,
      titre: 'Test projet 4',
      description: 'Test projet 4',
    },
  ];

  return NextResponse.json(projects);
}
