import { createContext, useEffect, useReducer, useCallback } from 'react';
// utils
//
import { jwtDecode, setSession } from './utils';
import { ActionMapType, AuthStateType, AuthUserType, JWTContextType } from './types';
import { api } from 'src/utils/axios';
import { useRefreshToken } from '../hooks/database/useRefreshToken';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const refresh = useRefreshToken();
  const initialize = useCallback(async () => {
    try {
      const data = await refresh();
      const { accessToken } = data;
      setSession(accessToken);
      const user: AuthUserType = jwtDecode(accessToken);

      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: true,
          user,
        },
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    const { accessToken } = response.data;
    const user: AuthUserType = jwtDecode(accessToken);
    setSession(accessToken);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user,
      },
    });
  };

  // REGISTER

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await api.post('/auth/register', {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    localStorage.setItem('accessToken', accessToken);

    dispatch({
      type: Types.REGISTER,
      payload: {
        user,
      },
    });
  };

  // LOGOUT
  const logout = async () => {
    await api.get('/auth/logout');
    setSession(null);
    dispatch({ type: Types.LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
