interface ModalProps {
  open: boolean;
  message: string;
  color?: "orange" | "green" | "red";
  onClose: () => void;
}

const colorBorder: Record<NonNullable<ModalProps["color"]>, string> = {
  orange: "border-orange",
  green: "border-green-500",
  red: "border-red-500",
};

/**
 * Modal yang sudah dikontrol (tanpa ModalContext). Parent mengelola
 * `open` & `onClose` sebagai state lokal.
 */
export function Modal({ open, message, color = "orange", onClose }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 z-30 flex items-center justify-center">
      <div
        className="absolute inset-0 rounded-4xl bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div
        className={`relative z-10 flex w-72 flex-col justify-around border-t-8 bg-white px-4 py-5 shadow-md ${colorBorder[color]}`}
      >
        <p className="font-sans text-lg font-bold">INFO</p>
        <div className="py-3">
          <p className="text-lg text-gray-400">{message}</p>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-orange w-full cursor-pointer rounded-xl px-3 py-1 font-semibold text-white transition-colors ease-in-out hover:bg-orange-400"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
