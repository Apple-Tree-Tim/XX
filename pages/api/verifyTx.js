// pages/api/verifyTx.js

export default async function handler(req, res) {
  const { txId, coin } = req.body;

  const baseUrl = 'https://api.blockcypher.com/v1';
  let url;

  switch (coin) {
    case 'btc':
      url = `${baseUrl}/btc/main/txs/${txId}`;
      break;
    case 'ltc':
      url = `${baseUrl}/ltc/main/txs/${txId}`;
      break;
    case 'eth':
      url = `${baseUrl}/eth/main/txs/${txId}`;
      break;
    case 'sol':
      url = `https://api.mainnet-beta.solana.com`;
      break;
    default:
      return res.status(400).json({ error: 'Unsupported coin' });
  }

  try {
    if (coin === 'sol') {
      // Solana
      const solanaResponse = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getTransaction',
          params: [txId, { encoding: 'json' }]
        })
      });

      const solanaData = await solanaResponse.json();
      if (solanaResponse.ok && solanaData.result) {
        if (solanaData.result.meta.err === null) {
          return res.status(200).json(solanaData);
        } else {
          return res.status(404).json({
            error: 'Transaction failed or not confirmed yet.'
          });
        }
      } else {
        return res.status(404).json({
          error: 'Transaction not found or not confirmed yet.'
        });
      }
    } else {
      // BTC, LTC, ETH
      const response = await fetch(url);
      if (!response.ok) {
        return res
          .status(404)
          .json({ error: 'Transaction not found or not confirmed' });
      }
      const data = await response.json();
      return res.status(200).json(data);
    }
  } catch (error) {
    console.error('Error verifying transaction:', error);
    return res.status(500).json({ error: 'Error fetching transaction' });
  }
}
