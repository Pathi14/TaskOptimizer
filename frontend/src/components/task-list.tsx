'use client';
import { TaskCard } from '@/components/task-card';
import { Button } from '@/components/ui/button';
import { axios } from '@/lib/axios';
import { CheckIcon, Plus, Trash, XIcon } from 'lucide-react';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Status, Task } from '@/lib/types';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useSearchParams } from 'next/navigation';

const TaskSchema = z.object({
  title: z.string(),
  statusId: z.number().int().positive(),
});

const StatusSchema = z.object({
  name: z.string().min(1),
});

export function TaskList({ status }: { status: Status }) {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const queryClient = useQueryClient();
  const [isCreationModeEnabled, setCreationModeEnabled] = useState(false);
  const [isEditModeEnabled, setEditModeEnabled] = useState(false);
  const { mutateAsync: addTask } = useMutation({
    mutationFn: (payload: Pick<Task, 'title' | 'statusId'>) =>
      axios
        .post('/tasks', {
          titre: payload.title,
          statusId: payload.statusId,
        })
        .then((res) => res.data)
        .catch(console.log),
  });
  const { data: tasks } = useQuery<Task[]>(['tasks', status.id, search], () =>
    axios
      .get<
        {
          id: number;
          titre: string;
          statutId: number;
          description: string;
          date_echeance: string;
          utilisateurs: {
            utilisateur: {
              id: number;
              nom: string;
              adresse_mail: string;
            };
          }[];
        }[]
      >(`/tasks/status/${status.id}`)
      .then((res) =>
        res.data
          .map((t) => ({
            title: t.titre,
            description: t.description,
            statusId: t.statutId,
            id: t.id,
            endDate: t.date_echeance,
            users: t.utilisateurs.map((u) => ({
              id: u.utilisateur.id,
              name: u.utilisateur.nom,
              email: u.utilisateur.adresse_mail,
            })),
          }))
          .filter((t) =>
            !search
              ? true
              : t.title
                  .trim()
                  .toLocaleLowerCase()
                  .includes(search.trim().toLocaleLowerCase()),
          ),
      ),
  );
  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      statusId: Number(status.id),
    },
  });

  const statusForm = useForm<z.infer<typeof StatusSchema>>({
    resolver: zodResolver(StatusSchema),
    values: {
      name: status.name,
    },
  });

  const { mutateAsync: deleteStatus } = useMutation({
    mutationFn: (statusId: Status['id']) => axios.delete(`/status/${statusId}`),
    onSettled: () => queryClient.invalidateQueries(['statuses']),
  });
  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: (payload: Pick<Status, 'name'>) =>
      axios.put(`/status/${status.id}`, {
        nom: payload.name,
      }),
    onSettled: () => queryClient.invalidateQueries(['statuses']),
  });

  function toggleCreationMode() {
    setCreationModeEnabled(!isCreationModeEnabled);
  }

  function toggleEditMode() {
    setEditModeEnabled(!isEditModeEnabled);
  }

  async function onSubmit(payload: z.infer<typeof TaskSchema>) {
    console.log(payload);
    toggleCreationMode();
    await addTask(payload);
    form.reset();
    queryClient.invalidateQueries(['tasks', status.id]);
  }

  const { isOver, setNodeRef } = useDroppable({
    id: status.id,
  });

  function onUpdateStatus(payload: z.infer<typeof StatusSchema>) {
    updateStatus(payload);
    toggleEditMode();
  }

  return (
    <div
      className={cn(
        'rounded-lg bg-card p-4 min-w-80 w-80 min-h-96 flex flex-col border-2 border-transparent',
        isOver && 'border-dashed border-card-light',
      )}
    >
      <div className="flex justify-between items-center mb-7">
        {' '}
        <h2
          className={cn(
            'uppercase text-base cursor-pointer',
            isEditModeEnabled && 'sr-only',
          )}
          onDoubleClick={toggleEditMode}
        >
          {status.name}
        </h2>
        {isEditModeEnabled && (
          <form onSubmit={statusForm.handleSubmit(onUpdateStatus)}>
            <Input
              type="text"
              className="bg-card-dark rounded-lg border-none"
              autoComplete="off"
              {...statusForm.register('name')}
            />
            <div className="mt-2">
              <Button
                type="submit"
                className="mr-1"
                size="icon"
                disabled={
                  !statusForm.formState.isValid ||
                  statusForm.formState.isSubmitting ||
                  !statusForm.formState.isDirty
                }
              >
                <CheckIcon />
              </Button>

              <Button
                type="reset"
                variant="ghost"
                onClick={toggleEditMode}
                size="icon"
              >
                <XIcon />
              </Button>
            </div>
          </form>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => deleteStatus(status.id)}
        >
          <Trash />
        </Button>
      </div>

      <div className="flex flex-col gap-2 flex-1" ref={setNodeRef}>
        {tasks?.map((task) => (
          <div key={task.id} data-swapy-slot={task.id}>
            <TaskCard task={task} />
          </div>
        ))}

        {isCreationModeEnabled && (
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <textarea
              {...form.register('title')}
              className="bg-card-light rounded-lg w-full min-h-16 p-3 resize-none"
              autoFocus
            />

            <Button type="submit" className="bg-sky-700 hover:bg-sky-800 mr-3">
              Ajouter une carte
            </Button>

            <Button variant="ghost" onClick={toggleCreationMode}>
              Annuler
            </Button>
          </form>
        )}

        <Button
          className="bg-card hover:bg-card-light mt-auto justify-self-end"
          onClick={toggleCreationMode}
          disabled={isCreationModeEnabled}
        >
          <Plus />
          <p>Ajouter une carte</p>
        </Button>
      </div>
    </div>
  );
}
