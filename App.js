import { useState } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from '@tonconnect/ui-react';
import { WebApp } from '@twa-dev/sdk';

function App() {
  const [amount, setAmount] = useState('');
  const { connected } = useTonConnect();

  const handlePayment = async () => {
    if (!connected) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      // Convert amount to nanotons (1 TON = 1_000_000_000 nanotons)
      const amountInNanotons = parseFloat(amount) * 1_000_000_000;
      
      // Create transaction request
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour from now
        messages: [
          {
            address: 'YOUR_WALLET_ADDRESS_HERE',
            amount: amountInNanotons.toString(),
          },
        ],
      };

      // Send transaction
      // Note: You'll need to implement proper transaction handling
      console.log('Sending transaction:', transaction);
      
      // Close mini app after successful payment
      WebApp.close();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <TonConnectButton />
        
        <div style={{ margin: '20px 0' }}>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount in TON"
            style={{
              padding: '10px',
              marginRight: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}
          />
          
          <button
            onClick={handlePayment}
            disabled={!connected || !amount}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              backgroundColor: connected ? '#0088CC' : '#ccc',
              color: 'white',
              border: 'none',
              cursor: connected ? 'pointer' : 'not-allowed'
            }}
          >
            Pay with TON
          </button>
        </div>
      </header>
    </div>
  );
}

export default App; 