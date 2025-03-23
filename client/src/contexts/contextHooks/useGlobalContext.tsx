import { useContext } from 'react';
import { GlobalContext } from '@/contexts';

// Custom hook to use the context
export default function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
}
