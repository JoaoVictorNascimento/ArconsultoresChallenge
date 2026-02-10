import './App.css';
import TransactionForm from './components/TransactionForm';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-4">
        <TransactionForm />
      </div>
    </div>
  );
}

export default App;
