import { useEffect } from 'react';
import { router } from 'expo-router';

export default function Index() {
  useEffect(() => {
    // Wait for router to be ready before navigating
    const checkRouterReady = () => {
      if (router.canGoBack() !== undefined) {
        // Router is ready, safe to navigate
        router.replace('/auth/sign-in');
      } else {
        // Router not ready yet, check again on next tick
        setTimeout(checkRouterReady, 0);
      }
    };

    checkRouterReady();
  }, []);

  return null;
}