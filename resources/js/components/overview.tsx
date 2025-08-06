// @/components/overview.tsx
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

// Define the interface for the chart data for better type safety
interface ChartData {
    name: string;
    total: number;
}

// Update the component to accept a 'data' prop of type ChartData[]
export function Overview({ data }: { data: ChartData[] }) {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
            </BarChart>
        </ResponsiveContainer>
    );
}
