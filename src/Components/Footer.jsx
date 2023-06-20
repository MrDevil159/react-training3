import React from 'react';

const Footer = () => {
    const today = new Date();
    return (
        <footer class="text-center text-white mt-4" style={{ backgroundColor: 'rgb(248, 249, 255)' }}>
        <div class="text-center text-dark p-3" style={{ backgroundColor: 'rgb(248, 249, 250)' }}>
          © 2023 Copyright :
          <a class="text-dark" target='_blank' href="https://www.linkedin.com/in/mehfoozmaaz">Mehfooz Ahmed</a>
        </div>
      </footer>
    )
}

export default Footer
