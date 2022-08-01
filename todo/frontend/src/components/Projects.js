import React from 'react'
import {Link} from 'react-router-dom'

const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>

            <td>
                {project.project_name}
            </td>

            <td>
                {project.project_repo}
            </td>
            <td><button onClick={()=>deleteProject(project.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (
            <div>
            <table>

                <th>
                    Project Name
                </th>

                <th>
                    Repo
                </th>
                <th></th>
            {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
            </table>
            <Link to='/projects/create'>Create</Link>
            </div>
    )
}

export default ProjectList