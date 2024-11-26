'use client';

import * as React from 'react';
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ClipboardList,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings,
  Settings2,
  SquareTerminal,
  Target,
  User,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

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
  return (
    <Sidebar collapsible="icon" className="p-2" {...props}>
      <SidebarHeader className="rounded-lg bg-card mb-2 flex-row items-center gap-3 h-14 px-4">
        <ClipboardList />
        <div>Task Optimizer</div>
      </SidebarHeader>
      <SidebarContent className=" rounded-lg bg-card">
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
