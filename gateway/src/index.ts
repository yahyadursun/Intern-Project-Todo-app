// gateway-service/src/index.ts
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { authMiddleware } from './middlewares/auth.middleware';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', createProxyMiddleware({ 
  target: 'http://localhost:3005', 
  changeOrigin: true 
}));

app.use('/todo', authMiddleware, createProxyMiddleware({ 
  target: 'http://localhost:3010', 
  changeOrigin: true 
}));

app.listen(3000, () => {
  console.log('Gateway service is running on port 3000');
});