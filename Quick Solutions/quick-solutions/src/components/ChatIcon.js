import { useEffect } from 'react';

function TawkToScript() {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/6665549b9a809f19fb3bb452/1hvtt5020';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.getElementsByTagName('script')[0].parentNode.insertBefore(script, document.getElementsByTagName('script')[0]);
  }, []);

  return null;
}

export default TawkToScript;