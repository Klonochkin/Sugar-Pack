import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn('p-3', className)}
            classNames={{
                month: 'space-y-4',
                month_caption: 'flex justify-center pt-1 relative items-center',
                caption_label: 'text-sm font-medium',
                nav: 'space-x-1 flex items-start',
                button_previous: cn(
                    buttonVariants({ variant: 'outline' }),
                    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-4 z-10',
                ),
                button_next: cn(
                    buttonVariants({ variant: 'outline' }),
                    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-4 z-10',
                ),
                month_grid: 'w-full border-collapse space-y-1',
                weekdays: 'flex',
                weekday:
                    'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
                week: 'flex w-full mt-2',
                day: cn(
                    'h-9 w-9 text-center text-sm p-0 relative',
                    'aria-selected:bg-primary',
                    'aria-selected:text-primary-foreground',
                ),
                day_button: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100',

                selected:
                    'bg-primary text-primary-foreground rounded-md hover:bg-primary',
                range_end: 'day-range-end',
                day_today: 'bg-accent text-accent-foreground',
                outside:
                    'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
                disabled: 'text-muted-foreground opacity-50',
                range_middle:
                    'aria-selected:bg-accent aria-selected:text-accent-foreground',
                hidden: 'h-9 w-9 p-0 font-normal opacity-50 text-[#A3A3A3] pointer-events-none cursor-default',
                ...classNames,
            }}
            modifiersClassNames={{
                notSelected:
                    'hover:bg-accent hover:text-accent-foreground rounded-md',
            }}
            modifiers={{
                notSelected: () => {
                    return true;
                },
            }}
            components={{
                Chevron: (props) => {
                    if (props.orientation === 'left') {
                        return <ChevronLeft className='h-4 w-4' {...props} />;
                    } else if (props.orientation === 'right') {
                        return <ChevronRight className='h-4 w-4' {...props} />;
                    }
                    return <></>;
                },
            }}
            {...props}
        />
    );
}
Calendar.displayName = 'Calendar';

export { Calendar };
