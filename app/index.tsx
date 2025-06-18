import { useEffect } from 'react';
import { router } from 'expo-router';

export default function Index() {
  useEffect(() => {
    // Redirect to auth flow immediately
    router.replace('/auth/sign-in');
  }, []);

  return null;
}