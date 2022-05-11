import React from 'react'


const Footer = ({footer}) => {
    return (
    <div>

        <div>
            <div>
                <h3>{footer.contacts}</h3>
            </div>

            <div>
                <h3>{footer.info}</h3>
            </div>

            <div>
                <h3>{footer.communication}</h3>
                <p>{footer.follow}</p>
                <form>
                    <input type="email" name="email" placeholder="Ваш e-mail:"></input>
                    <a href="#"><i></i></a>
                </form>
            </div>
        </div>

        <p>&copy; GB {footer.year} </p>

        <p>{footer.privacy}</p>
    </div>
    )
}

export default Footer