import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

export function CarouselPart() {
    return (
        <Carousel className='w-full max-w-xs'>
            <CarouselContent>
                {Array.from({ length: 8 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className='w-full h-full flex flex-row justify-center items-center'>
                            <img
                                src={`../images/part${index + 1}.png`}
                                alt=''
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
