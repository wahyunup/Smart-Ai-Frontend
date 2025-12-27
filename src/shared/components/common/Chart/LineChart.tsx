import { LineChart } from "@mui/x-charts/LineChart";
import type { BasicAreaProps } from "../../../types/type";

export default function BasicArea({ heading, datas, days, color }: BasicAreaProps) {
  const gradientId = color ?`gradient-${color.replace("#", "")}` : ""

  return (
    <div className="p-5 bg-white rounded-3xl shadow-[0_10px_20px_rgba(0,0,0,0.10)] w-full">
      <h2 className="2xl:text-xl md:text-lg font-semibold mb-2">{heading}</h2>

      <LineChart
        height={380}
        xAxis={[
          {
            data: days,
            scaleType: "band",
            tickLabelStyle: { fontSize: 14 },
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
          "& .MuiLineElement-root": {
            strokeWidth: 3,
          },
          "& .MuiAreaElement-root": {
            fill: `url(#${gradientId})`,
            fillOpacity: 0.25,
          },
          "& .MuiMarkElement-root": {
            stroke: color,
            fill: color,
            r: 5,
          },
        }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.5} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
      </LineChart>
    </div>
  );
}
