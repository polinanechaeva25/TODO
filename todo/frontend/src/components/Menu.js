import React from 'react'


const MenuItems = ({menu_el}) => {
    return (
            <li>
                {menu_el.name}
            </li>
    )
}

const MenuList = ({menu}) => {
    return(
        <ul>
            {menu.map((menu_el) => <MenuItems menu_el={menu_el} />)}
        </ul>
    )
}

export default MenuList
