import React from 'react'

class NoticeForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {creator:  props.users[0]?.uid, project: '', text: ''}
    }

    handleChange(event)
    {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
        console.log(this.state)
    }

    handleSubmit(event) {
        console.log(this.state.creator)
        this.props.createNotice(this.state.creator, this.state.project, this.state.text)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="creator">creator</label>
                    <select name="creator" className='form-control' onChange={(event)=>this.handleChange(event)}>
                    {this.props.users.map((item)=><option value={item.uid}>{item.first_name}</option>)}
                    </select>

                </div>

                <div className="form-group">
                    <label for="name">project</label>
                    <select name="project" className='form-control' onChange={(event)=>this.handleChange(event)}>
                    {this.props.projects.map((item)=><option value={item.id}>{item.project_name}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label for="notice">text</label>
                    <input type="text" className="form-control" name="text" value={this.state.text} onChange={(event)=>this.handleChange(event)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}
export default NoticeForm