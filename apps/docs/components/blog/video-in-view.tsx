/* eslint-disable jsx-a11y/media-has-caption */
"use client";

import {useInView} from "@heroui/motion";
import {useRef, FC, useEffect, useState, useCallback} from "react";
import {Button, cn, Spinner, Tooltip} from "@heroui/react";

import {PlayBoldIcon, PauseBoldIcon} from "@/components/icons";
import {RotateLeftLinearIcon} from "@/components/icons";

interface VideoInViewProps {
  src: string;
  playMode?: "auto" | "manual";
  autoPlay?: boolean;
  poster?: string;
  width?: number;
  height?: number;
  controls?: boolean;
  className?: string;
}

export const VideoInView: FC<VideoInViewProps> = ({
  src,
  width,
  height,
  poster,
  autoPlay = true,
  playMode = "manual",
  controls = false,
  className,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const isVisible = useInView(videoRef);

  // play video when it is visible and playMode is auto
  useEffect(() => {
    if (playMode !== "auto") {
      return;
    }

    if (isVisible) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isVisible]);

  const handleCanPlay = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current;

    if (videoEl) {
      if (videoEl.readyState > 3) {
        // HAVE_FUTURE_DATA: enough data to start playing
        handleCanPlay();
      } else {
        videoEl.addEventListener("canplaythrough", handleCanPlay);
      }

      // Cleanup the event listener
      return () => {
        videoEl.removeEventListener("canplaythrough", handleCanPlay);
      };
    }
  }, []);

  const onRestart = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  const onTogglePlay = useCallback(() => {
    if (videoRef.current) {
      if (!isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }

      setIsPlaying((v) => !v);
    }
  }, [isPlaying]);

  return (
    <div
      className="relative data-[playing=true]:after:opacity-0 data-[playing=true]:after:z-[-1] after:content-[''] after:absolute after:inset-0 after:bg-black/30 after:z-20 after:transition-opacity"
      data-playing={isPlaying}
    >
      {isLoading && (
        <Spinner
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          color="secondary"
          size="lg"
        />
      )}
      <Tooltip content={isPlaying ? "Pause" : "Play"} delay={1000}>
        <Button
          isIconOnly
          className="absolute z-50 right-12 top-3 border-1 border-transparent bg-transparent before:bg-white/10 before:content-[''] before:block before:z-[-1] before:absolute before:inset-0 before:backdrop-blur-md before:backdrop-saturate-100 before:rounded-lg"
          size="sm"
          variant="bordered"
          onPress={onTogglePlay}
        >
          {isPlaying ? (
            <PauseBoldIcon className="text-white" size={16} />
          ) : (
            <PlayBoldIcon className="text-white" size={16} />
          )}
        </Button>
      </Tooltip>

      <Tooltip content="Restart" delay={1000}>
        <Button
          isIconOnly
          className="absolute z-50 right-3 top-3 border-1 border-transparent bg-transparent before:bg-white/10 before:content-[''] before:block before:z-[-1] before:absolute before:inset-0 before:backdrop-blur-md before:backdrop-saturate-100 before:rounded-lg"
          size="sm"
          variant="bordered"
          onPress={onRestart}
        >
          <RotateLeftLinearIcon className="text-white" size={16} />
        </Button>
      </Tooltip>
      <video
        ref={videoRef}
        loop
        muted
        autoPlay={autoPlay && playMode === "auto"}
        className={cn(
          "w-full border border-transparent dark:border-default-200/50 object-fit rounded-xl shadow-lg",
          className,
        )}
        controls={controls}
        height={height}
        poster={poster}
        src={src}
        width={width}
        onCanPlay={handleCanPlay}
      />
    </div>
  );
};
