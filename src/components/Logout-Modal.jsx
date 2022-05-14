import React from 'react'
import { useAuth } from '../context'
import "../css/logout-modal.css"

function LogoutModal({setLogoutModal}) {

  const {logOutHandler} = useAuth();

  return (
    <div className="d-modal">
        <div className="modal-content">
          <h2>Are you sure you want to logout?</h2>
          <button className='btn btn-primary btn-logout' onClick={() => {
            logOutHandler();
            setLogoutModal(false);
            }}>Yes</button>
          <button className='btn btn-primary btn-logout' onClick={()=>setLogoutModal(false)}>No</button>
        </div>
    </div>
  )
}

export {LogoutModal}