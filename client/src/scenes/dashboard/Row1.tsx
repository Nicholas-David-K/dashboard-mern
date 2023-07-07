import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { useMemo } from 'react';
import { useTheme } from '@mui/material';

import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, LineChart, Legend, Line, BarChart, Bar } from "recharts";
import BoxHeader from "@/components/BoxHeader";



function Row1() {
	const { palette } = useTheme();
	const { data } = useGetKpisQuery();

	// Get Revenue Expenses
	const revenueExpenses = useMemo(() => {
		return (
			data &&
			data[0].monthlyData.map(({ month, revenue, expenses }) => {
				return {
					name: (month.charAt(0).toUpperCase() + month.slice(1)).substring(0, 3),
					revenue: revenue,
					expenses: expenses
				}
			})
		)
	}, [data]);

	// Get Profit Revenues
	const revenueProfit = useMemo(() => {
		return (
			data &&
			data[0].monthlyData.map(({ month, revenue, expenses }) => {
				return {
					name: (month.charAt(0).toUpperCase() + month.slice(1)).substring(0, 3),
					Revenue: revenue,
					Profit: (revenue - expenses).toFixed(2)
				}
			})
		)
	}, [data]);

	// Get Revenue By Month
	const revenueMonth = useMemo(() => {
		return (
			data &&
			data[0].monthlyData.map(({ month, revenue }) => {
				return {
					name: (month.charAt(0).toUpperCase() + month.slice(1)).substring(0, 3),
					revenue: revenue,
				}
			})
		)
	}, [data]);

	return (
		<>
			<DashboardBox gridArea="a">
				<BoxHeader title="Revenue and Expenses" subtitle="Top line represents revenue, bottom line represents" sideText="+4%" />
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart
						width={500}
						height={400}
						data={revenueExpenses}
						margin={{
							top: 0,
							right: 30,
							left: 0,
							bottom: 80,
						}}
					>
						<defs>
							<linearGradient id='colorRevenue' x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
								<stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
							</linearGradient>
							<linearGradient id='colorExpenses' x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
								<stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
							</linearGradient>
						</defs>
						<XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
						<YAxis axisLine={{ strokeWidth: "0" }} domain={[8000, 23000]} tickLine={false} style={{ fontSize: "10px" }} />
						<Tooltip />
						<Area type="monotone" dot={true} dataKey="revenue" fillOpacity={1} stroke={palette.primary.main} fill="url(#colorRevenue)" />
						<Area type="monotone" dot={true} dataKey="expenses" fillOpacity={1} stroke={palette.primary.main} fill="url(#colorExpenses)" />
					</AreaChart>
				</ResponsiveContainer>

			</DashboardBox>
			<DashboardBox gridArea="b">
				<BoxHeader title="Profit & Revenue" subtitle="Top line represents revenue, bottom line represents" sideText="+4%" />
				<ResponsiveContainer width="100%" height="100%">
					<LineChart
						data={revenueProfit}
						margin={{
							top: 20,
							right: 0,
							left: -10,
							bottom: 60,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" vertical={false} stroke={palette.grey[800]} />
						<XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
						<YAxis axisLine={false} yAxisId="left" tickLine={false} style={{ fontSize: "10px" }} />
						<YAxis axisLine={false} yAxisId="right" orientation="right" tickLine={false} style={{ fontSize: "10px" }} />
						<Tooltip />
						<Legend height={20} wrapperStyle={{	margin: "0 0 10px 0" }} />
						<Line yAxisId="left" type='monotone' dataKey='Profit' stroke="#8884d8" />
						<Line yAxisId="right" type='monotone' dataKey='Revenue' stroke={palette.primary.main} />
					</LineChart>
				</ResponsiveContainer>
			</DashboardBox>
			<DashboardBox gridArea="c">
				<BoxHeader title="Revenue Month By Month" subtitle="Graph respresenting revenue month by month" sideText="+4%" />
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						width={500}
						height={400}
						data={revenueMonth}
						margin={{
							top: 17,
							right: 15,
							left: -5,
							bottom: 58,
						}}
					>
						<defs>
							<linearGradient id='colorRevenue' x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.8} />
								<stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} stroke={palette.grey[800]} />
						<XAxis dataKey="name" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
						<YAxis axisLine={false} tickLine={false} style={{ fontSize: "10px" }} />
						<Tooltip cursor={{ stroke: palette.primary.main, strokeWidth: 1, fill: "url(#colorRevenue)" }} />
						<Bar dataKey="revenue" fill="url(#colorRevenue)" />

					</BarChart>
				</ResponsiveContainer>
			</DashboardBox>
		</>
	)
}

export default Row1
