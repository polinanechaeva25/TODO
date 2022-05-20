import React from 'react'

const ProjectItem = ({project}) => {

    return (
        <tr>
            <td>
                {project.project_name}
            </td>

            <td>
                {project.project_repo}
            </td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
            <table>
                <th>
                    Project Name
                </th>

                <th>
                    Repo
                </th>
            {projects.map((project) => <ProjectItem project={project} />)}
            </table>
    )
}

export default ProjectList