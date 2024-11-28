'use client';
import { TaskCard } from '@/components/task-card';
import { Button } from '@/components/ui/button';
import { axios } from '@/lib/axios';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Status, Task } from '@/lib/types';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

const TaskSchema = z.object({
  title: z.string(),
  statusId: z.number().int().positive(),
});

export function TaskList({ status }: { status: Status }) {
  const queryClient = useQueryClient();
  const [isCreationModeEnabled, setCreationModeEnabled] = useState(false);
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
  const { data: tasks } = useQuery<Task[]>(['tasks', status.id], () =>
    axios
      .get<
        {
          id: number;
          titre: string;
          statutId: number;
          description: string;
        }[]
      >(`/tasks/status/${status.id}`)
      .then((res) =>
        res.data.map((t) => ({
          title: t.titre,
          description: t.description,
          statusId: t.statutId,
          id: t.id,
        })),
      ),
  );
  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      statusId: Number(status.id),
    },
  });

  function toggleCreationMode() {
    setCreationModeEnabled(!isCreationModeEnabled);
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

  return (
    <div
      className={cn(
        'rounded-lg bg-card p-4 min-w-80 w-80 min-h-96 flex flex-col border-2 border-transparent',
        isOver && 'border-dashed border-card-light',
      )}
    >
      <h2 className="mb-7 uppercase text-base">{status.name}</h2>

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
