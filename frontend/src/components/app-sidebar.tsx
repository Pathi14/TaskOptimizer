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
import { useProjects } from '@/hooks/use-projects';
import Link from 'next/link';

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
  const { data: projects } = useProjects();

  const navMain = [
    {
      title: 'Projets',
      url: '#',
      icon: Target,
      isActive: true,
      items: projects?.map((project) => ({
        title: project.title,
        url: `/project/${project.id}`,
      })),
    },
  ];

  return (
    <Sidebar collapsible="icon" className="p-2" {...props}>
      <SidebarHeader className="rounded-lg bg-card mb-2 h-14 px-4 grid  items-center">
        <Link href="/">
          <div className="flex items-center gap-3">
            <ClipboardList />
            <div>Task Optimizer</div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className=" rounded-lg bg-card">
        <NavMain items={navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
