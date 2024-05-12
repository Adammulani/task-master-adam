import {auth} from 'express-oauth2-jwt-bearer'

const jwtCheck=auth({
    audience: "http://localhost:3001/task",
    issuerBaseURL: "https://dev-4kbys46e12vbytul.us.auth0.com/",
    tokenSigningAlg: "RS256"
})

export default jwtCheck;