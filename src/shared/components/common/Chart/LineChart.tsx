import { LineChart } from "@mui/x-charts/LineChart";
import type { BasicAreaProps } from "../../../types/type";

export default function BasicArea({
  heading,
  datas,
  days,
  color,
}: BasicAreaProps) {
  const gradientId = color ? `gradient-${color.replace("#", "")}` : "";

  return (
    <div
      className="relative p-6 bg-[#0A1A20] border border-[#16FF6E]/[.07]
                 rounded-[20px] w-full overflow-hidden"
    >
      {/* shimmer top line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/20 to-transparent" />

      <h2 className="font-syne font-bold text-white 2xl:text-lg md:text-base mb-4">
        {heading}
      </h2>

      <LineChart
        height={300}
        xAxis={[
          {
            data: days,
            scaleType: "band",
            tickLabelStyle: {
              fontSize: 11,
              fill: "#6B8C80",
              fontFamily: "DM Sans, sans-serif",
            },
          },
        ]}
        yAxis={[
          {
            tickLabelStyle: {
              fontSize: 11,
              fill: "#6B8C80",
              fontFamily: "DM Sans, sans-serif",
            },
          },
        ]}
        series={[
          {
            data: datas,
            area: true,
            baseline: "min",
            color: color,
            curve: "natural",
            showMark: true,
            label: "Jumlah trafic",
          },
        ]}
        sx={{
          // transparent chart background
          "& .MuiChartsAxis-root .MuiChartsAxis-line": {
            stroke: "rgba(22,255,110,0.08)",
          },
          "& .MuiChartsAxis-root .MuiChartsAxis-tick": {
            stroke: "rgba(22,255,110,0.08)",
          },
          "& .MuiChartsGrid-line": { stroke: "rgba(22,255,110,0.05)" },
          "& .MuiLineElement-root": { strokeWidth: 2.5 },
          "& .MuiAreaElement-root": {
            fill: `url(#${gradientId})`,
            fillOpacity: 0.3,
          },
          "& .MuiMarkElement-root": {
            stroke: color,
            fill: "#0A1A20",
            strokeWidth: 2,
            r: 4,
          },
          "& .MuiChartsLegend-root text": {
            fill: "#6B8C80 !important",
            fontFamily: "DM Sans, sans-serif !important",
            fontSize: "12px !important",
          },
          backgroundColor: "transparent",
        }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
      </LineChart>
    </div>
  );
}
