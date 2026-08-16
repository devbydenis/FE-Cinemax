interface ModalProfileProps {
  onClose: () => void;
}

function ModalProfile({ onClose }: ModalProfileProps) {
  return (
    <div className="z-50 flex w-60 flex-col gap-2 text-[10px] sm:w-72 sm:text-xs">
      <div className="succsess-alert border-orange flex h-12 w-full cursor-default items-center justify-between rounded-lg border-2 bg-white px-[10px] sm:h-14">
        <div className="flex gap-2">
          <div className="rounded-lg bg-white/5 p-1 text-[#33ff00] backdrop-blur-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <div>
            <p className="text-orange text-sm font-semibold">Success</p>
            <p className="text-gray-500">Profile has been updated</p>
          </div>
        </div>
        <button
          type="button"
          className="cursor-pointer rounded-md p-1 text-gray-600 transition-colors ease-linear hover:bg-white/5"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ModalProfile;
