'use client';
import { TaskList } from '@/components/task-list';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { axios } from '@/lib/axios';
import { Status, Task } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ListFilter, Plus } from 'lucide-react';
import { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { z } from 'zod';
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const StatusSchema = z.object({
  name: z.string().min(1),
  projectId: z.number().int().positive(),
});

export default function Page({
  params,
}: {
  params: Promise<{
    projectId: string;
  }>;
}) {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const projectId = use(params).projectId;

  const queryClient = useQueryClient();

  const { data: statuses, isLoading } = useQuery<Status[]>({
    queryKey: ['statuses', projectId],
    queryFn: () =>
      axios
        .get<
          { id: number; nom: string; projetId: number }[]
        >(`/status/project/${projectId}`)
        .then((res) =>
          res.data.map((status) => ({
            id: status.id,
            name: status.nom,
            projectId: status.projetId,
          })),
        ),
  });

  const { mutateAsync: addStatus } = useMutation({
    mutationFn: (payload: Pick<Status, 'name' | 'projectId'>) =>
      axios.post(`/status`, {
        nom: payload.name,
        projectId: payload.projectId,
      }),
  });

  const form = useForm({
    resolver: zodResolver(StatusSchema),
    defaultValues: {
      name: '',
      projectId: Number(projectId),
    },
  });

  const { mutateAsync: updateTask } = useMutation({
    mutationFn: (payload: {
      taskId: Task['id'];
      sourceStatusId: Status['id'];
      targetStatusId: Status['id'];
    }) =>
      axios.put(`/tasks/${payload.taskId}`, {
        statutId: payload.targetStatusId,
      }),
    onMutate: async ({ sourceStatusId, targetStatusId, taskId }) => {
      const previousSourceTasks = queryClient.getQueryData<Task[]>([
        'tasks',
        sourceStatusId,
        searchParams.get('search'),
      ]);
      const previousTargetTasks = queryClient.getQueryData<Task[]>([
        'tasks',
        targetStatusId,
        searchParams.get('search'),
      ]);

      await Promise.all([
        queryClient.cancelQueries([
          'tasks',
          sourceStatusId,
          searchParams.get('search'),
        ]),
        queryClient.cancelQueries([
          'tasks',
          targetStatusId,
          searchParams.get('search'),
        ]),
      ]);

      const movedTask = previousSourceTasks?.find((t) => t.id === taskId);

      Promise.all([
        queryClient.setQueryData<Task[]>(
          ['tasks', sourceStatusId, searchParams.get('search')],
          (old) => (old ? old.filter((t) => t.id !== taskId) : []),
        ),
        queryClient.setQueryData<Task[]>(
          ['tasks', targetStatusId, searchParams.get('search')],
          (old) => {
            if (!old) return [];
            if (!movedTask) return [];

            return [...old, movedTask];
          },
        ),
      ]);

      return { previousSourceTasks, previousTargetTasks };
    },
  });

  const [isCreationModeEnabled, setCreationModeEnabled] = useState(false);

  function toggleCreationMode() {
    setCreationModeEnabled(!isCreationModeEnabled);
  }

  async function onSubmit(payload: z.infer<typeof StatusSchema>) {
    toggleCreationMode();
    await addStatus(payload);
    form.reset();
    queryClient.invalidateQueries(['statuses', projectId]);
  }

  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 1,
    },
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      if (search) {
        router.push(`${pathname}?search=${search}`);
      } else {
        router.push(pathname);
      }
    }, 500);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [search]);

  return (
    <>
      <div className="relative">
        <ListFilter className="absolute top-1/2 -translate-y-1/2 left-3" />
        <Input
          className="bg-card-light border-none max-w-96 pl-11 placeholder:text-white/40"
          placeholder="Rechercher dans les tâches"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mt-5 flex items-start gap-3 overflow-auto p-1">
        {isLoading && <div>Chargement...</div>}

        <DndContext
          onDragEnd={async (event) => {
            const [sourceStatusId, taskId] = String(event.active.id).split('_');
            const targetStatusId = event.over?.id;

            if (!targetStatusId || !sourceStatusId || !taskId) return;

            await updateTask({
              taskId: Number(taskId),
              sourceStatusId: Number(sourceStatusId),
              targetStatusId: Number(targetStatusId),
            });

            Promise.all([
              queryClient.invalidateQueries([
                'tasks',
                Number(targetStatusId),
                searchParams.get('search'),
              ]),
              queryClient.invalidateQueries([
                'tasks',
                Number(sourceStatusId),
                searchParams.get('search'),
              ]),
            ]);
          }}
          sensors={[sensor]}
        >
          {statuses &&
            statuses.map((status) => (
              <TaskList key={status.id} status={status} />
            ))}
        </DndContext>

        {isCreationModeEnabled && (
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Input
              type="text"
              className="bg-card border-none min-w-80 w-80 h-1s4 rounded-lg"
              autoComplete="off"
              autoFocus
              {...form.register('name')}
            />

            <div className="mt-2">
              <Button
                type="submit"
                className="mr-2 bg-blue-700 hover:bg-blue-800"
              >
                Ajouter une liste
              </Button>
              <Button type="button" onClick={toggleCreationMode}>
                Annuler
              </Button>
            </div>
          </form>
        )}

        <button
          onClick={toggleCreationMode}
          disabled={isCreationModeEnabled}
          className="group"
        >
          <div className="w-80 min-w-80 bg-card border-2 border-dashed border-card-light p-3 rounded-lg hover:bg-card-light group-disabled:hover:bg-card group-disabled:hover:border-card-light hover:border-white/60 group-disabled:text-foreground/50 group-disabled:cursor-not-allowed">
            <div className="flex items-center gap-2">
              <Plus /> <p>Nouvelle liste</p>
            </div>
          </div>
        </button>
      </div>
    </>
  );
}
