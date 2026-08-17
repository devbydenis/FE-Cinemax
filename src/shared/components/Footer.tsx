import logoTickitz from "@/assets/cinemax-logo-transparent.png";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineYoutube } from "react-icons/ai";
import cineone21 from "@/assets/cineone21-logo.svg";
import ebvid from "@/assets/ebvid-logo.svg";
import hiflix from "@/assets/hiflix-logo.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black-primary flex flex-col gap-8 rounded-t-[3rem] px-5 py-10 text-white sm:flex-row sm:p-10 md:gap-20 md:p-10">
      <section className="flex-1">
        <img src={logoTickitz} alt="logo-tickitz" />
        <p className="text-base">Stop waiting in line. Buy tickets conveniently, watch movies quietly.</p>
      </section>
      <section className="flex-1">
        <section className="flex flex-col items-center gap-10 sm:flex-row sm:flex-wrap md:gap-10">
          <div className="flex flex-col gap-8">
            <h4 className="text-xl font-bold">EXPLORE</h4>
            <ul className="flex flex-col items-center gap-4 sm:items-start">
              <Link to={"#"}>Cinemas</Link>
              <Link to={"#"}>Movie List</Link>
              <Link to={"#"}>My Ticket</Link>
              <Link to={"#"}>Notification</Link>
            </ul>
          </div>
          <div className="flex flex-col gap-8">
            <h4 className="text-xl font-bold">OUR SPONSOR</h4>
            <ul className="flex flex-col items-center gap-6 sm:items-start">
              <li><img src={ebvid} alt="ebv.id" /></li>
              <li><img src={cineone21} alt="cineone21" /></li>
              <li><img src={hiflix} alt="hiflix" /></li>
            </ul>
          </div>
          <div className="flex flex-col gap-8">
            <h4 className="text-xl font-bold">FOLLOW US</h4>
            <ul className="flex flex-col items-center gap-4 sm:items-start">
              <span className="flex items-center gap-2.5">
                <FaFacebook />
                <p>tickitz.cinema.id</p>
              </span>
              <span className="flex items-center gap-2.5">
                <FaInstagram />
                <p>tickitz.cinema.id</p>
              </span>
              <span className="flex items-center gap-2.5">
                <FaXTwitter />
                <p>tickitz.cinema.id</p>
              </span>
              <span className="flex items-center gap-2.5">
                <AiOutlineYoutube />
                <p>tickitz.cinema.id</p>
              </span>
            </ul>
          </div>
        </section>
        <section className="mt-8 text-center">
          <p>© 2025 Tickitz. All Rights Reserved.</p>
        </section>
      </section>
    </footer>
  );
}

export default Footer;
