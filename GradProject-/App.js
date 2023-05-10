import MainPage from "./screens/MainPage";
import AuthContextProvider from './store/auth-context';
import Test from "./Test";

export default function App() {
  return (
    <AuthContextProvider>
      <MainPage />
    </AuthContextProvider>
    // <Test />
  );
}

