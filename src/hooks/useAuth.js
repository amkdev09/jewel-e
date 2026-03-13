import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useRef, useEffect } from 'react';
import { clearUser, getUserData } from '../store/slices/userAuthSlice';
import Cookies from 'js-cookie';

/** In-flight promise refs for deduplicating concurrent API calls */
const userDataPromiseRef = { current: null };

export const useAuth = () => {
  const dispatch = useDispatch();
  const isMountedRef = useRef(true);

  const cookieToken = Cookies.get('token');

  const user = JSON.parse(localStorage.getItem('user'));
  const token = cookieToken;

  const clear = useCallback(() => {
    userDataPromiseRef.current = null;
    dispatch(clearUser());
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    localStorage.clear();
  }, [dispatch]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (token && !user) {
      dispatch(getUserData());
    }
  }, [token, user, dispatch]);

  return {
    userData: user,
    token,
    isLoggedIn: Boolean(token),
    clear,
  };
};

export default useAuth;
