import MainPage from "./screens/MainPage";
import AuthContextProvider from './store/auth-context';

export default function App() {
  return (
    <AuthContextProvider>
      <MainPage />
    </AuthContextProvider>
    
  );
}

