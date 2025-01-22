import ReactDOM from "react-dom"
import { ThemeProvider } from "@mui/material/styles"
import { theme } from "../common/dashboardTheme"

import Host from "./LowerThirds/Host"
import React from "react"

function LowerThirds() {
    return (
        <ThemeProvider theme={theme}>
            <div>
                <Host />
            </div>
        </ThemeProvider>
    )
}

ReactDOM.render(<LowerThirds />, document.getElementById("root"))
