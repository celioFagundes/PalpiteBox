import React from 'react'
import styles from './styles.module.css'
const Footer = () => {
    return (
        <div className= {styles.wrapper}>
            <div className = {styles.box}>
                <span>Desenvolvido por Célio Fagundes:</span>{' '}
                <a href = 'https://www.linkedin.com/in/celiopieczarka/'>Linkedin</a>{' '}
                <a href = 'https://github.com/celioFagundes'>Github</a>{' '}
                <div className = {styles.box_images}>
                    <img className = {styles.image} src ='/logo_semana_fsm.png' alt ='logo-fm'/>
                    <img className = {styles.image} src ='/logo_devpleno.png' alt ='logo-devpleno'/>
                </div>
            </div>
        </div>
    )
}

export default Footer
