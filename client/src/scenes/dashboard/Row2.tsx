import DashboardBox from "@/components/DashboardBox";
import { useTheme, Box, Typography } from "@mui/material";
import { useMemo } from 'react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, LineChart, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis } from 'recharts';
import BoxHeader from "@/components/BoxHeader";



import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import FlexBetween from "@/components/FlexBetween";


function Row2() {
	const { palette } = useTheme();

	const pieColors = [palette.primary[800], palette.primary[300]]

	const { data: operationalData } = useGetKpisQuery();
	const { data: productsData } = useGetProductsQuery();

	console.log('data: ', productsData)



	const pieData = [
		{ 'name': "Group A", value: 600 },
		{ 'name': "Group B", value: 900 },
	]

	// GET OPERATIONAL VS NON-OPERATIONAL EXPENSES
	const operationalExpenses = useMemo(() => {
		return (
			operationalData &&
			operationalData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => {
				return {
					name: (month.charAt(0).toUpperCase() + month.slice(1)).substring(0, 3),
					"Operational Expenses": operationalExpenses,
					"Non Operational Expenses": nonOperationalExpenses
				}
			})
		)
	}, [operationalData]);



	// GET PRICE VS EXPENSES RATIO
	const pricesExpenses = useMemo(() => {
		return (
			productsData &&
			productsData.map(({ _id, price, expense }) => {
				return {
					name: "Products vs Epenses",
					id: _id,
					price: price,
					expense: expense
				}
			})
		)
	}, [productsData])



	return (
		<>
			<DashboardBox gridArea="d">
				<BoxHeader title="Operational vs Non Operational Expenses" subtitle="Top line represents revenue, bottom line represents" sideText="+4%" />
				<ResponsiveContainer width="100%" height="100%">
					<LineChart
						data={operationalExpenses}
						margin={{
							top: 20,
							right: 0,
							left: 0,
							bottom: 60,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" vertical={false} stroke={palette.grey[800]} />
						<XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
						<YAxis axisLine={false} yAxisId="left" orientation="left" tickLine={false} style={{ fontSize: "10px" }} />
						<YAxis axisLine={false} yAxisId="right" orientation="right" tickLine={false} style={{ fontSize: "10px" }} />
						<Tooltip />
						<Line yAxisId="left" type='monotone' dataKey='Operational Expenses' stroke={palette.primary.main} />
						<Line yAxisId="right" type='monotone' dataKey='Non Operational Expenses' stroke="#8884d8" />
					</LineChart>
				</ResponsiveContainer>
			</DashboardBox>

			<DashboardBox gridArea="e">
				<BoxHeader title="Campaigns and Targets" sideText="+4%" />
				<FlexBetween gap="1.5rem" pr="1rem">
					<PieChart
						width={110}
						height={100}
						margin={{
							top: 0,
							right: -10,
							left: 10,
							bottom: 0,
						}}
					>
						<Pie
							data={pieData}
							stroke="none"
							innerRadius={18}
							outerRadius={38}

							paddingAngle={2}
							dataKey="value"
						>
							{pieData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={pieColors[index]} />
							))}
						</Pie>
					</PieChart>
					<Box ml="-0.7rem" flexBasis="40%" textAlign="center">
						<Typography variant='h5'>Target Sales</Typography>
						<Typography m="0.3rem" variant='h3' color={palette.primary[300]}>83</Typography>
						<Typography variant='h6'>
							Finance goals of the campaign that is desired
						</Typography>
					</Box>
					<Box flexBasis="40%" textAlign="left">
						<Typography variant='h5'>Losses in Revenue</Typography>
						<Typography variant='h6'>Losses are down 25%.</Typography>
						<Typography mt="0.4rem" variant='h5'>Profit Margins</Typography>
						<Typography variant='h6'>Margins are up 35% from last month.</Typography>
					</Box>
				</FlexBetween>
			</DashboardBox>

			<DashboardBox gridArea="f">
				<BoxHeader title="Product Pricesvs Expenses" sideText="+4%" />
				<ResponsiveContainer width="100%" height="100%">
					<ScatterChart
						margin={{
							top: 20,
							right: 25,
							bottom: 40,
							left: -15,
						}}
					>
						<CartesianGrid stroke={palette.grey[800]} />
						<XAxis type="number" dataKey="price" axisLine={false}  name="Price" fontSize="10px" tickFormatter={(v) => `$${v}`}/>
						<YAxis type="number" dataKey="expense" axisLine={false} name="Expense" fontSize="10px" tickFormatter={(v) => `$${v}`} />
						<ZAxis type="number" range={[20]} />
						<Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(v) => `$${v}`}/>
						<Scatter name="product expense ratio" data={pricesExpenses} fill="#8884d8" />
					</ScatterChart>
				</ResponsiveContainer>
			</DashboardBox>
		</>
	)
}

export default Row2
