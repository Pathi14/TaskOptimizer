'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tag } from '@/components/ui/tag';
import { Task } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useDraggable } from '@dnd-kit/core';
import { DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { format } from 'date-fns';
import { CalendarIcon, Clock, Pencil, Plus, WrapText } from 'lucide-react';
import React from 'react';

export function TaskCard({ task: { id, title, statusId } }: { task: Task }) {
  const [date, setDate] = React.useState<Date>();
  const { setNodeRef, listeners, attributes, transform } = useDraggable({
    id: `${statusId}_${id}`,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

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
            <h3 className="text-base">{title}</h3>
            <Pencil className="size-4" />
          </div>

          <WrapText className="mt-1 size-5" />
        </div>
      </DialogTrigger>

      <DialogContent className="bg-card border-none">
        <DialogHeader className="flex-row justify-between items-center mb-5">
          <DialogTitle>{title}</DialogTitle>
          <div className="flex">
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?img=30" />
            </Avatar>
            <Avatar className="-ml-3">
              <AvatarImage src="https://i.pravatar.cc/150?img=52" />
            </Avatar>
            <Avatar className="-ml-3">
              <AvatarImage src="https://i.pravatar.cc/150?img=62" />
            </Avatar>
            <Avatar className="-ml-3">
              <AvatarImage src="https://i.pravatar.cc/153?img=64" />
            </Avatar>
            <Button
              size="icon"
              className="rounded-full -ml-3 z-50 bg-card-light hover:bg-card-light"
            >
              <Plus />
            </Button>
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
          <form>
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
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
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
                name="description"
                className="bg-card-dark rounded-lg w-full px-2 py-1"
                rows={10}
              />
            </div>

            <div className="mt-3 flex gap-3 justify-end">
              <Button type="submit" variant="secondary">
                Enregistrer
              </Button>
              <Button type="reset" variant="ghost">
                Annuler
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
