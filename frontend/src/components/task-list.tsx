'use client';
import { TaskCard } from '@/components/task-card';
import { Button } from '@/components/ui/button';
import { axios } from '@/lib/axios';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { createRef, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type Task = {};

const TaskSchema = z.object({
  title: z.string(),
  priority: z.number().int().positive(),
  endDate: z.date(),
});

export function TaskList({ title }: { title: string }) {
  const [isCreationModeEnabled, setCreationModeEnabled] = useState(false);
  const { mutateAsync: addTask } = useMutation({
    mutationFn: (payload: {
      title: string;
      endDate: string;
      priority: number;
    }) =>
      axios
        .post('/tasks', {
          titre: payload.title,
          date_echeance: payload.endDate,
          priorite: payload.priority,
        })
        .then((res) => res.data)
        .catch(console.log),
  });
  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      endDate: new Date(),
      priority: 5,
    },
  });
  const formRef = useRef<HTMLFormElement>(null);

  function toggleCreationMode() {
    setCreationModeEnabled(!isCreationModeEnabled);
  }

  async function onSubmit(payload: z.infer<typeof TaskSchema>) {
    console.log(payload);
    await addTask({ ...payload, endDate: payload.endDate.toISOString() });
  }

  return (
    <div className="rounded-lg bg-card p-4 min-w-80 w-80 min-h-96">
      <h2 className="mb-7 uppercase text-base">{title}</h2>

      <div className="flex flex-col gap-2">
        <TaskCard />
        <TaskCard />
        <TaskCard />
        {isCreationModeEnabled && (
          <form onSubmit={form.handleSubmit(onSubmit)} ref={formRef}>
            <textarea
              {...form.register('title')}
              className="bg-card-light rounded-lg w-full min-h-16 p-3 resize-none"
              onKeyDown={(e) => {
                form.handleSubmit(onSubmit);
              }}
            />

            <Button type="submit" className="bg-sky-700 hover:bg-sky-800 mr-3">
              Ajouter une carte
            </Button>

            <Button variant="ghost" type="reset">
              Annuler
            </Button>
          </form>
        )}
        <Button
          className={cn('bg-card hover:bg-card-light mt-10')}
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
