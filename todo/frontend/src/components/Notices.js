import React from 'react'
import {Link} from 'react-router-dom'


const NoticeItem = ({notice, deleteNotice}) => {
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

            <td><button onClick={()=>deleteNotice(notice.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const NoticeList = ({notices, deleteNotice}) => {
    return (
            <div>
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


            {notices.map((notice) => <NoticeItem notice={notice} deleteNotice={deleteNotice} />)}
            </table>
                    <Link to='/todo/create'>Create</Link>
            </div>

    )
}

export default NoticeList