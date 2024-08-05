import app from './app'

async function startServer() {
    const PORT = 3005
    app.listen(PORT,async () => {
        console.log(`the auth.service is running on ${PORT}`)
        
    })
    
}
startServer()