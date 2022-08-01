import React from 'react';
import logo from './logo.svg';
import './App.css';
import Cookies from 'universal-cookie';
import UserList from './components/Users.js'
//import MenuList from './components/Menu.js'
import Footer from './components/Footer.js'
import NoticeList from './components/Notices.js'
import ProjectList from './components/Projects.js'
import ProjectForm from './components/ProjectForm.js'
import NoticeForm from './components/NoticeForm.js'
import axios from 'axios'
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/Auth.js'


const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'footer': [],
            'projects': [],
            'notices': [],
            'token': ''

        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, ()=>this.load_data())
    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, ()=>this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username,
        password: password})
        .then(response => {
        this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated())
            {
                headers['Authorization'] = 'Token ' + this.state.token
            }
            return headers
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers})
        .then(response => {
        this.setState({users: response.data})
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo/', {headers})
        .then(response => {
        this.setState({notices: response.data.results})
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/project', {headers})
        .then(response => {
//                console.log(response.data.results.id)
        this.setState({projects: response.data.results})
        }).catch(error => {
        console.log(error)
        this.setState({projects: []})

        })
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/project/${id}`, {headers})
        .then(response => {
        this.setState({projects: this.state.projects.filter((project)=>project.id !==
        id)})
        }).catch(error => console.log(error))
    }

    createProject(users, project_name, project_repo) {
        const headers = this.get_headers()
        const data = {users: [users], project_name: project_name, project_repo: project_repo}
        axios.post(`http://127.0.0.1:8000/api/project/`, data, {headers})
            .then(response => {
            let new_project = response.data
            const users = this.state.users.filter((item) => item.uid === new_project.users)[0]
            new_project.users = users
            this.setState({projects: [...this.state.projects, new_project]})
            }).catch(error => console.log(error))
    }

    deleteNotice(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {headers})
        .then(response => {
        this.setState({notices: this.state.notices.filter((notice)=>notice.id !==
        id)})
        }).catch(error => console.log(error))
    }

    createNotice(creator,project, text) {
        const headers = this.get_headers()
        const data = {project: project, creator: creator, text: text}
        axios.post(`http://127.0.0.1:8000/api/todo/`, data, {headers})
            .then(response => {
            let new_notice = response.data
            const creator = this.state.users.filter((item) => item.uid === new_notice.creator)[0]
            const project = this.state.projects.filter((item) => item.id === new_notice.project)[0]
            new_notice.creator = creator
            new_notice.project = project
            this.setState({notices: [...this.state.notices, new_notice]})
            }).catch(error => console.log(error))
    }
    componentDidMount()  {
        this.get_token_from_storage()

        var now = new Date();

        const footer =
            {
                'contacts': 'Контакты',
                'info': 'полезная информация',
                'communication': 'Оставайтесь на связи',
                'follow': 'Подписаться на новости и рассылки:',
                'privacy': 'Положения &amp; Условия / Конфиденциальность &amp; Cookies',
                'year': now.getFullYear()
            }
        this.setState(
            {
                'footer': footer
            }
        )
    }

    render () {
            return (
                <div className="App">
                    <BrowserRouter>
                        <nav>
                            <ul>
                                <li>
                                    <Link to='/'>Users</Link>
                                </li>

                                <li>
                                    <Link to='/todo'>TODO</Link>
                                </li>

                                <li>
                                    <Link to='/projects'>Projects</Link>
                                </li>

                                <li>
                                    {this.is_authenticated() ? <button onClick={()=>
                                    this.logout()}>Выйти</button> : <Link to='/login'>Войти</Link>}
                                </li>

                            </ul>
                        </nav>
                        <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users} />} />
                        <Route exact path='/todo/' component={() =>
                        <NoticeList notices={this.state.notices} deleteNotice={(id)=>this.deleteNotice(id)}/>} />

                        <Route exact path='/todo/create' component={() => <NoticeForm users={this.state.users}
                        projects={this.state.projects}
                        createNotice={(project, creator, text) =>
                        this.createNotice(project, creator, text)} />} />

                        <Route exact path='/projects/create' component={() => <ProjectForm users={this.state.users}
                        createProject={(users, project_name, project_repo) =>
                        this.createProject(users, project_name, project_repo)} />} />

                        <Route exact path='/projects/' component={() =>
                        <ProjectList projects={this.state.projects} deleteProject={(id)=>this.deleteProject(id)}/>} />

                        <Route exact path='/login' component={() => <LoginForm get_token={(username, password) =>
                                                                        this.get_token(username, password)} />} />
                        <Route component={NotFound404} />
                        <Redirect from='/users' to='/' />
                        </Switch>
                        <h6>
                            <Footer footer={this.state.footer} />
                        </h6>
                    </BrowserRouter>
                </div>

            )
    }
}

export default App;