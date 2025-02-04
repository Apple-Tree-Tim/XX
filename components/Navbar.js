// components/Navbar.js
import React, { useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 320,
    bgcolor: '#181818',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '6px',
  };

  // Exemplo de CTA
  const CTAButton = (
    <a
      href="#pricing"
      className="btn"
      style={{
        backgroundColor: '#ff005a',
        color: '#fff',
        marginLeft: '1rem',
        fontWeight: '600',
      }}
    >
      Buy Access
    </a>
  );

  // Função que recarrega a página
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        {/* LOGO QUE RECARREGA A PÁGINA AO CLICAR */}
        <div className="logo" onClick={reloadPage}>
          <h1 className="logo-reload">
            Only<span>Hub</span>
          </h1>
        </div>

        <ul>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#previews">Previews</a></li>
        </ul>

        {/* Botão de CTA do Navbar */}
        {CTAButton}

        {/* Ícone do menu mobile */}
        <IoMenu onClick={handleOpen} className="btn-menu-bar" />

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h1 className="title-menu-bar">Menu</h1>
            <a className="options-menu-bar" href="#pricing" onClick={handleClose}>Pricing</a>
            <a className="options-menu-bar" href="#reviews" onClick={handleClose}>Reviews</a>
            <a className="options-menu-bar" href="#features" onClick={handleClose}>Features</a>
            <a className="options-menu-bar" href="#previews" onClick={handleClose}>Previews</a>
            {/* Caso queira incluir CTA no menu mobile também */}
            <a
              className="options-menu-bar"
              href="#pricing"
              style={{ borderColor: '#00b27f', marginTop: '1rem' }}
              onClick={handleClose}
            >
              Buy Access
            </a>
          </Box>
        </Modal>
      </div>
    </nav>
  );
}
