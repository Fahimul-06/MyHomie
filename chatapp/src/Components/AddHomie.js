import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import './AddHomie.css'

function AddHomie({addchattoggler,addchattoggle}) {

    const [homieusername, setHomieUsername] = useState()
    const { user } = useContext(AuthContext)

    const API_URL = process.env.REACT_APP_API_URL

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.get(`${API_URL}api/users/?username=${homieusername}`)
            setHomieUsername("")
            const data = {
                senderId: user._id,
                receiverId: response.data._id
            }
            await axios.post(API_URL+'api/chatrooms', data)
        }
        catch (err) {
        }
        window.location.reload();
    }

    return (
        <div className='add-homie-background'>
            <div className={addchattoggle?"add-homie-open":"add-homie-close"}>
                <div className="close-div" ><span onClick={addchattoggler}><p className="close-symbol">x</p></span></div>
                <form>
                    <img className='add-homie-img' src='assets/addhomie.png' alt=''></img>
                    <input type="text" placeholder="Enter Username of Homie" value={homieusername} onChange={(e) => { setHomieUsername(e.target.value) }} required />
                    <button onClick={handleSubmit}>ADD Homie</button>
                </form>
            </div>
        </div>
    )
}

export default AddHomie
