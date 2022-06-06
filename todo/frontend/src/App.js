import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/Users.js'
//import MenuList from './components/Menu.js'
import Footer from './components/Footer.js'
import NoticeList from './components/Notices.js'
import ProjectList from './components/Projects.js'
import axios from 'axios'
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'

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
//            'menu': [],
            'footer': [],
            'projects': [],
            'notices': []

        }
    }

    componentDidMount()  {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users
                    }
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo')
            .then(response => {
                const notices = response.data.results
                this.setState(
                    {
                        'notices': notices
                    }
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/project')
            .then(response => {
//                console.log(response.data.results.id)
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
            )
        }).catch(error => console.log(error))

        var now = new Date();

//        const menu = [
//                {
//                    'name': 'Главная'
//                },
//                {
//                    'name': 'Профиль'
//                },
//                {
//                    'name': 'Инфо'
//                }
//            ]
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
//            'menu': menu,
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
                            </ul>
                        </nav>
                        <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users} />} />
                        <Route exact path='/todo/' component={() => <NoticeList notices={this.state.notices}/>} />
                        <Route exact path='/projects/' component={() => <ProjectList projects={this.state.projects}/>} />
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