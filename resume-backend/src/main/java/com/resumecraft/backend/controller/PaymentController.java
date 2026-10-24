package com.resumecraft.backend.controller;

import com.resumecraft.backend.dto.CouponDto;
import com.resumecraft.backend.dto.PaymentRequest;
import com.resumecraft.backend.dto.PaymentResponse;
import com.resumecraft.backend.service.PaymentService;
import com.resumecraft.backend.service.RazorpayService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/payment")
public class PaymentController {

    private final PaymentService paymentService;
    private final RazorpayService razorpayService;

    public PaymentController(PaymentService paymentService, RazorpayService razorpayService) {
        this.paymentService = paymentService;
        this.razorpayService = razorpayService;
    }

    /**
     * Create Razorpay Order & Dynamic UPI QR Payload
     */
    @PostMapping("/create-order")
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody PaymentRequest request) {
        double amount = request.getAmount() != null ? request.getAmount() : 49.0;
        Map<String, Object> orderData = razorpayService.createOrder(
                amount,
                "rcpt_" + request.getPlan(),
                request.getUserIdentifier()
        );
        return ResponseEntity.ok(orderData);
    }

    /**
     * Verify Payment & Activate Pro Tier
     */
    @PostMapping("/verify-order")
    public ResponseEntity<PaymentResponse> verifyOrder(@RequestBody PaymentRequest request) {
        PaymentResponse response = paymentService.processPayment(request);
        return ResponseEntity.ok(response);
    }

    /**
     * Student Coupon Validation
     */
    @GetMapping("/coupon/validate")
    public ResponseEntity<CouponDto> validateCoupon(@RequestParam String code) {
        CouponDto result = paymentService.validateCoupon(code);
        return ResponseEntity.ok(result);
    }
}
