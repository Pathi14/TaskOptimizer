'use client';
import { TaskList } from '@/components/task-list';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { axios } from '@/lib/axios';
import { Status, Task } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ListFilter, Plus } from 'lucide-react';
import { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { z } from 'zod';
import { DndContext } from '@dnd-kit/core';

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
  const projectId = use(params).projectId;

  const queryClient = useQueryClient();

  const { data: statuses, isLoading } = useQuery<Status[]>({
    queryKey: ['statuses', projectId],
    queryFn: () =>
      axios
        .get<
          { id: number; nom: string; projetId: number }[]
        >(`/status/status/project/${projectId}`)
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
    mutationFn: (payload: { taskId: Task['id']; statusId: Status['id'] }) =>
      axios.put(`/tasks/${payload.taskId}`, {
        statutId: payload.statusId,
      }),
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

  return (
    <>
      <div className="relative">
        <ListFilter className="absolute top-1/2 -translate-y-1/2 left-3" />
        <Input
          className="bg-card-light border-none max-w-96 pl-11 placeholder:text-white/40"
          placeholder="Rechercher dans les tâches"
        />
      </div>

      <div className="mt-5 flex items-start gap-3 overflow-auto">
        {isLoading && <div>Chargement...</div>}

        <DndContext
          onDragEnd={async (event) => {
            console.log(event);
            const [sourceStatusId, taskId] = String(event.active.id).split('_');
            const targetStatusId = event.over?.id;

            if (!targetStatusId || !sourceStatusId || !taskId) return;

            await updateTask({
              taskId: Number(taskId),
              statusId: Number(targetStatusId),
            });

            Promise.all([
              queryClient.invalidateQueries(['tasks', Number(targetStatusId)]),
              queryClient.invalidateQueries(['tasks', Number(sourceStatusId)]),
            ]);
          }}
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
