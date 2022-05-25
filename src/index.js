
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { KandyKorner } from "./components/KandyKorner"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <KandyKorner />
    </BrowserRouter>
)

