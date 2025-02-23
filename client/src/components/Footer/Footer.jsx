import './Footer.css'
const Footer = () => {
    return ( <div className='footer'>
        <div className='parent'>
            <div className='child'>
                <h2>COMPANY NAME</h2>
                <span></span>
            </div>
            <div className='child'>
                <h2>PRODUCTS</h2>
                <span></span>
            </div>
            <div className='child'>
                <h2>USEFUL LINKS</h2>
                <span></span>
            </div>
            <div className='child'>
                <h2>CONTACT US</h2>
                <span></span>
                <a href="https://github.com/ayeshkant-jena/" target="_blank">Github</a>
                <a href="https://www.linkedin.com/in/ayeshkantjena12/" target="_blank">LinkedIn</a>
                <a href="https://www.instagram.com/ayeshkant.j/" target="_blank">Instagram</a>
                <a href=""></a>
            </div>
        </div>
        <div className='copyright'>
            <p>© 2025 Copyright | All Rights Reserved</p>
        </div>
    </div> );
}

export default Footer;