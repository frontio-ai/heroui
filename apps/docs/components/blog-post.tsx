"use client";

import {BlogPost} from "contentlayer2/generated";
import {Card, CardFooter, CardBody, CardHeader, Link, Avatar, Image} from "@heroui/react";
import Balancer from "react-wrap-balancer";
import {format, parseISO} from "date-fns";
import NextLink from "next/link";
import {AnimatePresence, motion} from "@heroui/motion";
import {usePostHog} from "posthog-js/react";

import {useIsMounted} from "@/hooks/use-is-mounted";

const BlogPostCard = (post: BlogPost) => {
  const isMounted = useIsMounted();

  const posthog = usePostHog();

  const handlePress = () => {
    posthog.capture("BlogPostCard - Selection", {
      name: post.title,
      action: "click",
      category: "blog",
      data: post.url ?? "",
    });
  };

  return (
    <AnimatePresence>
      {isMounted && (
        <motion.article
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: 5}}
          initial={{opacity: 0, y: 5}}
          transition={{duration: 0.3}}
        >
          <Card
            disableRipple
            isBlurred
            as={NextLink}
            className="p-2 h-full border-transparent text-start bg-white/5 dark:bg-default-400/10 backdrop-blur-lg backdrop-saturate-[1.8]"
            href={post.url}
            isPressable={!!post.url}
            onPress={handlePress}
          >
            <CardHeader>
              <Link
                as={NextLink}
                className="font-semibold text-foreground"
                href={post.url}
                size="lg"
                underline="hover"
                onPress={handlePress}
              >
                <Balancer>{post.title}</Balancer>
              </Link>
            </CardHeader>
            <CardBody className="pt-0 px-2 pb-1">
              <Image className="mb-4" src={post.image} />
              <p className="font-normal w-full text-default-600">{post.description}</p>
            </CardBody>
            <CardFooter className="flex justify-between items-center">
              <time className="block text-small text-default-500" dateTime={post.date}>
                {format(parseISO(post.date), "LLLL d, yyyy")} {post?.draft && " (Draft)"}
              </time>
              <Avatar size="sm" src={post.author?.avatar} />
            </CardFooter>
          </Card>
        </motion.article>
      )}
    </AnimatePresence>
  );
};

export const BlogPostList = ({posts}: {posts: BlogPost[]}) => {
  return (
    <div className="mt-10 grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
      {posts.map((post, idx) => (
        <BlogPostCard key={idx} {...post} />
      ))}
    </div>
  );
};
