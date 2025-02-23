import './LandingPage.css'
import { Link, useNavigate } from 'react-router-dom';
import image from '../assets/image.jpg'
const LandingPage = () => {

    const navigate = useNavigate();
    
    return (<div>
        <section className="section">
            <div className='herotext'>
                <div className='text'>
                    <h2>Create Your Amazing</h2>
                    <h1>P o r t f o l i o s</h1>
                    <h2>within seconds !</h2>
                    <span style={{height: '2px', width: '500px', color: 'gray'}}></span>
                    <p>Using our custom templates you can create your desired portfolio websites and share it with others</p>
                    <h2>Wanna give a try?</h2>
                    <button onClick={() => navigate('/login')}>Create Portfolio</button>
                </div>
            </div>
            <div className='image-container'>
                <div className='image'>
                    <img src={image} alt="" />
                </div>
            </div>
        </section>
    </div>);
}

export default LandingPage;