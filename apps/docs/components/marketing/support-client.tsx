"use client";

import {FC, useMemo, useRef} from "react";
import {Avatar, AvatarProps, Button, Spacer, Tooltip} from "@heroui/react";
import {clamp} from "@heroui/shared-utils";
import {usePostHog} from "posthog-js/react";

import {sectionWrapper, titleWrapper, title, subtitle} from "../primitives";

import {FeaturesGrid} from "./features-grid";

import {OpenCollectiveIcon, PatreonIcon, HeartBoldIcon, PlusLinearIcon} from "@/components/icons";
import {Sponsor, SPONSOR_TIERS, SPONSOR_COLORS, getTier} from "@/libs/docs/sponsors";
import {SonarPulse} from "@/components/sonar-pulse";
import {useIsMobile} from "@/hooks/use-media-query";

export interface SupportProps {
  sponsors: Sponsor[];
}

const supportAccounts = [
  {
    title: "Open Collective",
    description: "Sponsor the HeroUI maintainers.",
    icon: <OpenCollectiveIcon className="text-pink-500" />,
    href: "https://opencollective.com/heroui",
    isExternal: true,
  },
  {
    title: "Patreon",
    description: "Sponsor the creator, Junior Garcia.",
    icon: <PatreonIcon className="text-pink-500" />,
    href: "https://www.patreon.com/jrgarciadev?fan_landing=true",
    isExternal: true,
  },
];

const SONAR_PULSE_SIZE = 80;
const SONAR_PULSE_CIRCLES_COUNT = 4;
const SONAR_PULSE_RADIUS = 130;

const getSponsorName = (sponsor: Sponsor) => {
  if (!sponsor.name) {
    return "";
  }

  return sponsor.name.slice(0, 2).toUpperCase();
};

const getSponsorSize = (sponsor: Sponsor, isMobile: boolean) => {
  let size: AvatarProps["size"] = "md";
  const tier = sponsor.tier || getTier(sponsor.totalAmountDonated);

  switch (tier) {
    case SPONSOR_TIERS.BRONZE:
      size = isMobile ? "sm" : "md";
      break;
    case SPONSOR_TIERS.SILVER:
      size = isMobile ? "sm" : "md";
      break;
    case SPONSOR_TIERS.GOLD:
      size = isMobile ? "md" : "lg";
      break;
    case SPONSOR_TIERS.PLATINUM:
      size = isMobile ? "md" : "lg";
      break;
    default:
      size = isMobile ? "sm" : "md";
  }

  return size;
};

const getSponsorColor = (sponsor: Sponsor) => {
  const tier = sponsor.tier || getTier(sponsor.totalAmountDonated);

  return SPONSOR_COLORS[tier] || "default";
};

const getSponsorAvatarStyles = (index: number, sponsors: Sponsor[] = []) => {
  const angle = (index * 360) / sponsors.length;
  const radius = SONAR_PULSE_RADIUS;

  // position the avatar randomly inside the sonar pulse
  const randomRadius = clamp(Math.floor((index + 1) * radius), radius * 0.4, radius);

  const x = randomRadius * Math.cos((angle * Math.PI) / 180);
  const y = randomRadius * Math.sin((angle * Math.PI) / 180);

  return {
    transform: `translate(${x}px, ${y}px)`,
  };
};

export const Support: FC<SupportProps> = ({sponsors = []}) => {
  const sonarRef = useRef(null);
  const isMobile = useIsMobile();
  const posthog = usePostHog();

  const handleExternalLinkClick = (href: string) => {
    if (!href) return;
    window.open(href, "_blank");
  };

  const handleBecomeSponsor = () => {
    posthog.capture("Support - Become a sponsor", {
      action: "click",
      category: "landing-page",
    });

    handleExternalLinkClick(supportAccounts[0].href);
  };
  const renderSponsors = useMemo(() => {
    if (!sponsors.length) return null;

    return (
      <div
        className="absolute rounded-full bg-transparent"
        style={{
          width: `${SONAR_PULSE_RADIUS}px`,
          top: SONAR_PULSE_RADIUS / 6,
          left: SONAR_PULSE_RADIUS / 6,
        }}
      >
        {sponsors.map((sponsor, index) => (
          <Avatar
            key={`${sponsor.MemberId}-${index}`}
            isBordered
            showFallback
            className="absolute cursor-pointer bg-transparent before:bg-white/10 before:content-[''] before:block before:z-[-1] before:absolute before:inset-0 before:backdrop-blur-md before:backdrop-saturate-200"
            color={getSponsorColor(sponsor) as AvatarProps["color"]}
            name={getSponsorName(sponsor)}
            size={getSponsorSize(sponsor, isMobile)}
            src={sponsor.image}
            style={getSponsorAvatarStyles(index, sponsors)}
            onClick={() => handleExternalLinkClick(sponsor["website"] || sponsor["profile"])}
          />
        ))}
      </div>
    );
  }, [isMobile, sponsors]);

  return (
    <section className={sectionWrapper({class: "flex flex-col items-center z-20 mt-16 lg:mt-44"})}>
      <div className="max-w-4xl flex flex-col gap-8">
        <div>
          <div className={titleWrapper({class: "text-center items-center"})}>
            <div className="flex md:inline-flex flex-col md:flex-row items-center">
              <h1 className={title({size: "lg"})}>Support HeroUI&nbsp;</h1>
              <HeartBoldIcon
                className="text-pink-500 animate-heartbeat"
                size={50}
                style={{
                  animationDuration: "2.5s",
                }}
              />
            </div>
          </div>
          <p
            className={subtitle({class: "md:w-full text-center flex justify-center items-center"})}
          >
            Using HeroUI in a profit-making product, as a freelancer, or for fun projects? Your
            contributions will help to make HeroUI better.
          </p>
          <Spacer y={12} />
          <FeaturesGrid
            classNames={{
              base: "lg:grid-cols-2",
            }}
            features={supportAccounts}
          />
          <div
            ref={sonarRef}
            className="relative mt-32 md:mt-60 w-full flex items-center justify-center"
          >
            <SonarPulse
              circlesCount={SONAR_PULSE_CIRCLES_COUNT}
              color="#7928CA"
              icon={
                <Tooltip
                  showArrow
                  color="secondary"
                  content={"Become a sponsor"}
                  offset={10}
                  radius="full"
                >
                  <Button
                    isIconOnly
                    aria-label="Become a sponsor"
                    className="z-50 w-auto h-auto bg-linear-to-b from-[#FF1CF7] to-[#7928CA]"
                    radius="full"
                    onPress={handleBecomeSponsor}
                  >
                    <PlusLinearIcon
                      className="flex items-center justify-center rounded-full text-white"
                      size={54}
                    />
                  </Button>
                </Tooltip>
              }
              playState="running"
              size={SONAR_PULSE_SIZE}
            >
              {renderSponsors}
            </SonarPulse>
          </div>
        </div>
      </div>
    </section>
  );
};
