"use client";

import {Card, CardBody, Button, Image, Slider, CardProps} from "@heroui/react";
import {useState, FC} from "react";
import {clsx} from "@heroui/shared-utils";
import NextImage from "next/image";

import {
  PauseCircleBoldIcon,
  NextBoldIcon,
  PreviousBoldIcon,
  RepeatOneBoldIcon,
  ShuffleBoldIcon,
  HeartLinearIcon,
} from "@/components/icons";

export interface MusicPlayerProps extends CardProps {}

export const MusicPlayer: FC<MusicPlayerProps> = ({className, ...otherProps}) => {
  const [liked, setLiked] = useState(false);

  return (
    <Card
      isBlurred
      className={clsx("border-none bg-background/60 dark:bg-default-100/50", className)}
      shadow="sm"
      {...otherProps}
    >
      <CardBody>
        <div className="md:max-h-[200px] grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Album cover"
              as={NextImage}
              className="object-cover"
              height={160}
              shadow="md"
              src="/images/album-cover.png"
              width={240}
            />
          </div>
          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <p className="text-sm font-semibold text-foreground">Daily Mix</p>
                <p className="text-xs text-foreground/80">12 Tracks</p>
                <p className="text-lg font-medium mt-2">Frontend Radio</p>
              </div>
              <Button
                isIconOnly
                aria-label="Like"
                className="text-default-900/60 data-hover:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                onPress={() => setLiked((v) => !v)}
              >
                <HeartLinearIcon
                  className={liked ? "[&>path]:stroke-transparent" : ""}
                  fill={liked ? "currentColor" : "none"}
                />
              </Button>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              <Slider
                aria-label="Music progress"
                classNames={{
                  track: "bg-default-500/30",
                  thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
                }}
                color="foreground"
                defaultValue={33}
                size="sm"
              />
              <div className="flex justify-between">
                <p className="text-sm">1:23</p>
                <p className="text-sm text-foreground/50">4:32</p>
              </div>
            </div>

            <div className="flex w-full items-center justify-center">
              <Button
                isIconOnly
                aria-label="Repeat"
                className="data-hover:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <RepeatOneBoldIcon className="text-foreground/80" />
              </Button>
              <Button
                isIconOnly
                aria-label="Previous"
                className="data-hover:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <PreviousBoldIcon />
              </Button>
              <Button
                isIconOnly
                aria-label="Play"
                className="w-auto h-auto data-hover:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <PauseCircleBoldIcon size={54} />
              </Button>
              <Button
                isIconOnly
                aria-label="Next"
                className="data-hover:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <NextBoldIcon />
              </Button>
              <Button
                isIconOnly
                aria-label="Shuffle"
                className="data-hover:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <ShuffleBoldIcon className="text-foreground/80" />
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
