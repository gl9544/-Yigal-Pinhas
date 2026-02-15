import { useEffect, useRef} from 'react';
import VanillaTilt from 'vanilla-tilt';

const options = {
    scale: 1,
    speed: 80,
    max: 5,
    easing: "cubic-bezier(.03,.98,.52,.99)",
};

const Tilt = (props) => {
    const {...rest } = props;
    const tilt = useRef(null);
    
    useEffect(() => {
      VanillaTilt.init(tilt.current, options);
    }, []);
  
    return <div ref={tilt} {...rest} />;
  }

export default Tilt