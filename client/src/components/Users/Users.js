import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

import PersonIcon from "@material-ui/icons/Person";

import "./Users.css";

const StyledMenu = withStyles({
	paper: {
		border: "1px solid #d3d4d5",
	},
})((props) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "center",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "center",
		}}
		{...props}
	/>
));

const useStyles = makeStyles({
	root: {
		background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
		borderRadius: 3,
		border: 0,
		color: "white",
		height: 48,
		padding: "0 30px",
		boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
	},
});

const StyledMenuItem = withStyles((theme) => ({
	root: {
		"&:focus": {
			backgroundColor: "theme.palette.primary.main",
			cursor: "not-allowed",
			"& .MuiListItemIcon-root, & .MuiListItemText-primary": {
				color: theme.palette.common.black,
			},
		},
		"&:hover": {
			cursor: "auto",
		},
	},
}))(MenuItem);

export default function Users({ users }) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const classes = useStyles();

	return (
		<div>
			<Button
				aria-controls="customized-menu"
				aria-haspopup="true"
				variant="contained"
				className="button"
				onClick={handleClick}
			>
				View Users
			</Button>

			<StyledMenu
				id="customized-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{users ? (
					users.map(({ name }) => (
						<StyledMenuItem>
							<ListItemIcon>
								<PersonIcon fontSize="medium" />
							</ListItemIcon>
							<ListItemText primary={name} />
						</StyledMenuItem>
					))
				) : (
					<span style={{ cursor: "not-allowed" }}>
						<StyledMenuItem>
							<ListItemIcon>
								<PersonIcon fontSize="medium" />
							</ListItemIcon>
							<ListItemText primary="No Users" />
						</StyledMenuItem>
					</span>
				)}
			</StyledMenu>
		</div>
	);
}
