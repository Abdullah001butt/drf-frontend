import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { CiMail } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="w-screen bg-[#F6F6F7] padding-x py-20 dark:bg-[#141624]">
      <div className="flex max-lg:gap-12 lg:gap-8 flex-wrap max-md:justify-center justify-between">
        <div className="w-[320px] flex flex-col gap-7 max-md:items-center">
          <h1 className="text-[#141624] text-3xl font-bold dark:text-[#FFFFFF] hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            DevFolio
          </h1>
          <p className="text-[15px] text-[#696A75] leading-relaxed max-md:text-center dark:text-[#97989F]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam
          </p>
        </div>

        <div className="text-[#181A2A] text-[15px] flex flex-col gap-6 px-8 max-md:items-center">
          <p className="font-semibold text-[18px] dark:text-white">
            Quick Links
          </p>
          <ul className="flex flex-col gap-4 text-[#3B3C4A] max-md:items-center dark:text-[#97989F]">
            {["Home", "About", "Blog", "Archived", "Author", "Contact"].map((item) => (
              <li key={item} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-[#181A2A] text-[15px] flex flex-col gap-6 px-8 max-md:items-center">
          <p className="font-semibold text-[18px] dark:text-white">
            Category
          </p>
          <ul className="flex flex-col gap-4 text-[#3B3C4A] max-md:items-center dark:text-[#97989F]">
            {["Lifestyle", "Technology", "Travel", "Business", "Economy", "Sports"].map((item) => (
              <li key={item} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white w-[380px] px-8 flex flex-col items-center justify-center gap-4 rounded-xl shadow-lg dark:bg-[#242535] py-8">
          <h3 className="font-semibold text-2xl dark:text-white">
            Weekly Newsletter
          </h3>
          <p className="text-[#696A75] text-[16px] text-center dark:text-[#97989F]">
            Get blog articles and offers via email
          </p>
          <div className="w-full relative mt-2">
            <input
              placeholder="Your Email"
              className="border border-[#DCDDDF] rounded-lg h-[48px] px-4 py-3 w-full text-[15px] dark:bg-[#181A2A] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <CiMail className="absolute top-[16px] right-[16px] text-[18px] dark:text-[#97989F]" />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-[16px] rounded-lg w-full py-3.5 font-medium transition-colors duration-300 mt-2">
            Subscribe
          </button>
        </div>
      </div>

      <div className="flex items-center gap-8 cursor-pointer mt-16 max-md:justify-center">
        {[FaInstagram, FaFacebookF, BsTwitterX, FaYoutube].map((Icon, index) => (
          <Icon 
            key={index}
            className="dark:text-white text-[22px] text-[#141624] hover:text-blue-600 dark:hover:text-blue-400 transition-colors hover:scale-110 transform duration-300" 
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
