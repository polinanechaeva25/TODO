import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {users: props.users[0]?.uid, project_name: '', project_repo: ''}
    }

    handleChange(event)
    {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createProject(this.state.users, this.state.project_name, this.state.project_repo)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="login">users</label>
                    <select name="users" className='form-control' onChange={(event)=>this.handleChange(event)}>
                    {this.props.users.map((item)=><option value={item.uid}>{item.first_name}</option>)}
                    </select>

                </div>

                <div className="form-group">
                    <label for="name">project_name</label>
                    <input type="text" className="form-control" name="project_name" value={this.state.project_name}
                    onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label for="url">project_repo</label>
                    <input type="text" className="form-control" name="project_repo" value={this.state.project_repo}
                    onChange={(event)=>this.handleChange(event)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}
export default ProjectForm