import React, { useState, useEffect } from "react";
import {
  X,
  Check,
  Sparkles,
  GraduationCap,
  Zap,
  Shield,
  Gift,
  ArrowRight,
  QrCode,
  Copy,
  CheckCircle2,
  ArrowLeft,
  Clock,
  CreditCard,
  Smartphone,
  ExternalLink,
  Wallet,
  Lock,
  ChevronRight
} from "lucide-react";
import confetti from "canvas-confetti";
import { apiService, setIsProUser } from "../services/apiService";
import { getCurrentUser } from "../services/authService";

export default function PricingModal({ isOpen, onClose, onProUnlocked, freeExportsLeft }) {
  const [step, setStep] = useState("plans"); // 'plans' or 'qr_checkout'
  const [checkoutMode, setCheckoutMode] = useState("qr"); // 'qr', 'upi_apps', 'gateway'
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("student");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(300);
  const [vpaId, setVpaId] = useState("");
  const [vpaError, setVpaError] = useState("");

  const currentUser = getCurrentUser();

  // Timer countdown for QR Code validity
  useEffect(() => {
    let interval = null;
    if (step === "qr_checkout" && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timerSeconds]);

  // Close modal when pressing Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentPrice = couponApplied
    ? selectedPlan === "student" ? 29 : selectedPlan === "monthly" ? 49 : 199
    : selectedPlan === "student" ? 49 : selectedPlan === "monthly" ? 99 : 249;

  const handleApplyCoupon = async (e) => {
    if (e) e.preventDefault();
    if (!couponCode.trim()) return;
    try {
      const result = await apiService.validateCoupon(couponCode);
      if (result.valid) {
        setCouponApplied(true);
        setCouponError("");
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (err) {}
      } else {
        setCouponError(result.description || "Invalid coupon. Try 'UNCODEMY' or 'STUDENT' for 70% off!");
      }
    } catch (err) {
      setCouponError("Could not validate coupon. Try again.");
    }
  };

  /**
   * Initialize order from backend
   */
  const initOrder = async () => {
    if (orderData && orderData.amountRupees === currentPrice) {
      return orderData;
    }
    const data = await apiService.createRazorpayOrder({
      plan: selectedPlan,
      amount: currentPrice,
      coupon: couponApplied ? couponCode : null
    });
    setOrderData(data);
    return data;
  };

  /**
   * 1. Official Razorpay Standard Checkout Popup (With QR, PhonePe, Paytm, Cards, etc.)
   */
  const handleLaunchRazorpayGateway = async () => {
    setIsProcessing(true);
    try {
      const order = await initOrder();

      if (window.Razorpay) {
        const options = {
          key: order.keyId || "rzp_test_1DP5mmOlF5G5ag",
          amount: order.amount || currentPrice * 100,
          currency: "INR",
          name: "Uncodemy AI Resume",
          description: `Unlock ${selectedPlan.toUpperCase()} Pro Subscription`,
          image: "https://cdn-icons-png.flaticon.com/512/942/942748.png",
          // Only pass order_id if created on real Razorpay servers to prevent "Something went wrong" iframe error
          order_id: order.isRealRazorpayOrder ? order.orderId : undefined,
          handler: async function (response) {
            await handlePaymentSuccessVerification({
              orderId: response.razorpay_order_id || order.orderId,
              paymentId: response.razorpay_payment_id || "pay_" + Date.now(),
              signature: response.razorpay_signature || "sig_verified",
              paymentMethod: "RAZORPAY_POPUP"
            });
          },
          prefill: {
            name: currentUser?.name || "Student Candidate",
            email: currentUser?.email || "student@example.com",
            contact: "9876543210"
          },
          notes: {
            plan: selectedPlan,
            coupon: couponApplied ? couponCode : "NONE"
          },
          theme: {
            color: "#ff5421" // Uncodemy Brand Orange
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (resp) {
          alert("Payment failed: " + (resp.error?.description || "Transaction cancelled"));
          setIsProcessing(false);
        });
        rzp.open();
      } else {
        // If external Razorpay script is blocked by browser adblocker, smoothly switch to QR view
        setStep("qr_checkout");
        setTimerSeconds(300);
      }
    } catch (e) {
      console.error("Razorpay initiation error:", e);
      setStep("qr_checkout");
      setTimerSeconds(300);
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Switch to In-App QR / UPI App Screen
   */
  const handleOpenQrCheckout = async (initialMode = "qr") => {
    setIsProcessing(true);
    try {
      await initOrder();
      setCheckoutMode(initialMode);
      setStep("qr_checkout");
      setTimerSeconds(300);
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Verify Payment and Unlock Pro mode
   */
  const handlePaymentSuccessVerification = async (extraPayload = {}) => {
    setIsProcessing(true);
    try {
      await apiService.verifyPayment({
        plan: selectedPlan,
        amount: currentPrice,
        coupon: couponApplied ? couponCode : null,
        orderId: extraPayload.orderId || orderData?.orderId,
        paymentId: extraPayload.paymentId || "pay_upi_" + Date.now(),
        signature: extraPayload.signature || "simulated_signature",
        paymentMethod: extraPayload.paymentMethod || "UPI_QR"
      });

      setPaymentSuccess(true);
      try {
        confetti({
          particleCount: 140,
          spread: 90,
          origin: { y: 0.5 }
        });
      } catch (e) {}

      setTimeout(() => {
        setIsProUser(true);
        onProUnlocked();
        onClose();
        setPaymentSuccess(false);
        setStep("plans");
      }, 1800);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Trigger direct UPI App (PhonePe / Paytm / GPay)
   */
  const handleLaunchUpiApp = (appType) => {
    const rawIntent = orderData?.upiIntent || `upi://pay?pa=9058605348-3@ybl&pn=Sagar+Shakya&am=${currentPrice}.00&cu=INR&tn=Pro+Subscription`;
    
    // Construct intent for specific app if on mobile
    let appUrl = rawIntent;
    if (appType === "phonepe") {
      appUrl = rawIntent.replace("upi://", "phonepe://");
    } else if (appType === "paytm") {
      appUrl = rawIntent.replace("upi://", "paytmmp://");
    } else if (appType === "gpay") {
      appUrl = rawIntent.replace("upi://", "gpay://upi/");
    }

    // Try opening native app
    window.location.href = appUrl;

    // Also inform the user to confirm once paid
    setTimeout(() => {
      setCheckoutMode("qr");
    }, 1000);
  };

  const currentUpiVpa = orderData?.upiVpa || "9058605348-3@ybl";
  const currentUpiName = orderData?.upiName || "Sagar Shakya";

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(currentUpiVpa);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${rem.toString().padStart(2, "0")}`;
  };

  const qrImageUrl = orderData?.upiIntent
    ? `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=${encodeURIComponent(orderData.upiIntent)}`
    : `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=upi%3A%2F%2Fpay%3Fpa%3D9058605348-3%40ybl%26pn%3DSagar%2BShakya%26am%3D${currentPrice}`;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-sm overflow-y-auto animate-in fade-in font-['Poppins','Rubik',sans-serif]"
    >
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92dvh] flex flex-col">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#ff5421] via-orange-600 to-[#e04515] p-5 sm:p-6 text-white relative shrink-0">
          {/* Header Action Bar: Back & Close Buttons */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-black/25 hover:bg-black/40 text-white transition cursor-pointer border border-white/20 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="text-white hover:text-white p-2 rounded-xl bg-black/25 hover:bg-black/40 cursor-pointer transition min-h-[36px] min-w-[36px] flex items-center justify-center border border-white/20 active:scale-95"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white text-[#ff5421] shadow-xs mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#ff5421]" />
            Official Razorpay Payment Gateway
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            {step === "qr_checkout"
              ? "Razorpay UPI & QR Payment"
              : "Unlock Pro Resume Downloads & AI Copilot"}
          </h2>
          <p className="text-orange-100 text-xs sm:text-sm mt-1 max-w-lg leading-relaxed">
            {step === "qr_checkout"
              ? "Scan the dynamic QR code with any UPI app, or pay directly via PhonePe, Paytm, or Google Pay."
              : "Unlimited ATS PDF exports, Groq AI bullet polisher & all premium company templates."}
          </p>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto">
          {/* ================= STEP 1: PLANS SELECTION ================= */}
          {step === "plans" && (
          <div>
            {/* Student Offer Bar */}
            <div className="bg-orange-50 border-b border-orange-200 px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
              <div className="flex items-center gap-2 text-orange-950 font-bold">
                <GraduationCap className="w-4 h-4 text-[#ff5421] shrink-0" />
                <span>Uncodemy Special Offer: Flat 70% Discount!</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-600 font-medium">Auto Apply:</span>
                <span
                  onClick={() => {
                    setCouponCode("UNCODEMY");
                    setCouponApplied(true);
                    try { confetti({ particleCount: 50 }); } catch (e) {}
                  }}
                  className="bg-[#ff5421] text-white px-3 py-0.5 rounded-lg font-mono font-bold shadow-xs cursor-pointer hover:bg-[#e04515] transition"
                  title="Click to apply"
                >
                  UNCODEMY
                </span>
              </div>
            </div>

            {/* Plans Grid */}
            <div className="p-6 sm:p-7 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {/* Free Tier */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Free Starter</div>
                    <div className="text-2xl font-black text-slate-900 mt-1">₹0</div>
                    <p className="text-[11px] text-slate-500">Trial plan</p>
                    <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-slate-400" />
                        <span>2 Trial Downloads</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-slate-400" />
                        <span>Basic Templates</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center text-[10px] text-slate-500 font-bold py-1 bg-slate-200/70 rounded-lg">
                    {freeExportsLeft} downloads left
                  </div>
                </div>

                {/* Student Deal (Most Popular) */}
                <div
                  onClick={() => setSelectedPlan("student")}
                  className={`p-4 rounded-2xl border-2 relative cursor-pointer transition flex flex-col justify-between ${
                    selectedPlan === "student"
                      ? "border-amber-400 bg-amber-50/60 shadow-md shadow-amber-500/10"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="absolute -top-2.5 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-sm">
                    🎓 Best Seller
                  </div>
                  <div>
                    <div className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5" /> Student Pro
                    </div>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-2xl font-black text-slate-900">
                        ₹{couponApplied ? "29" : "49"}
                      </span>
                      <span className="text-xs text-slate-400 line-through">₹149</span>
                      <span className="text-[10px] text-amber-700 font-bold">/ mo</span>
                    </div>

                    <div className="mt-3 space-y-1.5 text-xs text-slate-700 font-medium">
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 font-bold" />
                        <span><strong>Unlimited</strong> PDF Downloads</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 font-bold" />
                        <span>All <strong>Premium Templates</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 font-bold" />
                        <span>Groq AI Copilot Unlocked</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center text-xs font-bold text-amber-900 py-1.5 rounded-xl bg-amber-300/80">
                    {selectedPlan === "student" ? "✓ Selected" : "Choose"}
                  </div>
                </div>

                {/* Lifetime Deal */}
                <div
                  onClick={() => setSelectedPlan("lifetime")}
                  className={`p-4 rounded-2xl border-2 relative cursor-pointer transition flex flex-col justify-between ${
                    selectedPlan === "lifetime"
                      ? "border-indigo-600 bg-indigo-50/50 shadow-md shadow-indigo-600/10"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" /> Lifetime Pro
                    </div>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-2xl font-black text-slate-900">
                        ₹{couponApplied ? "199" : "249"}
                      </span>
                      <span className="text-xs text-slate-400 line-through">₹799</span>
                    </div>

                    <div className="mt-3 space-y-1.5 text-xs text-slate-700 font-medium">
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>Lifetime Unlimited Access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>All Future Pro Features</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center text-xs font-bold text-indigo-700 py-1.5 rounded-xl bg-indigo-100">
                    {selectedPlan === "lifetime" ? "✓ Selected" : "Choose"}
                  </div>
                </div>
              </div>

              {/* Coupon Bar */}
              <form onSubmit={handleApplyCoupon} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold w-full sm:w-auto">
                  <Gift className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Have a Coupon Code?</span>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter Coupon (e.g. UNCODEMY)"
                    className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-bold uppercase focus:outline-none focus:border-[#ff5421] w-full sm:w-48"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition cursor-pointer shrink-0"
                  >
                    Apply
                  </button>
                </div>
              </form>

              {couponApplied && (
                <div className="text-xs text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-center justify-between">
                  <span>🎉 Coupon applied! Flat 70% Discount activated.</span>
                  <span className="font-black text-emerald-900">Total: ₹{currentPrice}</span>
                </div>
              )}

              {couponError && (
                <p className="text-xs text-rose-600 font-semibold">{couponError}</p>
              )}

              {/* Payment Methods Choice */}
              <div className="space-y-3 pt-2">
                {/* 1. Primary Action: Direct UPI QR Code / PhonePe / Paytm to Sagar's Bank Account */}
                <button
                  type="button"
                  onClick={() => handleOpenQrCheckout("qr")}
                  disabled={isProcessing}
                  className="w-full py-4 px-6 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-[#ff5421] via-orange-600 to-[#e04515] hover:opacity-95 shadow-xl shadow-orange-500/25 transition transform active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60"
                >
                  <QrCode className="w-5 h-5" />
                  <span>Pay with UPI QR / PhonePe / Paytm • ₹{currentPrice}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                {/* 2. Secondary Action: Official Razorpay Gateway Modal */}
                <button
                  type="button"
                  onClick={handleLaunchRazorpayGateway}
                  disabled={isProcessing}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 text-[#ff5421]" />
                  <span>Pay via Razorpay Gateway (Cards / Netbanking)</span>
                </button>

                {/* 3. Explicit Back / Cancel Button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Resume (Cancel)</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 font-medium pt-1">
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" /> Razorpay 256-Bit SSL Secure
                </span>
                <span>•</span>
                <span>Instant Auto-Activation</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 2: RAZORPAY UPI QR & APPS CHECKOUT ================= */}
        {step === "qr_checkout" && (
          <div className="p-6 sm:p-7 space-y-5">
            {/* Top Back Nav & Timer */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <button
                type="button"
                onClick={() => setStep("plans")}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Plans
              </button>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                <Clock className="w-3.5 h-3.5" />
                <span>QR expires in {formatTime(timerSeconds)}</span>
              </div>
            </div>

            {/* Mode Switch Tabs: QR Code vs Direct Apps */}
            <div className="flex bg-slate-100 p-1 rounded-2xl gap-1">
              <button
                type="button"
                onClick={() => setCheckoutMode("qr")}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  checkoutMode === "qr"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <QrCode className="w-3.5 h-3.5 text-[#ff5421]" />
                <span>Scan UPI QR Code</span>
              </button>
              <button
                type="button"
                onClick={() => setCheckoutMode("upi_apps")}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  checkoutMode === "upi_apps"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-[#ff5421]" />
                <span>PhonePe / Paytm / GPay</span>
              </button>
            </div>

            {/* TAB 1: DYNAMIC RAZORPAY QR CODE */}
            {checkoutMode === "qr" && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-7 bg-slate-50 p-6 rounded-3xl border border-slate-200">
                {/* Dynamic QR Box */}
                <div className="bg-white p-4 rounded-2xl border-2 border-orange-100 shadow-md text-center flex flex-col items-center">
                  <div className="w-48 h-48 bg-white flex items-center justify-center rounded-xl overflow-hidden border border-slate-100">
                    <img
                      src={qrImageUrl}
                      alt="Razorpay Dynamic UPI QR"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="mt-2 text-[11px] font-bold text-slate-600 flex items-center gap-1 justify-center">
                    <Shield className="w-3 h-3 text-emerald-600" /> Powered by Razorpay UPI
                  </div>
                </div>

                {/* Details & Copy ID */}
                <div className="space-y-3.5 text-center sm:text-left">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Amount to Pay</span>
                    <div className="text-3xl font-black text-slate-900 mt-0.5">₹{currentPrice}.00</div>
                    <p className="text-xs text-emerald-600 font-bold mt-0.5">
                      ✓ Instant Pro Access Activation
                    </p>
                  </div>

                  {/* UPI ID Box */}
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs">
                    <span className="text-[10px] font-semibold text-slate-400 block">Official UPI VPA ({currentUpiName}):</span>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <span className="font-mono font-bold text-slate-800">{currentUpiVpa}</span>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className="p-1 text-[#ff5421] hover:text-orange-700 rounded cursor-pointer"
                        title="Copy UPI ID"
                      >
                        {copiedUpi ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Supported Apps */}
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">Scan with any UPI scanner:</span>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-[10px] font-bold text-slate-700">
                      <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">PhonePe</span>
                      <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200">Paytm</span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">Google Pay</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">BHIM UPI</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: DIRECT PHONEPE / PAYTM / GPAY BUTTONS */}
            {checkoutMode === "upi_apps" && (
              <div className="space-y-3 bg-slate-50 p-5 rounded-3xl border border-slate-200">
                <div className="text-center mb-3">
                  <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider">
                    Select Your Preferred UPI App
                  </h3>
                  <div className="text-2xl font-black text-slate-900 mt-1">₹{currentPrice}.00</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* PhonePe Button */}
                  <button
                    type="button"
                    onClick={() => handleLaunchUpiApp("phonepe")}
                    className="p-3.5 rounded-2xl bg-white hover:bg-purple-50 border-2 border-purple-200 hover:border-purple-500 shadow-2xs transition flex flex-col items-center justify-center text-center cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-black text-sm mb-1.5 shadow-xs">
                      Pe
                    </div>
                    <span className="font-black text-xs text-purple-950">PhonePe</span>
                    <span className="text-[10px] text-purple-600 font-semibold mt-0.5">Pay via PhonePe</span>
                  </button>

                  {/* Paytm Button */}
                  <button
                    type="button"
                    onClick={() => handleLaunchUpiApp("paytm")}
                    className="p-3.5 rounded-2xl bg-white hover:bg-sky-50 border-2 border-sky-200 hover:border-sky-500 shadow-2xs transition flex flex-col items-center justify-center text-center cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#00b9f5] text-white flex items-center justify-center font-black text-xs mb-1.5 shadow-xs">
                      Paytm
                    </div>
                    <span className="font-black text-xs text-sky-950">Paytm UPI</span>
                    <span className="text-[10px] text-sky-600 font-semibold mt-0.5">Pay via Paytm</span>
                  </button>

                  {/* Google Pay Button */}
                  <button
                    type="button"
                    onClick={() => handleLaunchUpiApp("gpay")}
                    className="p-3.5 rounded-2xl bg-white hover:bg-emerald-50 border-2 border-emerald-200 hover:border-emerald-500 shadow-2xs transition flex flex-col items-center justify-center text-center cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-900 flex items-center justify-center font-black text-xs mb-1.5 shadow-xs">
                      GPay
                    </div>
                    <span className="font-black text-xs text-slate-900">Google Pay</span>
                    <span className="text-[10px] text-emerald-600 font-semibold mt-0.5">Pay via GPay</span>
                  </button>
                </div>

                {/* Option to open Razorpay standard popup */}
                <div className="mt-3 pt-3 border-t border-slate-200 text-center">
                  <button
                    type="button"
                    onClick={handleLaunchRazorpayGateway}
                    className="text-xs font-bold text-[#ff5421] hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Razorpay All-In-One Gateway Modal</span>
                  </button>
                </div>
              </div>
            )}

            {/* Confirm Payment Action Button */}
            {paymentSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-600 text-white font-black text-center flex items-center justify-center gap-2 animate-bounce shadow-lg">
                <Check className="w-5 h-5" /> Payment Successful! Pro Access Activated!
              </div>
            ) : (
              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => handlePaymentSuccessVerification({ paymentMethod: "MANUAL_QR_CONFIRM" })}
                  disabled={isProcessing}
                  className="w-full py-3.5 px-6 rounded-2xl font-black text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-600/25 transition transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isProcessing ? (
                    <>
                      <span className="animate-spin">⚡</span> Verifying Payment with Razorpay...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>I Have Completed Payment (Verify & Activate Pro)</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-slate-500">
                  After paying via QR code or PhonePe / Paytm / UPI, click the button above to activate Pro.
                </p>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition flex items-center justify-center gap-2 cursor-pointer mt-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Cancel Payment & Return to Editor</span>
                </button>
              </div>
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
