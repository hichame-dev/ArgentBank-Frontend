import React from 'react'
import { Link } from 'react-router-dom'


const NotFound = () => {
    // console.log('[NotFound.jsx] Page introuvable chargée')

    return (
        <div className="notfound">
            <h1>404 - Page non trouvée</h1>
            <p>Oups ! La page que vous cherchez n'existe pas.</p>
            <Link to="/">Retour à l’accueil</Link>
        </div>
    )
}

export default NotFound
