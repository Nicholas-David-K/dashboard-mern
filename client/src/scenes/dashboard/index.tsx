import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, useTheme } from '@mui/material';
import FlexBetween from '@/components/FlexBetween';
import { useMediaQuery } from '@mui/material';
import Row1 from './Row1';
import Row2 from './Row2';
import Row3 from './Row3';


const Dashboard = () => {
	const isAboveMediumScreen = useMediaQuery("(min-width: 1200px)")

	const gridTemplateLargeScreens = `
		"a b c"
		"a b c"
		"a b c"
		"a b f"
		"d e f"
		"d e f"
		"d h i"
		"g h i"
		"g h j"
		"g h j"
	`
	const gridTemplateSmallScreens = `
		"a"
		"a"
		"a"
		"a"
		"b"
		"b"
		"b"
		"b"
		"c"
		"c"
		"c"
		"d"
		"d"
		"d"
		"e"
		"e"
		"f"
		"f"
		"f"
		"g"
		"g"
		"g"
		"h"
		"h"
		"h"
		"h"
		"i"
		"i"
		"j"
		"j"
	`

	return (
		<Box width="100%" height="100%" display="grid" gap="1.5rem"
			sx={isAboveMediumScreen ? {
				gridTemplateColumns: "repeat(3, minmax(370px, 1fr))", // ? split into three columns
				gridTemplateRows: "repeat(10, minmax(60px, 1fr))", //? Vertically 10 units
				gridTemplateAreas: gridTemplateLargeScreens
			} : {
				gridAutoColumns: "1f",
				gridAutoRows: "60px",
				gridTemplateAreas: gridTemplateSmallScreens
			}}
		>
	
		<Row1 />
		<Row2 />
		<Row3 />
		</Box>
	)
};

export default Dashboard;
