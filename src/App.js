import Router from "./route/Index";
//check
import ThemeProvider from "./layout/provider/Theme";

const App = () => {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
};
export default App;