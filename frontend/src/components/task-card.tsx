'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tag } from '@/components/ui/tag';
import { useUsers } from '@/hooks/use-users';
import { axios } from '@/lib/axios';
import { Status, Task, User } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useDraggable } from '@dnd-kit/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  CalendarIcon,
  Check,
  CheckIcon,
  Clock,
  Delete,
  Pencil,
  Plus,
  Trash,
  WrapText,
  XIcon,
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { z } from 'zod';

const NameUpdateSchema = z.object({
  title: z.string().min(1),
});

const TaskUpdateSchema = z.object({
  endDate: z.date().optional(),
  description: z.string().optional(),
});

export function TaskCard({ task }: { task: Task }) {
  const [date, setDate] = React.useState<Date>();
  const searchParams = useSearchParams();
  const [isNameEditable, setNameEditable] = React.useState(false);
  const { setNodeRef, listeners, attributes, transform } = useDraggable({
    id: `${task.statusId}_${task.id}`,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  function toggleNameEditable() {
    setNameEditable(!isNameEditable);
  }

  const queryClient = useQueryClient();

  const nameForm = useForm<z.infer<typeof NameUpdateSchema>>({
    resolver: zodResolver(NameUpdateSchema),
    values: {
      title: task.title,
    },
  });

  const taskForm = useForm<z.infer<typeof TaskUpdateSchema>>({
    resolver: zodResolver(TaskUpdateSchema),
    values: {
      description: task.description,
      endDate: task.endDate ? new Date(task.endDate) : undefined,
    },
  });

  const { mutateAsync: updateTask } = useMutation({
    mutationFn: (payload: { taskId: Task['id']; data: Partial<Task> }) =>
      axios.put('/tasks/' + payload.taskId, {
        titre: payload.data.title,
        description: payload.data.description,
        date_echeance: payload.data.endDate,
      }),
  });

  const { mutateAsync: deleteTask } = useMutation({
    mutationFn: ({ taskId }: { taskId: Task['id']; statusId: Status['id'] }) =>
      axios.delete(`/tasks/${taskId}`),
    onSettled: () => queryClient.invalidateQueries(['tasks', task.statusId]),
    onMutate: async ({ taskId, statusId }) => {
      const previousTasks = queryClient.getQueryData<Task[]>([
        'tasks',
        statusId,
        searchParams.get('search'),
      ]);

      await queryClient.cancelQueries([
        'tasks',
        statusId,
        searchParams.get('search'),
      ]);

      queryClient.setQueryData<Task[]>(
        ['tasks', statusId, searchParams.get('search')],
        (old) => (old ? old.filter((t) => t.id !== taskId) : []),
      );

      return { previousTasks };
    },
  });

  const { mutateAsync: assignTaskToUser } = useMutation({
    mutationFn: ({
      taskId,
      userId,
    }: {
      taskId: Task['id'];
      userId: User['id'];
    }) =>
      axios.put(`/tasks/${taskId}/users`, {
        usersIds: [userId],
      }),

    onSettled: () =>
      queryClient.invalidateQueries([
        'tasks',
        task.statusId,
        searchParams.get('search'),
      ]),
  });

  async function onUpdateName(data: z.infer<typeof NameUpdateSchema>) {
    toggleNameEditable();
    await updateTask({ taskId: task.id, data });
    nameForm.reset();
    queryClient.invalidateQueries([
      'tasks',
      task.statusId,
      searchParams.get('search'),
    ]);
  }

  async function onUpdateTask(data: z.infer<typeof TaskUpdateSchema>) {
    await updateTask({
      taskId: task.id,
      data: {
        description: data.description,
        endDate: data.endDate ? data.endDate.toISOString() : undefined,
      },
    });

    taskForm.reset();

    queryClient.invalidateQueries([
      'tasks',
      task.statusId,
      searchParams.get('search'),
    ]);
  }

  const formEndDate = taskForm.watch('endDate');

  const { data: users } = useUsers();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="bg-card-light rounded-lg p-3"
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          style={style}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base">{task.title}</h3>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                deleteTask({ taskId: task.id, statusId: task.statusId });
              }}
            >
              <Trash className="size-4" />
            </Button>
          </div>

          <div className="flex gap-1 mt-3">
            {task.users.map((u) => (
              <Avatar key={u.id} className="cursor-pointer" title={u.name}>
                <AvatarFallback className="bg-card">{u.name[0]}</AvatarFallback>
              </Avatar>
            ))}
          </div>

          <div className="flex gap-5 mt-3 items-center">
            {task.endDate && (
              <div className="flex gap-3">
                <Clock />{' '}
                {format(task.endDate, fr.formatLong.date({ width: 'medium' }), {
                  locale: fr,
                })}
              </div>
            )}

            {task.description && <WrapText className="size-5" />}
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="bg-card border-none">
        <DialogHeader className="flex-row justify-between items-center mb-5">
          <div
            className={cn(
              'flex items-center gap-2',
              isNameEditable && 'sr-only',
            )}
          >
            <DialogTitle className={cn('select-none')}>
              {task.title}
            </DialogTitle>

            <Button
              variant="ghost"
              onClick={toggleNameEditable}
              className="rounded-full"
              size="icon"
            >
              <Pencil className="size-4" />
            </Button>
          </div>

          {isNameEditable && (
            <form onSubmit={nameForm.handleSubmit(onUpdateName)}>
              <Input
                type="text"
                className="bg-card-dark rounded-lg border-none"
                defaultValue={task.title}
                autoComplete="off"
                {...nameForm.register('title')}
              />

              <div className="mt-2">
                <Button
                  type="submit"
                  className="mr-1"
                  size="icon"
                  disabled={
                    !nameForm.formState.isValid ||
                    nameForm.formState.isSubmitting ||
                    !nameForm.formState.isDirty
                  }
                >
                  <CheckIcon />
                </Button>

                <Button
                  type="reset"
                  variant="ghost"
                  onClick={toggleNameEditable}
                  size="icon"
                >
                  <XIcon />
                </Button>
              </div>
            </form>
          )}

          <div className="flex">
            {task.users?.map((u) => (
              <Avatar
                key={u.id}
                className="-ml-2 cursor-pointer border border-foreground"
                title={u.name}
              >
                <AvatarFallback className="bg-card-light">
                  {u.name[0]}
                </AvatarFallback>
              </Avatar>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  className="rounded-full -ml-2 z-50 bg-blue-700 hover:bg-blue-800"
                >
                  <Plus />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card-dark rounded-lg text-foreground border-white/20 shadow-md">
                {users?.map((user) => (
                  <DropdownMenuItem
                    key={user.id}
                    onClick={() => {
                      assignTaskToUser({ taskId: task.id, userId: user.id });
                    }}
                  >
                    <Avatar>
                      <AvatarFallback className="bg-card-light">
                        {user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    {user.name}

                    {task.users.some((u) => u.id === user.id) && (
                      <Check className="text-green-700 size-5" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </DialogHeader>

        <div className="flex gap-2">
          <Tag>Tag 1</Tag>
          <Tag className="bg-yellow-600">Tag 2 plus long</Tag>
          <Tag className="bg-cyan-700">Tag 3 moyen</Tag>

          <Button
            size="icon"
            className="rounded-full z-50 bg-card-light hover:bg-card-light"
          >
            <Plus />
          </Button>
        </div>

        <div className="mt-5">
          <form onSubmit={taskForm.handleSubmit(onUpdateTask)}>
            <div className="mb-5">
              <label
                htmlFor="description"
                className="flex items-center gap-2 mb-3"
              >
                <Clock className="size-4" /> Date de fin
              </label>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className={cn(
                      'justify-start text-left font-normal bg-card-dark w-full text-white',
                      !date && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon />
                    {formEndDate ? (
                      format(formEndDate, 'PPP', { locale: fr })
                    ) : (
                      <span>Choisir une date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => taskForm.setValue('endDate', date)}
                    initialFocus
                    locale={fr}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label
                htmlFor="description"
                className="flex items-center gap-2 mb-3"
              >
                <WrapText className="size-4" /> Description
              </label>

              <textarea
                id="description"
                className="bg-card-dark rounded-lg w-full px-2 py-1 resize-none"
                rows={10}
                {...taskForm.register('description')}
              />
            </div>

            <div className="mt-3 flex gap-3 justify-end">
              <Button type="submit" variant="secondary">
                Enregistrer
              </Button>
              <Button variant="ghost" onClick={() => taskForm.reset()}>
                Annuler
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
