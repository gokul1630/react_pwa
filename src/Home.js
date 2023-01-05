import React, {useEffect, useState} from 'react';
import {Button} from 'react-bootstrap';

var deferredPrompt;
export default function Home() {
  const [showInstallMessage, setShowInstallMessage] = useState(false);

  useEffect(() => {
    // var temp = navigator.userAgent.match(/chrome|chromium|crios|safari|iphone|ipad|ipod/i);
    // if (temp === undefined) {
    //   setCheckBrowser(false);
    // } else if (temp[0] === "Chrome" || temp[0] === "Safari") {
    //   setCheckBrowser(true);
    // }
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();

      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      // setInstallable(true);
    });

    window.addEventListener("appinstalled", () => {
      // Log install to analytics
      //     console.log("INSTALL: Success");
    });

    // Detects if device is on iOS
    const isIos = () => {
      // const userAgent = window.navigator.userAgent.toLowerCase();
      // return /iphone|ipad|ipod/.test( userAgent );
      return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ].includes(navigator.platform)
      // iPad on iOS 13 detection
      || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
    }
    // Detects if device is in standalone mode
    const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

    // Checks if should display install popup notification:
    if (isIos() && !isInStandaloneMode()) {
      setShowInstallMessage({ showInstallMessage: true });
    }
  }, []);

  const handleInstallClick1 = (e) => {
    // Hide the app provided install promotion
    // setInstallable(false);
    if (deferredPrompt !== undefined) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
    } else {
      deferredPrompt = null;
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      {/* <div className="prompt">
        <p>Do you want to add this site to your home screen?</p>
        <button type="button" className="prompt__install">Yes Please</button>
        <button type="button" className="prompt__close">No Thanks</button>
      </div> */}
      <Button variant="dark" onClick={handleInstallClick1}>Install</Button>

    </div>
  )
}