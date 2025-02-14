/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-autofocus */
import React from "react";
import {Meta} from "@storybook/react";
import {modal} from "@heroui/theme";
import {Button} from "@heroui/button";
import {Input} from "@heroui/input";
import {Checkbox} from "@heroui/checkbox";
import {Link} from "@heroui/link";
import {Switch} from "@heroui/switch";
import {MailFilledIcon, LockFilledIcon} from "@heroui/shared-icons";
import Lorem from "react-lorem-component";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
  useDisclosure,
  useDraggable,
} from "../src";

export default {
  title: "Components/Modal",
  component: Modal,
  argTypes: {
    size: {
      control: {
        type: "select",
      },
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "full"],
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
    children: {
      control: {
        disable: true,
      },
    },
    shouldBlockScroll: {
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
} as Meta<typeof Modal>;

const defaultProps = {
  ...modal.defaultVariants,
  isDismissable: true,
  isKeyboardDismissDisabled: false,
};

const content = (
  <ModalContent>
    {(onClose) => (
      <>
        <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
        <ModalBody>
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
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={onClose}>
            Sign in
          </Button>
        </ModalFooter>
      </>
    )}
  </ModalContent>
);

const Template = (args: ModalProps) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure({defaultOpen: args.defaultOpen});

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onOpenChange={onOpenChange}>
        {content}
      </Modal>
    </>
  );
};

const InsideScrollTemplate = (args: ModalProps) => {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <Lorem count={10} />
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const OutsideScrollTemplate = (args: ModalProps) => {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} scrollBehavior="outside" onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <Lorem count={10} />
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
const OpenChangeTemplate = (args: ModalProps) => {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();

  return (
    <div className="flex flex-col gap-2">
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <Lorem count={5} />
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <p className="text-sm">isOpen: {isOpen ? "true" : "false"}</p>
    </div>
  );
};
const DraggableTemplate = (args: ModalProps) => {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const targetRef = React.useRef(null);

  const {moveProps} = useDraggable({targetRef});

  return (
    <div className="flex flex-col gap-2">
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal {...args} ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader {...moveProps}>Modal Title</ModalHeader>
          <ModalBody>
            <Lorem count={1} />
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
const DraggableOverflowTemplate = (args: ModalProps) => {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const targetRef = React.useRef(null);
  const [disableDraggable, setDisableDraggable] = React.useState(false);
  const [canOverflow, setCanOverflow] = React.useState(true);

  const {moveProps} = useDraggable({targetRef, isDisabled: disableDraggable, canOverflow});

  return (
    <div className="flex flex-col gap-2">
      <Button onPress={onOpen}>Open Modal</Button>
      <Switch isSelected={disableDraggable} onValueChange={setDisableDraggable}>
        Disable Draggable
      </Switch>
      <Switch isSelected={canOverflow} onValueChange={setCanOverflow}>
        Overflow viewport
      </Switch>
      <Modal {...args} ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader {...moveProps}>Modal Title</ModalHeader>
          <ModalBody>
            <Lorem count={1} />
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
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

export const OpenChange = {
  render: OpenChangeTemplate,

  args: {
    ...defaultProps,
    scrollBehavior: "inside",
  },
};

export const InsideScroll = {
  render: InsideScrollTemplate,

  args: {
    ...defaultProps,
    scrollBehavior: "inside",
  },
};

export const OutsideScroll = {
  render: OutsideScrollTemplate,

  args: {
    ...defaultProps,
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
          y: 0,
          duration: 0.3,
        },
        exit: {
          y: 20,
          opacity: 0,
          duration: 0.3,
        },
      },
    },
  },
};

export const Draggable = {
  render: DraggableTemplate,

  args: {
    ...defaultProps,
  },
};

export const DraggableOverflow = {
  render: DraggableOverflowTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithShouldBlockScroll = {
  render: (args) => {
    return (
      <div className="flex gap-8">
        <Template {...args} label="shouldBlockScroll: false" shouldBlockScroll={false} />
        <Template {...args} label="shouldBlockScroll: true" shouldBlockScroll={true} />
      </div>
    );
  },

  args: {
    ...defaultProps,
  },
};
