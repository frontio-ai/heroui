import React from "react";
import {Meta} from "@storybook/react";
import {navbar} from "@heroui/theme";
import {Link} from "@heroui/link";
import {Button} from "@heroui/button";
import {Avatar} from "@heroui/avatar";
import {Input} from "@heroui/input";
import Lorem from "react-lorem-component";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@heroui/dropdown";
import {
  ChevronDown,
  Lock,
  Activity,
  Flash,
  Server,
  TagUser,
  Scale,
  SearchIcon,
} from "@heroui/shared-icons";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  NavbarProps,
} from "../src";

export default {
  title: "Components/Navbar",
  component: Navbar,
  argTypes: {
    position: {
      control: {
        type: "select",
      },
      options: ["static", "fixed"],
    },
    maxWidth: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg", "xl", "2xl", "full"],
    },
    isBlurred: {
      control: {
        type: "boolean",
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
      <div className="flex justify-center w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Navbar>;

const defaultProps = {
  ...navbar.defaultVariants,
};

const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

const App = React.forwardRef(({children}: any, ref: any) => {
  return (
    <div
      ref={ref}
      className="max-w-[90%] sm:max-w-[80%] max-h-[90vh] overflow-x-hidden overflow-y-scroll shadow-md relative border border-default"
    >
      {children}
      <div className="max-w-5xl flex flex-col gap-4 px-10 mt-8">
        <h1>Lorem ipsum dolor sit ame</h1>
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <Lorem key={i} className="mb-5 text-lg" count={1} sentenceUpperBound={40} />
        ))}
      </div>
    </div>
  );
});

App.displayName = "App";

const Template = (args: NavbarProps) => {
  // for hide on scroll cases
  const parentRef = React.useRef(null);

  return (
    <App ref={parentRef}>
      <Navbar {...args} parentRef={parentRef}>
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold hidden sm:block text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarContent className="hidden md:flex">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#">Customers</Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Pricing
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden lg:block">
            <Link color="foreground" href="#">
              Company
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </App>
  );
};

const WithMenuTemplate = (args: NavbarProps) => {
  const parentRef = React.useRef(null);

  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean | undefined>(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <App ref={parentRef}>
      <Navbar parentRef={parentRef} position="sticky" onMenuOpenChange={setIsMenuOpen} {...args}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <AcmeLogo />
            <p className="font-bold hidden sm:block text-inherit">ACME</p>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="hidden md:flex">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#">Customers</Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Pricing
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden lg:block">
            <Link color="foreground" href="#">
              Company
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </App>
  );
};

const WithDropdownTemplate = (args: NavbarProps) => {
  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    lock: <Lock className="text-success" fill="currentColor" size={30} />,
    activity: <Activity className="text-secondary" fill="currentColor" size={30} />,
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    server: <Server className="text-success" fill="currentColor" size={30} />,
    user: <TagUser className="text-danger" fill="currentColor" size={30} />,
  };

  return (
    <App>
      <Navbar {...args}>
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold hidden sm:block text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarContent className="hidden gap-0 sm:flex">
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button endContent={icons.chevron} radius="full" variant="light">
                  Features
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="ACME features"
              itemClasses={{
                base: "gap-4",
                wrapper: "py-3",
              }}
            >
              <DropdownItem
                key="autoscaling"
                description="ACME scales apps based on demand and load"
                startContent={icons.scale}
              >
                Autoscaling
              </DropdownItem>
              <DropdownItem
                key="usage_metrics"
                description="Real-time metrics to debug issues"
                startContent={icons.activity}
              >
                Usage Metrics
              </DropdownItem>
              <DropdownItem
                key="production_ready"
                description="ACME runs on ACME, join us at web scale"
                startContent={icons.flash}
              >
                Production Ready
              </DropdownItem>
              <DropdownItem
                key="99_uptime"
                description="High availability and uptime guarantees"
                startContent={icons.server}
              >
                +99% Uptime
              </DropdownItem>
              <DropdownItem
                key="supreme_support"
                description="Support team ready to respond"
                startContent={icons.user}
              >
                +Supreme Support
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavbarItem isActive>
            <Link className="px-4" href="#">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="px-4" color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="px-4" color="foreground" href="#">
              Pricing
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden px-4 lg:block">
            <Link color="foreground" href="#">
              Company
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </App>
  );
};

const WithAvatarUserTemplate = (args: NavbarProps) => {
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Logout",
  ];

  return (
    <App>
      <Navbar {...args}>
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarContent className="hidden gap-3 md:flex">
          <NavbarItem>
            <Link color="foreground" href="#">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link color="secondary" href="#">
              Team
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Deployments
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Activity
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Settings
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" color="secondary">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </App>
  );
};

const WithSearchInputTemplate = (args: NavbarProps) => {
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Logout",
  ];

  return (
    <App>
      <Navbar {...args}>
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>

        <NavbarContent className="hidden gap-3 md:flex" justify="start">
          <NavbarBrand>
            <AcmeLogo />
            <p className="font-bold text-inherit">ACME</p>
          </NavbarBrand>
          <NavbarItem>
            <Link color="foreground" href="#">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link color="secondary" href="#">
              Team
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Deployments
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Activity
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Settings
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent as="div" justify="end">
          <Input
            className="w-fit"
            classNames={{
              input: "text-base",
            }}
            placeholder="Search..."
            size="sm"
            startContent={<SearchIcon className="text-base pointer-events-none flex-shrink-0" />}
            onClear={() => {
              // eslint-disable-next-line no-console
              console.log("clear");
            }}
          />
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" color="secondary">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </App>
  );
};

export const Static = {
  render: Template,

  args: {
    ...defaultProps,
    position: "static",
  },
};

export const Sticky = {
  render: Template,

  args: {
    ...defaultProps,
    position: "sticky",
  },
};

export const HideOnScroll = {
  render: Template,

  args: {
    ...defaultProps,
    position: "sticky",
    shouldHideOnScroll: true,
  },
};

export const WithMenu = {
  render: WithMenuTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithDropdown = {
  render: WithDropdownTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithAvatarUser = {
  render: WithAvatarUserTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithSearchInput = {
  render: WithSearchInputTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithShouldBlockScroll = {
  render: (args) => {
    return (
      <div className="flex gap-8 w-[1024px]">
        <WithMenuTemplate {...args} label="shouldBlockScroll: false" shouldBlockScroll={false} />
        <WithMenuTemplate {...args} label="shouldBlockScroll: true" shouldBlockScroll={true} />
      </div>
    );
  },

  args: {
    ...defaultProps,
  },
};
