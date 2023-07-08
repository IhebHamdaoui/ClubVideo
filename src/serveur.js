import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import passport from 'passport'





const app = express()

app.use(helmet())
app.use(compression())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(redirectToHttps)

const certificatOptions = {
    key: fs.readFileSync(path.resolve('./certificats/localhost.key')),
    cert: fs.readFileSync(path.resolve('./certificats/localhost.crt')),
}
