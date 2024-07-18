import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '../services/authentication';
import { LoaderCircle  } from 'lucide-react';


const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }
        try {
          await getCurrentUser(token);
          setAuthenticated(true);
        } catch (error) {
          router.push('/login');
        } finally {
          setLoading(false);
        }
      };
      checkAuth();
    }, [router]);

    if (loading) {
      return <p>Loading...</p>;
    }

    if (!authenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
