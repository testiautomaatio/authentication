import { BrowserRouter, Routes, Route } from "react-router";
import SignIn from './SignIn'
import SignUp from './SignUp'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
