"use client";

type ChartPoint = {
  label: string;
  value: number;
};

type DashboardChartsProps = {
  categoryData: ChartPoint[];
  orderStatusData: ChartPoint[];
  stockData: ChartPoint[];
  userRoles: ChartPoint[];
};

function BarChartCard({
  title,
  subtitle,
  data,
}: {
  title: string;
  subtitle: string;
  data: ChartPoint[];
}) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/80">
        {subtitle}
      </p>
      <h3 className="mt-1 text-2xl font-bold text-white">{title}</h3>

      <div className="mt-6 space-y-4">
        {data.map((item) => {
          const width = `${(item.value / maxValue) * 100}%`;

          return (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="truncate text-white/75">{item.label}</span>
                <span className="font-semibold text-white">{item.value}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,rgba(16,185,129,0.9),rgba(110,231,183,0.9))]"
                  style={{ width }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DonutChartCard({
  title,
  subtitle,
  data,
}: {
  title: string;
  subtitle: string;
  data: ChartPoint[];
}) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  let runningOffset = 0;

  const segments = data.map((item, index) => {
    const percentage = total > 0 ? item.value / total : 0;
    const dash = circumference * percentage;
    const offset = circumference - runningOffset;
    runningOffset += dash;

    const colors = ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0"];

    return {
      ...item,
      dash,
      offset,
      color: colors[index % colors.length],
    };
  });

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/80">
        {subtitle}
      </p>
      <h3 className="mt-1 text-2xl font-bold text-white">{title}</h3>

      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="relative mx-auto h-48 w-48">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="fill-none stroke-white/10"
              strokeWidth="16"
            />
            {segments.map((segment) => (
              <circle
                key={segment.label}
                cx="60"
                cy="60"
                r={radius}
                className="fill-none"
                stroke={segment.color}
                strokeWidth="16"
                strokeDasharray={`${segment.dash} ${circumference - segment.dash}`}
                strokeDashoffset={segment.offset}
                strokeLinecap="round"
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">
              Total
            </span>
            <span className="mt-1 text-3xl font-black text-white">{total}</span>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          {segments.map((segment) => (
            <div
              key={segment.label}
              className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-sm font-medium text-white/75">
                  {segment.label}
                </span>
              </div>
              <span className="text-sm font-semibold text-white">
                {segment.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DashboardCharts({
  categoryData,
  orderStatusData,
  stockData,
  userRoles,
}: DashboardChartsProps) {
  return (
    <section className="grid gap-6 xl:grid-cols-2">
      <BarChartCard
        subtitle="Products by category"
        title="Category distribution"
        data={
          categoryData.length > 0
            ? categoryData
            : [{ label: "No data", value: 0 }]
        }
      />
      <DonutChartCard
        subtitle="Orders by status"
        title="Order status overview"
        data={
          orderStatusData.length > 0
            ? orderStatusData
            : [{ label: "No data", value: 0 }]
        }
      />
      <BarChartCard
        subtitle="Stock health"
        title="Inventory coverage"
        data={
          stockData.length > 0 ? stockData : [{ label: "No data", value: 0 }]
        }
      />
      <DonutChartCard
        subtitle="Users by role"
        title="User roles"
        data={
          userRoles.length > 0 ? userRoles : [{ label: "No data", value: 0 }]
        }
      />
    </section>
  );
}
