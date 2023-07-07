import DashboardBox from "@/components/DashboardBox";
import { useTheme, Box, Typography } from "@mui/material";

import { useMemo } from 'react';
import BoxHeader from "@/components/BoxHeader";
import { DataGrid, GridCellParams } from '@mui/x-data-grid';



import { useGetKpisQuery, useGetProductsQuery, useGetTransactionQuery } from "@/state/api";
import FlexBetween from "@/components/FlexBetween";
import { Cell, Pie, PieChart } from "recharts";



function Row3() {
	const { palette } = useTheme();
	const pieColors = [palette.primary[800], palette.primary[500]]

	const { data: transactionData } = useGetTransactionQuery();
	const { data: productData } = useGetProductsQuery();
	const { data: kpiData } = useGetKpisQuery();

	console.log("Transaction Data:", transactionData)

	const pieChartData = useMemo(() => {
		if (kpiData) {
			const totalExpenses = kpiData[0].totalExpenses
			return Object.entries(kpiData[0].expensesByCategory).map(
				([key, value]) => {
					return [
						{
							name: key,
							value: value
						},
						{
							name: `${key} of Total`,
							value: totalExpenses - value,
						}
					]
				}
			)
		}
	}, [kpiData])

	const productColumns = [
		{
			field: "_id",
			headerName: "id",
			flex: 1,
		},
		{
			field: "expense",
			headerName: "Expense",
			flex: 0.5,
			renderCell: (params: GridCellParams) => `$${params.value}`
		},
		{
			field: "price",
			headerName: "Price",
			flex: 0.5,
			renderCell: (params: GridCellParams) => `$${params.value}`
		}
	]

	const transactionColumns = [
		{
			field: "_id",
			headerName: "id",
			flex: 1,
		},
		{
			field: "buyer",
			headerName: "Buyer",
			flex: 0.67,
		},
		{
			field: "amount",
			headerName: "Amount",
			flex: 0.5,
			renderCell: (params: GridCellParams) => `$${params.value}`,
		},
		{
			field: "productIds",
			headerName: 'Count',
			flex: 0.1,
			renderCell: (params: GridCellParams) => (params.value as Array<string>).length,
		}
	]

	return (
		<>
			<DashboardBox gridArea="g">
				<BoxHeader title="List of Products" sideText={`${productData?.length} products`} />
				<Box
					mt='0.5rem'
					p="0 0.5rem"
					height="75%"
					sx={{
						"& .MuiDataGrid-root": {
							color: palette.grey[300],
							border: "none"
						},
						"& .MuiDataGrid-cell": {
							borderBottom: `1px solid ${palette.grey[800]} !important`
						},
						"& .MuiDataGrid-columnHeaders": {
							borderBottom: `1px solid ${palette.grey[800]} !important`
						},
						"& .MuiDataGrid-columnSeparator": {
							visibility: 'hidden',
						},

					}}
				>
					<DataGrid
						rows={productData || []}
						columns={productColumns}
						columnHeaderHeight={25}
						rowHeight={35}
						hideFooter={true}

					/>
				</Box>

			</DashboardBox>

			<DashboardBox gridArea="h">
				<BoxHeader title="Recent Orders" sideText={`${transactionData?.length} latest transactions`} />
				<Box
					mt='1rem'
					p="0 0.5rem"
					height="80%"
					sx={{
						"& .MuiDataGrid-root": {
							color: palette.grey[300],
							border: "none"
						},
						"& .MuiDataGrid-cell": {
							borderBottom: `1px solid ${palette.grey[800]} !important`
						},
						"& .MuiDataGrid-columnHeaders": {
							borderBottom: `1px solid ${palette.grey[800]} !important`
						},
						"& .MuiDataGrid-columnSeparator": {
							visibility: 'hidden',
						},

					}}
				>
					<DataGrid
						rows={transactionData || []}
						columns={transactionColumns}
						columnHeaderHeight={25}
						rowHeight={35}
						hideFooter={true}

					/>
				</Box>
			</DashboardBox>
			<DashboardBox gridArea="i">
				<BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
				<FlexBetween mt="-0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
					{pieChartData?.map((data, i) => (
						<Box key={`${data[0].name}-${i}`}>
							<PieChart
								width={110}
								height={100}
							>
								<Pie
									data={data}
									stroke="none"
									innerRadius={18}
									outerRadius={35}
									paddingAngle={2}
									dataKey="value"
								>
									{data.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={pieColors[index]} />
									))}
								</Pie>
							</PieChart>
							<Typography variant='h5' fontSize="10px">{data[0].name.toUpperCase()}</Typography>
						</Box>
					))}

				</FlexBetween>
			</DashboardBox>
			<DashboardBox gridArea="j">
				<BoxHeader title="Overall Summary and Explanation Data" sideText="+15%" />
				<Box height="15px" margin="1.25rem 1rem 0.4rem 1rem"bgcolor={palette.primary[800]} borderRadius="1rem">
					<Box height="15px" bgcolor={palette.primary[600]} width="40%" borderRadius="1rem"></Box>
				</Box>
				<Typography margin='1rem' variant="h6">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias repellendus, cumque nobis doloribus dignissimos, nihil perferendis obcaecati, libero qui omnis provident saepe odit corporis dolorem ab minus earum excepturi illo.
				</Typography>
			</DashboardBox>
		</>
	)
}

export default Row3
