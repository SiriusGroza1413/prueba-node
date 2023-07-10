import app from './app'
import connectToMongoDB from './database'

const startServer = async () => {
    await connectToMongoDB();
  
    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });
  };
  
  startServer();
