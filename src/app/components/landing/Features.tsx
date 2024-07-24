import {
    ChatBubbleIcon,
    BellIcon,
    VideoIcon,
    PersonIcon,
  } from "@radix-ui/react-icons";
  
  import { BentoCard, BentoGrid } from "../ui/bento-grid";
  
  const features = [
    {
      Icon: ChatBubbleIcon,
      name: "Connect to Telegram",
      description: "Receive daily summaries via Telegram and email.",
      href: "https://t.me/Stay_Connected_Bot",
      cta: "Learn more",
      background: (
        <div className="absolute -right-20 -top-20 bg-base-100 opacity-60 w-full h-full"></div>
      ),
      className: "lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-3",
    },
    {
      Icon: BellIcon,
      name: "Autonomous Summarizer",
      description: "Daily summaries of Instagram stories automatically.",
      href: "/",
      cta: "Learn more",
      background: (
        <div className="absolute -right-20 -top-20 bg-base-100 opacity-60 w-full h-full"></div>
      ),
      className: "lg:col-start-1 lg:col-end-1 lg:row-start-1 lg:row-end-3",
    },
    {
      Icon: VideoIcon,
      name: "Recap Video",
      description: "Watch recap videos from Instagram stories.",
      href: "/",
      cta: "Learn more",
      background: (
        <div className="absolute -right-20 -top-20 bg-base-100 opacity-60 w-full h-full"></div>
      ),
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-3",
    },
    {
      Icon: PersonIcon,
      name: "Choose Who to Follow",
      description: "Select who you want to follow and get updates on their stories.",
      href: "/",
      cta: "Learn more",
      background: (
        <div className="absolute -right-20 -top-20 bg-base-100 opacity-60 w-full h-full"></div>
      ),
      className: "lg:col-start-3 lg:col-end-2 lg:row-start-2 lg:row-end-4 bg-base-100",
    },
  ];
  
  function Features() {
    return (
      <BentoGrid className="lg:grid-rows-3 grid-cols-2 relative">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    );
  }
  
  export default Features;
  