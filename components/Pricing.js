import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import Image from "next/image";
import { FaBitcoin, FaCopy } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";

export default function Pricing() {
  const tiers = [
    {
      name: "basic",
      price: 25,
      description:
        "Start with 100GB storage, custom requests, and daily updates. Perfect for newcomers.",
      features: [
        { name: "Instant Access", included: true },
        { name: "One-Time Payment", included: true },
        { name: "100+ Daily Updates", included: true },
        { name: "Custom Model Requests", included: false },
        { name: "Exclusive Content Packs", included: false },
        { name: "GROUP VIP Access", included: false },
      ],
      popular: false,
    },
    {
      name: "standard",
      price: 50,
      description:
        "Enjoy 500GB storage, custom requests, and exclusive packs. Ideal balance of features.",
      features: [
        { name: "Instant Access", included: true },
        { name: "One-Time Payment", included: true },
        { name: "250+ Daily Updates", included: true },
        { name: "Custom Model Requests", included: true },
        { name: "Exclusive Content Packs", included: true },
        { name: "GROUP VIP Access", included: false },
      ],
      popular: true,
    },
    {
      name: "premium",
      price: 75,
      description:
        "Get 4TB storage, priority support, and special perks. Built for dedicated fans.",
      features: [
        { name: "Instant Access", included: true },
        { name: "One-Time Payment", included: true },
        { name: "350+ Daily Updates", included: true },
        { name: "Priority Custom Requests", included: true },
        { name: "Exclusive Content Packs", included: true },
        { name: "GROUP VIP Access", included: true },
        { name: "Early Access to Exclusive Content", included: false },
      ],
      popular: false,
    },
    {
      name: "VIP",
      price: 100,
      description:
        "Go all-in with 15TB storage, VIP support, and early access. No limits.",
      features: [
        { name: "Instant Access", included: true },
        { name: "One-Time Payment", included: true },
        { name: "500+ Daily Updates", included: true },
        { name: "VIP Support & Requests", included: true },
        { name: "Exclusive Content Packs", included: true },
        { name: "Totally different from premiumn one", included: true },
        { name: "Early Access to Exclusive Content", included: true },
      ],
      popular: false,
    },
  ];

  // Stripe links mapeados pelo nome do plano
  const stripeLinks = {
    Basic: "https://buy.stripe.com/cN27wbac18ZF0a4aEX",
    Standard: "https://buy.stripe.com/dR617Nbg5ejZcWQfZg",
    Premium: "https://buy.stripe.com/28o4jZ2Jz8ZFg92cN6",
    VIP: "https://donate.stripe.com/9AQcQvbg53Fl5uo7su",
  };

  // Endereços de Crypto
  const cryptoAddresses = {
    btc: "bc1qcrf44erv6ukh0ceyl96us0y2amyh4kq4sre7v8",
    ltc: "LVVtkiCEJzzfzEMDn4tJengeYeNdkUfNzA",
    eth: "0x681F1331627449bF43933647033b53c11305778d",
    sol: "8tu1v7H6ztKQzmfuQ19cuqaZU2xkXAukqUN3k3Jy6L8i",
  };

  /**
   * Steps do pagamento:
   * 1 => Escolher método de pagamento
   * 2 => PayPal/Card => mostra link + "I have paid"; ou Crypto => escolher moeda
   * 3 => Mostra endereço Crypto => "I have paid" => step=7 (pedir TXID)
   * 4 => Pedir email
   * 5 => Mensagem final
   * 6 => Gift card code
   * 7 => TXID
   */
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [step, setStep] = useState(1);

  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedCoin, setSelectedCoin] = useState("");
  const [cryptoRates, setCryptoRates] = useState(null);

  const [isPaymentDone, setIsPaymentDone] = useState(false);

  // Gift card code & error
  const [giftCardCode, setGiftCardCode] = useState("");
  const [giftCardError, setGiftCardError] = useState("");

  // TXID
  const [txId, setTxId] = useState("");
  const [txIdError, setTxIdError] = useState("");

  // Email
  const [email, setEmail] = useState("");
  const [finalMessage, setFinalMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  // Rate limit para gift card
  const RATE_LIMIT_MS = 60000; // 60s

  // Estados de "copiado" (address e amount)
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);

  // Snackbar para exibir avisos/erros
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  // Busca as cotações de criptomoedas
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,litecoin,ethereum,solana&vs_currencies=usd"
        );
        const data = await res.json();
        setCryptoRates(data);
      } catch (error) {
        console.error("Error fetching crypto rates:", error);
      }
    };
    fetchRates();
  }, []);

  // Abre o modal e reseta estados
  const handleBuyClick = (tier) => {
    setSelectedPlan(tier);
    setOpen(true);

    setStep(1);
    setSelectedMethod("");
    setSelectedCoin("");
    setIsPaymentDone(false);
    setGiftCardCode("");
    setGiftCardError("");
    setTxId("");
    setTxIdError("");
    setEmail("");
    setEmailError("");
    setFinalMessage("");
    setCopiedAddress(false);
    setCopiedAmount(false);
  };

  // Fecha o modal e reseta tudo
  const handleClose = () => {
    setOpen(false);

    setSelectedPlan(null);
    setStep(1);
    setSelectedMethod("");
    setSelectedCoin("");
    setIsPaymentDone(false);
    setGiftCardCode("");
    setGiftCardError("");
    setTxId("");
    setTxIdError("");
    setEmail("");
    setEmailError("");
    setFinalMessage("");
    setCopiedAddress(false);
    setCopiedAmount(false);
  };

  // Step 1 => Escolher método
  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
    setStep(2);
  };

  // Step 2 => se crypto => escolhe a moeda
  const handleSelectCoin = (coin) => {
    setSelectedCoin(coin);
    setStep(3);
    setIsPaymentDone(false);
  };

  // Copiar endereço
  const handleCopyAddress = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAddress(true);
      setIsPaymentDone(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  // Copiar valor (amount)
  const handleCopyAmount = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAmount(true);
      setTimeout(() => setCopiedAmount(false), 2000);
    } catch (err) {
      console.error("Failed to copy amount:", err);
    }
  };

  // "Não tenho crypto" => step=6 => gift card
  const handleOpenGiftCardStep = () => {
    window.open("http://cryptovoucher.io/", "_blank");
    setStep(6);
    setIsPaymentDone(false);
    setGiftCardError("");
    setGiftCardCode("");
  };

  // Confirma gift card
  const handleConfirmGiftCardCode = async () => {
    if (!giftCardCode.trim()) {
      setGiftCardError("Please enter your gift card code");
      return;
    }

    // Verifica o tempo da última requisição
    const lastRequestTime = localStorage.getItem("lastGiftCardRequestTime");
    const currentTime = Date.now();

    if (lastRequestTime && currentTime - lastRequestTime < RATE_LIMIT_MS) {
      const remainingTime = Math.ceil(
        (RATE_LIMIT_MS - (currentTime - lastRequestTime)) / 1000
      );
      setGiftCardError(
        `Please wait ${remainingTime} seconds before sending another code.`
      );
      return;
    }

    try {
      const response = await fetch("/api/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          giftCardCode,
          planName: selectedPlan?.name,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Armazena o horário da última requisição bem-sucedida
        localStorage.setItem("lastGiftCardRequestTime", currentTime.toString());

        // Webhook enviado com sucesso
        setGiftCardError("");
        setIsPaymentDone(true);
        setStep(4); // Avança para a próxima etapa
      } else {
        setGiftCardError(data.message || "Failed to send gift card code");
      }
    } catch (err) {
      console.error("Error sending gift card code to API:", err);
      setGiftCardError("Error sending gift card code. Try again later.");
    }
  };

  // "I have paid"
  const handlePaid = () => {
    if (!isPaymentDone) {
      setSnackbarMsg("Please complete your payment first!");
      setSnackbarOpen(true);
      return;
    }
    if (selectedMethod === "crypto") {
      // Próximo => step=7 => pede TXID
      setStep(7);
    } else {
      // PayPal/Card => passo 4 => perguntar email
      setStep(4);
    }
  };

  const handleVerifyTxId = async () => {
    if (!txId) {
      setTxIdError("Please enter your transaction ID");
      return;
    }

    try {
      const response = await fetch("/api/verifyTx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          txId,
          coin: selectedCoin,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setTxIdError(
          data.error || "Could not fetch transaction. Check TXID or try again."
        );
        return;
      }

      if (selectedCoin === "sol") {
        if (data.result && data.result.meta && data.result.meta.err === null) {
          setTxIdError("");
          setStep(4);
        } else {
          setTxIdError("Transaction failed or not confirmed yet.");
        }
      } else {
        // Simplificamos: somente usamos found para checar a transação
        const found = data.outputs.some((output) =>
          output.addresses.includes(cryptoAddresses[selectedCoin])
        );

        if (!found) {
          setTxIdError(
            "Transaction does not send to our address or is not confirmed yet."
          );
          return;
        }

        setTxIdError("");
        setStep(4);
      }
    } catch (err) {
      console.error("Error verifying TXID:", err);
      setTxIdError("Error verifying TXID. Please try again later.");
    }
  };

  // Retorna valor em crypto
  const getCryptoPrice = () => {
    if (!cryptoRates || !selectedCoin || !selectedPlan) return null;

    const coinGeckoId = {
      btc: "bitcoin",
      ltc: "litecoin",
      eth: "ethereum",
      sol: "solana",
    }[selectedCoin];

    const priceUsd = cryptoRates[coinGeckoId]?.usd || 0;
    if (priceUsd === 0) return null;

    return selectedPlan.price / priceUsd;
  };

  // Step 4 => pegar email
  const handleConfirmEmail = () => {
    setEmailError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address!");
      return;
    }

    setFinalMessage("You will receive access within 10 minutes!");
    setStep(5);
  };

  // Estilo do modal
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: "550px", md: "700px" },
    background: `
        radial-gradient(circle at top left, rgba(255, 0, 150, 0.4), transparent 100%),
        
        #181818
    `,
    boxShadow: 24,
    p: 3,
    borderRadius: "20px",
  };

  return (
    <section id="pricing" className="pricing-section">
      <div className="container">
        <h2 className="pricing-title">Choose Your Plan</h2>
        <p className="pricing-subtitle">
          Find the perfect package for your needs. Each tier offers unique perks
          — from custom requests to massive storage and VIP access. Ready to
          level up?
        </p>

        <div className="pricing-container">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`pricing-card ${tier.popular ? "popular" : ""}`}
            >
              <div className="plan-name">
                <span>{tier.name}</span>
                {tier.popular && (
                  <span className="plan-badge">Most Popular</span>
                )}
              </div>

              <p className="plan-description">{tier.description}</p>

              <div className="plan-price">
                ${tier.price}
                <span> USD</span>
              </div>

              <ul>
                {tier.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className={
                      feature.included ? "feature-included" : "feature-excluded"
                    }
                  >
                    {feature.name}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="pricing-btn"
                onClick={() => handleBuyClick(tier)}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Pagamento */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="payment-method-modal"
        aria-describedby="choose-payment-method"
      >
        <Box sx={modalStyle}>
          {/* Título */}
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            style={{ textAlign: "center" }}
          >
            {selectedPlan
              ? `Payment for ${selectedPlan.name} plan`
              : "Choose a Plan"}
          </Typography>

          {selectedPlan && (
            <Typography
              sx={{
                mb: 2,
                color: "red",
                textAlign: "center",
              }}
            >
              <strong>Price:</strong> ${selectedPlan.price} USD
            </Typography>
          )}

          {/* STEP 1 => escolher método */}
          {step === 1 && (
            <>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Select a payment method:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "center",
                  gap: "1rem",
                  mb: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSelectMethod("paypal")}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    width: "220px",
                    backgroundColor: "white", // Set background to white
                    "&:hover": { backgroundColor: "#b0b0b0" }, // Optional: light gray on hover
                  }}
                >
                  <img
                    src="/paypal.svg"
                    alt="PayPal"
                    width="120"
                    height="auto"
                  />
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleSelectMethod("crypto")}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.2rem",
                    width: "220px",
                  }}
                >
                  <img
                    src="/bitcoin.png"
                    alt="PayPal"
                    width="50"
                    height="auto"
                  />
                  Crypto or Gift Card
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#4caf50",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    width: "220px",
                    padding: "1px 4px",
                    "&:hover": { backgroundColor: "#3d9900" },
                  }}
                  onClick={() => handleSelectMethod("card")}
                >
                  <img
                    src="/credit.png"
                    alt="PayPal"
                    width="70"
                    height="auto"
                  />
                  Credit Card
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Button
                  variant="text"
                  sx={{
                    backgroundColor: "var(--primary-color)", // Use your primary color
                    color: "#fff",
                    fontWeight: 700,
                    borderRadius: "6px",
                    padding: "0.75rem 1.5rem",
                    width: "210px", // Keeping full width
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    transition: "background-color 0.3s, transform 0.2s",
                    "&:hover": {
                      backgroundColor: "darkred", // Example hover effect
                      transform: "scale(1.05)", // Slight hover effect
                    },
                  }}
                  fullWidth
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Box>
            </>
          )}

          {/* STEP 2 => PayPal / Card / Crypto */}
          {step === 2 && selectedMethod === "paypal" && (
            <>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Pay via PayPal, then come back and click &quot;I have
                paid&quot;.
              </Typography>
              <Typography variant="body2" sx={{ color: "#f76363", mb: 2 }}>
                **Pay with PayPal and choose &quot;Friends and Family&quot; or
                your money will be refunded and you won&apos;t receive your
                content.**
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Image
                  src="/paypal.jpg"
                  alt="PayPal"
                  width={400}
                  height={300}
                  style={{
                    display: "block",
                    margin: "0 auto",
                    marginBottom: "1rem",
                    width: "100%",
                    maxWidth: "400px",
                    height: "auto",
                  }}
                />
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 2 }}
                onClick={() => {
                  window.open("https://paypal.me/nazmussakib97", "_blank");
                  setIsPaymentDone(true);
                }}
              >
                Pay with PayPal
              </Button>

              <Button
                variant="contained"
                color="success"
                disabled={!isPaymentDone}
                fullWidth
                onClick={handlePaid}
              >
                I have paid
              </Button>

              <Button
                variant="text"
                sx={{ mt: 2, color: "#bbb" }}
                fullWidth
                onClick={handleClose}
              >
                Cancel
              </Button>
            </>
          )}

          {step === 2 && selectedMethod === "card" && (
            <>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Pay with Stripe using your credit card, then click &quot;I have
                paid&quot;.
              </Typography>

              <Button
                variant="contained"
                sx={{ backgroundColor: "#4caf50", mb: 2 }}
                fullWidth
                onClick={() => {
                  const link = stripeLinks[selectedPlan.name] || "#";
                  window.open(link, "_blank");
                  setIsPaymentDone(true);
                }}
              >
                Pay with Card
              </Button>

              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={handlePaid}
                disabled={!isPaymentDone}
              >
                I have paid
              </Button>

              <Button
                variant="text"
                sx={{ mt: 2, color: "#bbb" }}
                fullWidth
                onClick={handleClose}
              >
                Cancel
              </Button>
            </>
          )}

          {step === 2 && selectedMethod === "crypto" && (
            <>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Choose your cryptocurrency or buy a gift card:
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  flexWrap: "wrap",
                  gap: "1rem",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    width: { xs: "100%", sm: "auto" },
                  }}
                  onClick={() => handleSelectCoin("btc")}
                >
                  <FaBitcoin />
                  Bitcoin
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#ff9800",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    width: { xs: "100%", sm: "auto" },
                  }}
                  onClick={() => handleSelectCoin("eth")}
                >
                  <GiTwoCoins />
                  Ethereum
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#cfcfcf",
                    color: "#000",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    width: { xs: "100%", sm: "auto" },
                  }}
                  onClick={() => handleSelectCoin("ltc")}
                >
                  <GiTwoCoins />
                  Litecoin
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#9c27b0",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    width: { xs: "100%", sm: "auto" },
                  }}
                  onClick={() => handleSelectCoin("sol")}
                >
                  <GiTwoCoins />
                  Solana
                </Button>
              </Box>

              <Button
                variant="outlined"
                fullWidth
                onClick={handleOpenGiftCardStep}
                sx={{ mb: 2, color: "#fff", borderColor: "#ccc" }}
              >
                I don&apos;t have crypto, buy gift card
              </Button>

              <Button
                variant="text"
                sx={{ color: "#bbb" }}
                fullWidth
                onClick={handleClose}
              >
                Cancel
              </Button>
            </>
          )}

          {/* STEP 3 => mostrar endereço => "I have paid" => step=7 */}
          {step === 3 && selectedMethod === "crypto" && selectedCoin && (
            <>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Send the payment to the address below. Then click &quot;I have
                paid&quot; once done.
              </Typography>

              <Box
                sx={{
                  backgroundColor: "#2a2a2a",
                  padding: "1rem",
                  borderRadius: "6px",
                  mb: 2,
                  wordWrap: "break-word",
                }}
              >
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Address:</strong> {cryptoAddresses[selectedCoin]}
                </Typography>

                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() =>
                    handleCopyAddress(cryptoAddresses[selectedCoin])
                  }
                  size="small"
                  sx={{ mb: 1 }}
                >
                  <FaCopy style={{ marginRight: 5 }} />
                  {copiedAddress ? "Copied!" : "Copy Address"}
                </Button>
              </Box>

              {(() => {
                const cryptoValue = getCryptoPrice();
                if (!cryptoValue) {
                  return (
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      (Unable to fetch current price. Please check manually.)
                    </Typography>
                  );
                }
                const formatted = cryptoValue.toFixed(6);
                return (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Approx. {formatted} {selectedCoin.toUpperCase()} for $
                      {selectedPlan.price} USD
                    </Typography>
                    <Button
                      variant="outlined"
                      color="inherit"
                      onClick={() =>
                        handleCopyAmount(
                          `${formatted} ${selectedCoin.toUpperCase()}`
                        )
                      }
                      size="small"
                    >
                      <FaCopy style={{ marginRight: 5 }} />
                      {copiedAmount ? "Copied!" : "Copy Amount"}
                    </Button>
                  </Box>
                );
              })()}

              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ mb: 2 }}
                onClick={handlePaid}
                disabled={!isPaymentDone}
              >
                I have paid
              </Button>

              <Button
                variant="text"
                sx={{ color: "#bbb" }}
                fullWidth
                onClick={handleClose}
              >
                Cancel
              </Button>
            </>
          )}

          {/* STEP 6 => gift card code */}
          {step === 6 && (
            <>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Please enter the gift card code you purchased:
              </Typography>

              <TextField
                label="Gift Card Code"
                variant="filled"
                fullWidth
                sx={{ mb: 2, backgroundColor: "#2a2a2a" }}
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#ccc" } }}
                value={giftCardCode}
                onChange={(e) => setGiftCardCode(e.target.value)}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleConfirmGiftCardCode}
              >
                Confirm Gift Card
              </Button>

              {giftCardError && (
                <Typography variant="body2" sx={{ color: "red", mt: 1 }}>
                  {giftCardError}
                </Typography>
              )}

              <Button
                variant="text"
                sx={{ mt: 2, color: "#bbb" }}
                fullWidth
                onClick={handleClose}
              >
                Cancel
              </Button>
            </>
          )}

          {/* STEP 7 => verificar TXID (crypto) */}
          {step === 7 && selectedMethod === "crypto" && (
            <>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Please enter your transaction ID (TXID) so we can confirm your
                payment:
              </Typography>

              <TextField
                label="Transaction ID (TXID)"
                variant="filled"
                fullWidth
                sx={{ mb: 2, backgroundColor: "#2a2a2a" }}
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#ccc" } }}
                value={txId}
                onChange={(e) => setTxId(e.target.value)}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleVerifyTxId}
              >
                Verify TXID
              </Button>

              {txIdError && (
                <Typography variant="body2" sx={{ color: "red", mt: 1 }}>
                  {txIdError}
                </Typography>
              )}

              <Button
                variant="text"
                sx={{ mt: 2, color: "#bbb" }}
                fullWidth
                onClick={handleClose}
              >
                Cancel
              </Button>
            </>
          )}

          {/* STEP 4 => perguntar email */}
          {step === 4 && (
            <>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Enter your email so we can send your access:
              </Typography>

              <TextField
                label="Email"
                variant="filled"
                fullWidth
                sx={{ mb: 2, backgroundColor: "#2a2a2a" }}
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#ccc" } }}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleConfirmEmail}
              >
                Confirm
              </Button>

              {emailError && (
                <Typography variant="body2" sx={{ mt: 1, color: "red" }}>
                  {emailError}
                </Typography>
              )}

              <Button
                variant="text"
                sx={{ mt: 2, color: "#bbb" }}
                fullWidth
                onClick={handleClose}
              >
                Cancel
              </Button>
            </>
          )}

          {/* STEP 5 => mensagem final */}
          {step === 5 && (
            <>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {finalMessage || "Thank you!"}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleClose}
              >
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>

      {/* Snackbar para certos erros ("Please complete your payment first!") */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        ContentProps={{ sx: { marginTop: "120px" } }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </section>
  );
}
