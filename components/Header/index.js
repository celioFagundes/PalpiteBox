import React from 'react';
import styles from './styles.module.css';
import Link from 'next/link';

const Header = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.imgBox}>
          <Link href='/'>
            <a>
              <img className='mx-auto' src='/logo_palpitebox.png' alt='logo' />
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.links_container}>
        <Link href='/sobre'>
          <a className={styles.link}>Sobre</a>
        </Link>
        <Link href='/contato'>
          <a className={styles.link}>Contato</a>
        </Link>
      </div>
    </>
  );
};

export default Header;
