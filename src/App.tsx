import Aside from "./components/aside/Aside";
import Header from "./components/header/Header";
import Calendar from "./modules/calendar/Calendar";
import "./styles/App.scss";

function App() {
    return (
        <div className="wrapper">
            <Aside />

            <div className="app">
                <Header />
                <p className="app__title">Calendar</p>
                <main className="app__main">
                    {/* Calendar or other */}
                    <Calendar />
                </main>
            </div>
        </div>
    );
}

export default App;
