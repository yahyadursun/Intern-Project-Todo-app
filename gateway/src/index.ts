// gateway-service/src/index.ts
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { authMiddleware } from './middlewares/auth.middleware';


const app = express();



app.use('/auth', createProxyMiddleware({ 
  target: "http://localhost:3005"
}));

app.use('/todo', authMiddleware, createProxyMiddleware({ 
  target: 'http://localhost:3010'

}));

app.listen(3000, () => {
  console.log('Gateway service is running on port 3000');
});