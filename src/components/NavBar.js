import { Image, Nav } from 'react-bootstrap'

const NavBar = ({ navItems }) => {
	return (
		<Nav className="nav-bar">
			{
				navItems.map(({ id, name, image }) => (
					<Nav.Item key={id} className="clickable relative">
						<Image src={image} alt={name} height={120} rounded />
						<h6 style={navItemStyle}>{name}</h6>
					</Nav.Item>
				))
			}
		</Nav>
	)
}

const navItemStyle = {
	position: "absolute", width: "80%", left: "10%", top: "30%", height: "40%", borderRadius: "1em", border: "2px solid red",
	display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white", opacity: "0.85"
}

export default NavBar
