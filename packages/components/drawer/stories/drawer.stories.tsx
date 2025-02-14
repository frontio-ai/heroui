/* eslint-disable jsx-a11y/no-autofocus */
import React from "react";
import {Meta} from "@storybook/react";
import {drawer} from "@heroui/theme";
import {Button} from "@heroui/button";
import {Input} from "@heroui/input";
import {Checkbox} from "@heroui/checkbox";
import {Link} from "@heroui/link";
import {Tooltip} from "@heroui/tooltip";
import {Image} from "@heroui/image";
import {Avatar, AvatarGroup} from "@heroui/avatar";
import {MailFilledIcon, LockFilledIcon} from "@heroui/shared-icons";
import {useDisclosure} from "@heroui/use-disclosure";

import {Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, DrawerProps} from "../src";

export default {
  title: "Components/Drawer",
  component: Drawer,
  argTypes: {
    size: {
      control: {
        type: "select",
      },
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "full"],
    },
    placement: {
      control: {
        type: "select",
      },
      options: ["left", "right", "top", "bottom"],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg"],
    },
    backdrop: {
      control: {
        type: "select",
      },
      options: ["transparent", "blur", "opaque"],
    },
    disableAnimation: {
      control: {
        type: "boolean",
      },
    },
    isDismissable: {
      control: {
        type: "boolean",
      },
    },
    isKeyboardDismissDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Drawer>;

const defaultProps = {
  ...drawer.defaultVariants,
  isDismissable: true,
  isKeyboardDismissDisabled: false,
};

const content = (
  <DrawerContent>
    {(onClose) => (
      <>
        <DrawerHeader className="flex flex-col gap-1">Log in</DrawerHeader>
        <DrawerBody>
          <Input
            autoFocus
            endContent={
              <MailFilledIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
            }
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
          />
          <Input
            endContent={
              <LockFilledIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
            }
            label="Password"
            placeholder="Enter your password"
            type="password"
            variant="bordered"
          />
          <div className="flex py-2 px-1 justify-between">
            <Checkbox
              classNames={{
                label: "text-sm",
              }}
            >
              Remember me
            </Checkbox>
            <Link color="primary" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={onClose}>
            Sign in
          </Button>
        </DrawerFooter>
      </>
    )}
  </DrawerContent>
);

const Template = (args: DrawerProps) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure({defaultOpen: args.defaultOpen});

  return (
    <>
      <Button onPress={onOpen}>Open Drawer</Button>
      <Drawer {...args} isOpen={isOpen} onOpenChange={onOpenChange}>
        {content}
      </Drawer>
    </>
  );
};

const PlacementTemplate = (args: DrawerProps) => {
  const [placement, setPlacement] = React.useState<DrawerProps["placement"]>("right");
  const {isOpen, onOpen, onOpenChange} = useDisclosure({defaultOpen: args.defaultOpen});

  const handlePress = (placement: DrawerProps["placement"]) => {
    setPlacement(placement);
    onOpen();
  };

  const placements = ["right", "left", "top", "bottom"] as DrawerProps["placement"][];

  return (
    <>
      <div className="flex flex-wrap gap-2 px-4">
        {placements.map((placement) => (
          <Button
            key={placement}
            color="primary"
            variant="flat"
            onPress={() => handlePress(placement)}
          >
            Open Drawer {placement}
          </Button>
        ))}
      </div>
      <Drawer {...args} isOpen={isOpen} placement={placement} onOpenChange={onOpenChange}>
        {content}
      </Drawer>
    </>
  );
};

