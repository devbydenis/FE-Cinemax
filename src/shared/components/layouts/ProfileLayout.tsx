import { useState } from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import InfoAccountProfile from "@/features/profile/components/InfoAccountProfile";
import NavProfile from "@/features/profile/components/NavProfile";

export interface ProfileLayoutContext {
  showEditProfile: boolean;
  setShowEditProfile: (value: boolean) => void;
}

function ProfileLayout() {
  const [showEditProfile, setShowEditProfile] = useState(false);

  return (
    <>
      <Navbar />
      <main className="relative grid grid-cols-1 pb-5 md:grid-cols-3 md:grid-rows-[auto_1fr]">
        <NavProfile />
        <InfoAccountProfile onEditProfile={() => setShowEditProfile(true)} />
        <div className="col-span-2 md:order-1">
          <Outlet context={{ showEditProfile, setShowEditProfile }} />
        </div>
      </main>
    </>
  );
}

export default ProfileLayout;
