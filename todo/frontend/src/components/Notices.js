import React from 'react'


const NoticeItem = ({notice}) => {
    return (
        <tr>
            <td>
            {notice.text}
            </td>

            <td>
            {notice.creator.user_name}
            </td>

            <td>
            {notice.created}
            </td>
        </tr>
    )
}

const NoticeList = ({notices}) => {
    return (

            <table>

                <th>
                    Text
                </th>

                <th>
                    Creator
                </th>

                <th>
                    Created
                </th>


            {notices.map((notice) => <NoticeItem notice={notice} />)}
            </table>

    )
}

export default NoticeList