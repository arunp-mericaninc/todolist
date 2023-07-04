// hoc/withAuth.js
import { UserContext } from '@/Context/UserContext';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

export default function withAuth(Component) {
  return function ProtectedRoute({ ...props }) {
    const router = useRouter();
    const {User}= useContext(UserContext)
    const userIsAuthenticated = User !== null;

    useEffect(() => {
      if (!userIsAuthenticated) {
        router.push('/');
      }
    }, [userIsAuthenticated, router]);

    return <Component {...props} />;
  };
}
