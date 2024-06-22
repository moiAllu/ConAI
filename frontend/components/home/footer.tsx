import React from "react";

const footerData = [
  {
    title: "Company",
    links: [
      {
        title: "About",
        link: "#",
      },
      {
        title: "Contact",
        link: "#",
      },
      {
        title: "Careers",
        link: "#",
      },
      {
        title: "Abuse",
        link: "#",
      },
      {
        title: "Terms",
        link: "#",
      },
    ],
  },
  {
    title: "Services",
    links: [
      {
        title: "AI Models",
        link: "#",
      },
      {
        title: "API",
        link: "#",
      },
      {
        title: "Pricing",
        link: "#",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        title: "Blog",
        link: "#",
      },
      {
        title: "Forum",
        link: "#",
      },
      {
        title: "Discord",
        link: "#",
      },
    ],
  },

  {
    title: "Legal",
    links: [
      {
        title: "Privacy",
        link: "#",
      },
      {
        title: "Cookies",
        link: "#",
      },
    ],
  },
  {
    title: "Support",
    links: [
      {
        title: "Help",
        link: "#",
      },
      {
        title: "Status",
        link: "#",
      },
    ],
  },
];
const Footer = () => {
  return (
    <div className=" w-full h-full flex flex-col justify-start space-y-10">
      <div className="flex  md:px-20 justify-between">
        <div className="flex-grow-1">
          <h1 className="text-2xl font-bold">ConAi</h1>
          <p className="text-sm w-[70%] text-gray-600">
            Conai is a platform that allows you to access the latest AI models.
          </p>
          {/* <p className="text-sm">© 2021 Conai. All rights reserved.</p> */}
        </div>
        <div className="flex gap-10">
          {footerData.map((data) => (
            <div className="flex flex-col gap-2 justify-start items-center ">
              <h1 className="text-lg font-semibold">{data.title}</h1>
              <div className="text-sm text-gray-400 flex flex-col">
                {data.links.map((link) => (
                  <a href={link.link} className="text-sm">
                    {link.title}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 flex  items-center justify-between">
        <p className="text-sm">© 2024 Conai. All rights reserved.</p>
        <div className=" flex justify-center items-center space-x-2">
          <a href="#" className="text-sm mr-2">
            <img src="/social/youtube.svg" alt="youtube" />
          </a>
          <a href="#" className="text-sm">
            <img src="/social/instagram.svg" alt="instagram" />
          </a>
          <a href="#" className="text-sm">
            <img src="/social/facebook.svg" alt="facebook" />
          </a>
          <a href="#" className="text-sm">
            <img src="/social/twitter.svg" alt="twitter" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
