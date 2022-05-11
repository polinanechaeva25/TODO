import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/Users.js'
import MenuList from './components/Menu.js'
import Footer from './components/Footer.js'
import axios from 'axios'


class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'menu': [],
            'footer': []
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

        var now = new Date();

        const menu = [
                {
                    'name': 'Главная'
                },
                {
                    'name': 'Профиль'
                },
                {
                    'name': 'Инфо'
                }
            ]
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
            'menu': menu,
            'footer': footer
        }
    )
    }

    render () {
            return (
                <div>

                    <div>
                        <MenuList menu={this.state.menu} />
                    </div>

                    <UserList users={this.state.users} />

                    <h6>
                        <Footer footer={this.state.footer} />
                    </h6>
                </div>
            )
    }
}

export default App;