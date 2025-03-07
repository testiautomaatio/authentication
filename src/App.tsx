import { HashRouter, Routes, Route } from "react-router";
import SignIn from './SignIn'
import SignUp from './SignUp'

function App() {

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />
            </Routes>
        </HashRouter>
    )
}

export default App
