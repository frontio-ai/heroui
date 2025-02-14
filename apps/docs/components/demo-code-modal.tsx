"use client";

import {FC, useState} from "react";
import {
  Modal,
  Button,
  ModalContent,
  ModalHeader,
  Link as HeroUILink,
  ModalBody,
  ModalFooter,
  Skeleton,
} from "@heroui/react";
import Link from "next/link";

import {CodeWindow} from "@/components/code-window";
import {useIsMobile} from "@/hooks/use-media-query";

export interface DemoCodeModalProps {
  isOpen: boolean;
  code: string;
  title: string;
  subtitle?: string;
  onClose: () => void;
}

export const DemoCodeModal: FC<DemoCodeModalProps> = ({isOpen, code, title, subtitle, onClose}) => {
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  const isMobile = useIsMobile();

  const lowerTitle = title.toLowerCase();
  const fileName = `${lowerTitle}.tsx`;

  return (
    <Modal
      classNames={{
        backdrop: "z-100002", // to appear above the navbar
        wrapper: "z-100003", // to appear above the backdrop
      }}
      isOpen={isOpen}
      motionProps={{
        onAnimationComplete: () => {
          setIsCodeVisible(isOpen);
        },
      }}
      radius={isMobile ? "none" : "lg"}
      size={isMobile ? "full" : "2xl"}
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-2">
          <h3>{title} code</h3>
          <p className="text-base font-normal">
            {subtitle || (
              <>
                This is an example of how to use the {lowerTitle} component, for more information
                please visit the&nbsp;
                <HeroUILink as={Link} href={`/docs/components/${lowerTitle}`}>
                  {lowerTitle}
                </HeroUILink>
                &nbsp;docs.
              </>
            )}
          </p>
        </ModalHeader>
        <ModalBody className="flex-initial md:pb-6">
          {isCodeVisible ? (
            <CodeWindow
              showCopy
              showWindowIcons
              className="min-h-[320px] h-[60vh]! max-h-full"
              language="jsx"
              title={fileName}
              value={code}
            />
          ) : (
            <Skeleton className="h-[60vh] rounded-xl" />
          )}
        </ModalBody>
        <ModalFooter className="md:hidden">
          <Button fullWidth onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
