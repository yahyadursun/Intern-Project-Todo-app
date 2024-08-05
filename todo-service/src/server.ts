import app from './app'

async function startServer() {
    const PORT = 3010
    app.listen(PORT,async () => {
        console.log(`the todo.Service is running on ${PORT}`)
        
    })
    
}
startServer()