
const NavBar = ({ navItems, selected, setSelected }) => {
	return (
		<nav className="stretched-row pad-1">
			{
				navItems.map(({ id, name, image }) => (
					<div key={id} className="clickable relative" onClick={() => setSelected(id)}>
						<img src={image} alt={name} style={{ height: 100, borderRadius: "1em", border: selected === id && "5px solid red", }} />
						<h5 style={{ ...navTextStyle, fontWeight: selected === id ? 900 : 600 }}>{name}</h5>
					</div>
				))
			}
		</nav>
	)
}

const navTextStyle = {
	position: "absolute", width: "80%", left: "10%", top: "5%", height: "40%", borderRadius: "1em", border: "2px solid red",
	display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white", opacity: "0.85"
}

export default NavBar
