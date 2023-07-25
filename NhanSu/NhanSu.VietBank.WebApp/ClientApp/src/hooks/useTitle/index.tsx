import {useEffect, useRef, useState} from 'react';

export default function useTitle(title: string) {
  const prevTitle = useRef(document.title);
  const [isON, setON] = useState(false);
  const [content, setContent] = useState('');
  const onNoti = (content: string) => {
    setON(true);
    setContent(content);
  };
  const offNoti = () => {
    document.title = prevTitle.current;
    setON(false);
  };
  useEffect(() => {
    if (isON) {
      const intervalTitle = setInterval(() => (document.title = `${title} từ ${content}`), 1000);
      const intervalPrevTitle = setInterval(() => (document.title = prevTitle.current), 2000);

      return () => {
        clearInterval(intervalTitle);
        clearInterval(intervalPrevTitle);
      };
    }
  });

  return [onNoti, offNoti];
}
