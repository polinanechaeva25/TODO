import React from 'react';
import logo from './logo.svg';
import './App.css';
import Cookies from 'universal-cookie';
import UserList from './components/Users.js'
//import MenuList from './components/Menu.js'
import Footer from './components/Footer.js'
import NoticeList from './components/Notices.js'
import ProjectList from './components/Projects.js'
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
//            'menu': [],
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

    componentDidMount()  {
        this.get_token_from_storage()

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

                                <li>
                                    {this.is_authenticated() ? <button onClick={()=>this.logout()}>Выйти</button> : <Link to='/login'>Войти</Link>}
                                </li>

                            </ul>
                        </nav>
                        <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users} />} />
                        <Route exact path='/todo/' component={() => <NoticeList notices={this.state.notices}/>} />
                        <Route exact path='/projects/' component={() => <ProjectList projects={this.state.projects}/>} />
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