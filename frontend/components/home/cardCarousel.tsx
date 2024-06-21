"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

type TestimonialData = {
  id: string;
  title: string;
  description: string;
  bio: string;
  image: string;
};

const testimonials: TestimonialData[] = [
  {
    id: "1",
    title: "John Doe",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus eget sem scelerisque placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus eget sem scelerisque placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus eget sem scelerisque placerat. ",
    bio: "CEO of Company",
    image: "https://randomuser.me/api/portraits",
  },
  {
    id: "2",
    title: "Jane Doe",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus eget sem scelerisque placerat. ",
    bio: "CEO of Company",
    image: "https://randomuser.me/api/portraits",
  },
  {
    id: "3",
    title: "John Doe",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus eget sem scelerisque placerat. ",
    bio: "CEO of Company",
    image: "https://randomuser.me/api/portraits",
  },
  {
    id: "4",
    title: "Jane Doe",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus eget sem scelerisque placerat. ",
    bio: "CEO of Company",
    image: "https://randomuser.me/api/portraits",
  },
  {
    id: "5",
    title: "John Doe",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus eget sem scelerisque placerat. ",
    bio: "CEO of Company",
    image: "https://randomuser.me/api/portraits",
  },
];

const CardCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-[550px]"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {testimonials.map((testimonial) => (
          <CarouselItem key={testimonial.id}>
            <div className="p-1 ">
              <Card className="min-h-[350px] flex flex-col justify-center">
                <CardHeader className=" flex flex-col text-xl justify-center items-center w-full ">
                  <Avatar>
                    <AvatarImage src={testimonial.image} alt="Avatar" />
                    <AvatarFallback>
                      {!testimonial.image &&
                        testimonial.title.charAt(0) +
                          testimonial.title.charAt(1)}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle>{testimonial.title}</CardTitle>
                  <CardDescription>{testimonial.bio}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-6 w-full text-gray-700">
                  <CardDescription>{testimonial.description}</CardDescription>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CardCarousel;
