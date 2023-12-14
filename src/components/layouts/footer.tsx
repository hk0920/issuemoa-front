import { useEffect, useState } from 'react';
import { home, home_fill, word, word_fill, person, person_fill, more, more_fill } from '../../images';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleMenuClick = (path: string) => {
    setSelected(path);
    navigate(path);
  };

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === '/') {
      setSelected('/');
    } else if (pathname === '/login') {
      setSelected('mypage');
    }
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'rgb(253 250 250)', padding: '8px 0', textAlign: 'center', display: 'flex', justifyContent: 'space-evenly' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          src={selected === '/' ? home_fill : home}
          alt="Home"
          onClick={() => handleMenuClick('/')}
          style={{ cursor: 'pointer', width: '26px' }}
        />
        <span style={{ fontSize: '10px' }}>홈</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          src={selected === 'word' ? word_fill : word}
          alt="Word"
          onClick={() => handleMenuClick('word')}
          style={{ cursor: 'pointer', width: '26px' }}
        />
        <span style={{ fontSize: '10px' }}>E-Word</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          src={selected === 'mypage' ? person_fill : person}
          alt="Person"
          onClick={() => handleMenuClick('mypage')}
          style={{ cursor: 'pointer', width: '26px' }}
        />
        <span style={{ fontSize: '10px' }}>MY</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          src={selected === 'more' ? more_fill : more}
          alt="More"
          onClick={() => handleMenuClick('more')}
          style={{ cursor: 'pointer', width: '26px' }}
        />
        <span style={{ fontSize: '10px' }}>더보기</span>
      </div>
    </div>
  );
};

export default Footer;
