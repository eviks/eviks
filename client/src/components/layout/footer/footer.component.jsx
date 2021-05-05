import React from 'react'

import './footer.style.scss'

const Footer = () => {
  return (
    <footer className="footer small mt-4 px-2">
      <div className="divider footer-divider" />
      <div className="footer-content my-1">
        <a href="https://storyset.com/city">Illustration by Freepik Storyset</a>
        <div className="footer-image" />
        <span>&#169; 2021 Eviks</span>
      </div>
    </footer>
  )
}

export default Footer
