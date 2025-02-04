export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { giftCardCode, planName } = req.body;

    // Valide os dados recebidos (se necessário)
    if (!giftCardCode || !planName) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    try {
      // Realiza a requisição para o webhook do Discord
      const discordWebhookUrl = '';

      const response = await fetch(discordWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `Gift card code received: ${giftCardCode}\nPlan: ${planName}`
        })
      });

      if (response.ok) {
        return res.status(200).json({ message: 'Webhook sent successfully' });
      } else {
        return res.status(500).json({ message: 'Failed to send webhook' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error sending webhook', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
