import NavBar from "./src/NavBar"

NavBar.install = function (Vue,opts) {
  Vue.component(NavBar.name,NavBar)
}

export default NavBar
