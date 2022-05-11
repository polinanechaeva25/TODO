import React from 'react'


const UserItem = ({user}) => {
    return (
        <tr>
            <td>
            {user.user_name}
            </td>

            <td>
            {user.first_name}
            </td>

            <td>
            {user.last_name}
            </td>

            <td>
            {user.birthday_year}
            </td>

            <td>
            {user.email}
            </td>

        </tr>
    )
}

const UserList = ({users}) => {
    return (

            <table>

                <th>
                    User Name
                </th>

                <th>
                    First name
                </th>

                <th>
                    Last Name
                </th>

                <th>
                    Birthday year
                </th>

                <th>
                    Email
                </th>

            {users.map((user) => <UserItem user={user} />)}
            </table>

    )
}

export default UserList