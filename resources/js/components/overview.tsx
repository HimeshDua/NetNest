// @/components/overview.tsx
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface ChartData {
    name: string;
    total: number;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg border bg-background p-3 shadow-sm">
                <p className="font-medium">{label}</p>
                <p className="text-sm text-green-600">Revenue: {payload[0].value.toLocaleString()} PKR</p>
            </div>
        );
    }
    return null;
};

export function Overview({ data }: { data: ChartData[] }) {
    return (
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-green-500" />
            </BarChart>
        </ResponsiveContainer>
    );
}
