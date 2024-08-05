declare module 'react-dom/client' {
    import { ReactNode } from 'react';
    import { Container } from 'react-dom';
  
    interface Root {
      render(children: ReactNode): void;
      unmount(): void;
    }
  
    interface CreateRoot {
      (container: Container | null): Root;
    }
  
    export const createRoot: CreateRoot;
  }
  