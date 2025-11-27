import AppRouter from "./router/AppRouter";
import { Toaster } from "sonner";
function App() {

  return <>
    <Toaster
      position="top-right"
      richColors
      duration={2000}
      toastOptions={{
        style: {
          padding: '15px 25px',
          fontSize: '1rem',
        },
      }}
    />
    <AppRouter />
  </>
}

export default App;
