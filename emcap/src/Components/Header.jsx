import React from 'react'

export default function Header() {
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-dark container">
                <div className="container-fluid">
                    {/* logo goes here if required */}
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link" aria-current="page" href="manager" style={{color: 'white'}}>Home</a>
                            <a className="nav-link" href="employee" style={{color: 'white'}}>Profile</a>
                            <a className="nav-link" href="login" style={{color: 'white', marginLeft: 910}}>Sign Out</a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