const CustomStylesTemplate = (args: DrawerProps) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure({defaultOpen: args.defaultOpen});

  return (
    <>
      <Button
        className="text-default-500"
        endContent={
          <svg height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.75 1.25a.75.75 0 1 0-1.5 0v.823l-.392.044c-.9.121-1.658.38-2.26.982s-.861 1.36-.982 2.26C.5 6.225.5 7.328.5 8.695v.11l.117 3.337c.121.9.38 1.658.982 2.26s1.36.861 2.26.982c.867.117 1.969.117 3.337.117h1.658l3.337-.117c.9-.121 1.658-.38 2.26-.982s.861-1.36.982-2.26c.117-.867.117-1.969.117-3.337v-.11l-.117-3.337c-.121-.9-.38-1.658-.982-2.26s-1.36-.861-2.26-.982l-.44-.048V1.25a.75.75 0 0 0-1.5 0v.756L8.853 2H7.195q-.78-.002-1.445.006zm4.5 3v-.744L8.798 3.5H7.25l-1.5.007v.743a.75.75 0 1 1-1.5 0v-.67l-.192.023c-.734.099-1.122.279-1.399.556s-.457.665-.556 1.399C2.002 6.313 2 7.315 2 8.75l.103 3.192c.099.734.279 1.122.556 1.399s.665.457 1.399.556c.755.101 1.756.103 3.192.103h1.548l3.192-.103c.734-.099 1.122-.279 1.399-.556s.457-.665.556-1.399c.102-.755.103-1.757.103-3.192l-.103-3.192c-.099-.734-.279-1.122-.556-1.399s-.665-.457-1.399-.556l-.241-.028v.675a.75.75 0 0 1-1.5 0zm-5 3.5a.75.75 0 1 1-1.5 0 .75.75 0 1 1 1.5 0m0 3.5a.75.75 0 1 1-1.5 0 .75.75 0 1 1 1.5 0M8 8.5A.75.75 0 1 0 8 7a.75.75 0 1 0 0 1.5m.75 2.75a.75.75 0 1 1-1.5 0 .75.75 0 1 1 1.5 0M11.5 8.5a.75.75 0 1 0 0-1.5.75.75 0 1 0 0 1.5m.75 2.75a.75.75 0 1 1-1.5 0 .75.75 0 1 1 1.5 0"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        }
        variant="flat"
        onPress={onOpen}
      >
        See Event
      </Button>
      <Drawer
        {...args}
        hideCloseButton
        backdrop="blur"
        classNames={{
          base: "data-[placement=right]:sm:m-2 data-[placement=left]:sm:m-2  rounded-medium",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="absolute top-0 inset-x-0 z-50 flex flex-row gap-2 px-2 py-2 border-b border-default-200/50 justify-between bg-content1/50 backdrop-saturate-150 backdrop-blur-lg">
                <Tooltip content="Close">
                  <Button
                    isIconOnly
                    className="text-default-400"
                    size="sm"
                    variant="light"
                    onPress={onClose}
                  >
                    <svg
                      fill="none"
                      height="20"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
                    </svg>
                  </Button>
                </Tooltip>
                <div className="w-full flex justify-start gap-2">
                  <Button
                    className="font-medium text-small text-default-500"
                    size="sm"
                    startContent={
                      <svg
                        height="16"
                        viewBox="0 0 16 16"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.85.75c-.908 0-1.702.328-2.265.933-.558.599-.835 1.41-.835 2.29V7.88c0 .801.23 1.548.697 2.129.472.587 1.15.96 1.951 1.06a.75.75 0 1 0 .185-1.489c-.435-.054-.752-.243-.967-.51-.219-.273-.366-.673-.366-1.19V3.973c0-.568.176-.993.433-1.268.25-.27.632-.455 1.167-.455h4.146c.479 0 .828.146 1.071.359.246.215.43.54.497.979a.75.75 0 0 0 1.483-.23c-.115-.739-.447-1.4-.99-1.877C9.51 1 8.796.75 7.996.75zM7.9 4.828c-.908 0-1.702.326-2.265.93-.558.6-.835 1.41-.835 2.29v3.905c0 .879.275 1.69.833 2.289.563.605 1.357.931 2.267.931h4.144c.91 0 1.705-.326 2.268-.931.558-.599.833-1.41.833-2.289V8.048c0-.879-.275-1.69-.833-2.289-.563-.605-1.357-.931-2.267-.931zm-1.6 3.22c0-.568.176-.992.432-1.266.25-.27.632-.454 1.168-.454h4.145c.54 0 .92.185 1.17.453.255.274.43.698.43 1.267v3.905c0 .569-.175.993-.43 1.267-.25.268-.631.453-1.17.453H7.898c-.54 0-.92-.185-1.17-.453-.255-.274-.43-.698-.43-1.267z"
                          fill="currentColor"
                          fillRule="evenodd"
                        />
                      </svg>
                    }
                    variant="flat"
                  >
                    Copy Link
                  </Button>
                  <Button
                    className="font-medium text-small text-default-500"
                    endContent={
                      <svg
                        fill="none"
                        height="16"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 17 17 7M7 7h10v10" />
                      </svg>
                    }
                    size="sm"
                    variant="flat"
                  >
                    Event Page
                  </Button>
                </div>
                <div className="flex gap-1 items-center">
                  <Tooltip content="Previous">
                    <Button isIconOnly className="text-default-500" size="sm" variant="flat">
                      <svg
                        fill="none"
                        height="16"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m18 15-6-6-6 6" />
                      </svg>
                    </Button>
                  </Tooltip>
                  <Tooltip content="Next">
                    <Button isIconOnly className="text-default-500" size="sm" variant="flat">
                      <svg
                        fill="none"
                        height="16"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </Button>
                  </Tooltip>
                </div>
              </DrawerHeader>
              <DrawerBody className="pt-16">
                <div className="flex w-full justify-center items-center pt-4">
                  <Image
                    isBlurred
                    isZoomed
                    alt="Event image"
                    className="aspect-square w-full hover:scale-110"
                    height={300}
                    src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/places/san-francisco.png"
                  />
                </div>
                <div className="flex flex-col gap-2 py-4">
                  <h1 className="text-2xl font-bold leading-7">SF Bay Area Meetup in November</h1>
                  <p className="text-sm text-default-500">
                    555 California St, San Francisco, CA 94103
                  </p>
                  <div className="mt-4 flex flex-col gap-3">
                    <div className="flex gap-3 items-center">
                      <div className="flex-none border-1 border-default-200/50 rounded-small text-center w-11 overflow-hidden">
                        <div className="text-tiny bg-default-100 py-0.5 text-default-500">Nov</div>
                        <div className="flex items-center justify-center font-semibold text-medium h-6 text-default-500">
                          19
                        </div>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <p className="text-medium text-foreground font-medium">
                          Tuesday, November 19
                        </p>
                        <p className="text-small text-default-500">5:00 PM - 9:00 PM PST</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="flex items-center justify-center border-1 border-default-200/50 rounded-small w-11 h-11">
                        <svg
                          className="text-default-500"
                          height="20"
                          viewBox="0 0 16 16"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g
                            fill="none"
                            fillRule="evenodd"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          >
                            <path d="M2 6.854C2 11.02 7.04 15 8 15s6-3.98 6-8.146C14 3.621 11.314 1 8 1S2 3.62 2 6.854" />
                            <path d="M9.5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                          </g>
                        </svg>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <Link
                          isExternal
                          showAnchorIcon
                          anchorIcon={
                            <svg
                              className="group-hover:text-inherit text-default-400 transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                              fill="none"
                              height="16"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              width="16"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7 17 17 7M7 7h10v10" />
                            </svg>
                          }
                          className="group gap-x-0.5 text-medium text-foreground font-medium"
                          href="https://www.google.com/maps/place/555+California+St,+San+Francisco,+CA+94103"
                          rel="noreferrer noopener"
                        >
                          555 California St suite 500
                        </Link>
                        <p className="text-small text-default-500">San Francisco, California</p>
                      </div>
                    </div>
                    <div className="flex flex-col mt-4 gap-3 items-start">
                      <span className="text-medium font-medium">About the event</span>
                      <div className="text-medium text-default-500 flex flex-col gap-2">
                        <p>
                          Hey Bay Area! We are excited to announce our next meetup on Tuesday,
                          November 19th.
                        </p>
                        <p>
                          Join us for an evening of insightful discussions and hands-on workshops
                          focused on the latest developments in web development and design. Our
                          featured speakers will share their experiences with modern frontend
                          frameworks, responsive design patterns, and emerging web technologies.
                          You&apos;ll have the opportunity to network with fellow developers and
                          designers while enjoying refreshments and snacks.
                        </p>
                        <p>
                          During the main session, we&apos;ll dive deep into practical examples of
                          building scalable applications, exploring best practices for component
                          architecture, and understanding advanced state management techniques. Our
                          interactive workshop portion will let you apply these concepts directly,
                          with experienced mentors available to provide guidance and answer your
                          questions. Whether you&apos;re a seasoned developer or just starting your
                          journey, you&apos;ll find valuable takeaways from this session.
                        </p>

                        <p className="mt-4">
                          Brought to you by the{" "}
                          <Link className="text-default-700" href="https://heroui.com">
                            HeroUI team
                          </Link>
                          .
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col mt-4 gap-3 items-start">
                      <span className="text-small text-default-500">Hosted By</span>
                      <div className="flex gap-2 items-center">
                        <Avatar
                          name="HeroUI"
                          size="sm"
                          src="https://heroui.com/android-chrome-192x192.png"
                        />
                        <span className="text-small text-default-500">HeroUI Team</span>
                      </div>
                    </div>
                    <div className="flex flex-col mt-4 gap-3 items-start">
                      <span className="text-small text-default-500">105 Going</span>
                      <div className="flex gap-2 items-center">
                        <AvatarGroup
                          isBordered
                          classNames={{
                            base: "pl-2",
                            count: "text-default-500 text-tiny bg-default-100",
                          }}
                          size="sm"
                          total={101}
                        >
                          <Tooltip content="Alex">
                            <Avatar
                              className="data-[hover=true]:!translate-x-0"
                              name="Alex"
                              src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                            />
                          </Tooltip>
                          <Tooltip content="Joe">
                            <Avatar
                              className="data-[hover=true]:!translate-x-0"
                              name="Joe"
                              src="https://i.pravatar.cc/150?u=a04258114e290267084"
                            />
                          </Tooltip>
                          <Tooltip content="John">
                            <Avatar
                              className="data-[hover=true]:!translate-x-0"
                              name="John"
                              src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                            />
                          </Tooltip>
                          <Tooltip content="Jane">
                            <Avatar
                              className="data-[hover=true]:!translate-x-0"
                              name="Jane"
                              src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                            />
                          </Tooltip>
                        </AvatarGroup>
                      </div>
                    </div>
                  </div>
                </div>
              </DrawerBody>
              <DrawerFooter className="flex flex-col gap-1">
                <Link className="text-default-400" href="mailto:hello@heroui.com" size="sm">
                  Contact the host
                </Link>
                <Link className="text-default-400" href="mailto:hello@heroui.com" size="sm">
                  Report event
                </Link>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const DefaultOpen = {
  render: Template,
  args: {
    ...defaultProps,
    defaultOpen: true,
  },
};

export const Placement = {
  render: PlacementTemplate,
  args: {
    ...defaultProps,
    placement: "right",
  },
};

export const DisableAnimation = {
  render: Template,
  args: {
    ...defaultProps,
    disableAnimation: true,
  },
};

export const CustomMotion = {
  render: Template,
  args: {
    ...defaultProps,
    motionProps: {
      variants: {
        enter: {
          opacity: 1,
          x: 0,
          duration: 0.3,
        },
        exit: {
          x: 100,
          opacity: 0,
          duration: 0.3,
        },
      },
    },
  },
};

export const CustomStyles = {
  render: CustomStylesTemplate,
  args: {
    ...defaultProps,
  },
};
