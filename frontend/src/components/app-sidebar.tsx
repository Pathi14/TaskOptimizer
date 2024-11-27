'use client';
import * as React from 'react';
import {
  AudioWaveform,
  ClipboardList,
  Command,
  GalleryVerticalEnd,
  Settings,
  Target,
  User,
} from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { useQuery } from 'react-query';
import { axios } from '@/lib/axios';

type Project = {
  id: number;
  title: string;
  description: string;
};

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Projets',
      url: '#',
      icon: Target,
      isActive: true,
      items: [
        {
          title: 'Projet Sequoia',
          url: '#',
        },
        {
          title: 'Live Chat',
          url: '#',
        },
        {
          title: 'My School',
          url: '#',
        },
      ],
    },
    {
      title: 'Membres',
      url: '#',
      icon: User,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Paramètres',
      url: '#',
      icon: Settings,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Equipe',
          url: '#',
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: projects } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: () =>
      axios
        .get<
          {
            id: number;
            titre: string;
            description: string;
          }[]
        >('/projects')
        .then((res) => {
          return res.data.map((p) => ({
            id: p.id,
            title: p.titre,
            description: p.description,
          }));
        }),
  });

  const navMain = [
    {
      title: 'Projets',
      url: '#',
      icon: Target,
      isActive: true,
      items: projects?.map((project) => ({
        title: project.title,
        url: '',
      })),
    },
  ];

  return (
    <Sidebar collapsible="icon" className="p-2" {...props}>
      <SidebarHeader className="rounded-lg bg-card mb-2 flex-row items-center gap-3 h-14 px-4">
        <ClipboardList />
        <div>Task Optimizer</div>
      </SidebarHeader>
      <SidebarContent className=" rounded-lg bg-card">
        <NavMain items={navMain} />
      </SidebarContent>
    </Sidebar>
  );
}