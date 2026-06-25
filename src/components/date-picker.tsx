'use client';

import * as React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '@/lib/utils';

export function DayPicker() {
  const [day, setDay] = React.useState<number>();
  const [open, setOpen] = React.useState(false);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn('w-40 justify-start text-left font-normal', !day && 'text-muted-foreground')}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {day ? `Dia ${day}` : <span>Selecione o dia</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2">
        <div className="grid grid-cols-7 gap-1">
          {days.map((d) => (
            <Button
              key={d}
              variant={day === d ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0 text-sm"
              onClick={() => {
                setDay(d);
                setOpen(false);
              }}
            >
              {d}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
