import type { TableCompanyProfilePageProps } from "../../../../shared/types/type";
import { UploadCloud } from "lucide-react";

const TableCompanyProfile = ({
  label,
  value,
  icon,
  name,
  onchange,
  editPreviewImage,
  previewImage,
}: TableCompanyProfilePageProps) => {
  return (
    <div
      className="border-b border-[#16FF6E]/[.07] text-sm p-5
                 justify-between flex
                 transition-colors duration-200
                 hover:bg-[#16FF6E]/[.02]"
    >
      <div className="flex items-center w-full gap-4">
        {/* label */}
        <span className="font-dm font-medium text-[#6B8C80] 2xl:text-base md:text-sm w-70 shrink-0">
          {label}
        </span>

        {name === "imageProfile" ? (
          <>
            <label
              htmlFor="imageProfile"
              className="flex items-center justify-center
                         py-2 px-8 rounded-[10px] cursor-pointer
                         border border-dashed border-[#16FF6E]/20
                         bg-[#0D1F27]
                         hover:border-[#16FF6E]/40
                         transition-all duration-200
                         w-fit h-20 overflow-hidden"
            >
              {editPreviewImage ? (
                <img
                  src={editPreviewImage}
                  className="h-full object-contain"
                  alt="preview"
                />
              ) : previewImage ? (
                <img
                  src={previewImage}
                  className="h-full object-contain"
                  alt="preview"
                />
              ) : (
                <div className="flex flex-col items-center gap-1.5">
                  <UploadCloud size={18} className="text-[#16FF6E]" />
                  <span className="font-dm text-xs text-[#6B8C80]">
                    Upload file
                  </span>
                </div>
              )}
            </label>
            <input
              onChange={onchange}
              className="hidden"
              type="file"
              name={name}
              id="imageProfile"
            />
          </>
        ) : (
          <span
            className={`font-dm text-wrap 2xl:text-sm md:text-xs
                        ${icon ? "text-[#E8F4F0]" : "text-[#6B8C80]"}`}
          >
            {value}
          </span>
        )}
      </div>

      {/* action icon */}
      {icon && (
        <div
          className="cursor-pointer shrink-0 flex items-center
                        text-[#6B8C80] hover:text-[#16FF6E]
                        transition-colors duration-200 ml-4"
        >
          {icon}
        </div>
      )}
    </div>
  );
};

export default TableCompanyProfile;
