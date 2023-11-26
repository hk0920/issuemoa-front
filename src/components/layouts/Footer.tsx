import { useEffect, useState } from 'react';
import { home, home_fill, word, word_fill, person, person_fill, more, more_fill } from '../../images';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleItemClick = (handler: string) => {
    setSelected(handler);
    let url = '/';
    if (handler === 'MyPage') {
      url = '/login';
    }

    navigate(url);
  };

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === '/') {
      setSelected('Home');
    }
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'rgb(253 250 250)', padding: '8px 0', textAlign: 'center', display: 'flex', justifyContent: 'space-evenly' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          src={selected === 'Home' ? home_fill : home}
          alt="Home"
          onClick={() => handleItemClick('Home')}
          style={{ cursor: 'pointer', width: '26px' }}
        />
        <span style={{ fontSize: '10px' }}>Home</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          src={selected === 'Word' ? word_fill : word}
          alt="Word"
          onClick={() => handleItemClick('Word')}
          style={{ cursor: 'pointer', width: '26px' }}
        />
        <span style={{ fontSize: '10px' }}>Word</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          src={selected === 'MyPage' ? person_fill : person}
          alt="Person"
          onClick={() => handleItemClick('MyPage')}
          style={{ cursor: 'pointer', width: '26px' }}
        />
        <span style={{ fontSize: '10px' }}>MyPage</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          src={selected === 'More' ? more_fill : more}
          alt="More"
          onClick={() => handleItemClick('More')}
          style={{ cursor: 'pointer', width: '26px' }}
        />
        <span style={{ fontSize: '10px' }}>More</span>
      </div>
    </div>
  );
};

export default Footer;
