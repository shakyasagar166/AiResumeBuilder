package com.resumecraft.backend.service;

import com.resumecraft.backend.dto.CouponDto;
import com.resumecraft.backend.dto.PaymentRequest;
import com.resumecraft.backend.dto.PaymentResponse;
import com.resumecraft.backend.events.ResumeEvent;
import com.resumecraft.backend.model.PaymentOrder;
import com.resumecraft.backend.producer.KafkaEventProducer;
import com.resumecraft.backend.repository.PaymentOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.UUID;

@Service
public class PaymentService {

    private final PaymentOrderRepository paymentOrderRepository;
    private final UsageService usageService;

    @Autowired(required = false)
    private RazorpayService razorpayService;

    @Autowired(required = false)
    private KafkaEventProducer kafkaEventProducer;

    public PaymentService(PaymentOrderRepository paymentOrderRepository, UsageService usageService) {
        this.paymentOrderRepository = paymentOrderRepository;
        this.usageService = usageService;
    }

    public CouponDto validateCoupon(String code) {
        if (code == null || code.isBlank()) {
            return new CouponDto("", false, 0, "No coupon entered");
        }

        String clean = code.trim().toUpperCase(Locale.ROOT);
        if ("UNCODEMY".equals(clean) || "UNCODEMY70".equals(clean) || "UNACADEMY".equals(clean) || "UNACADEMY70".equals(clean)) {
            return new CouponDto(clean, true, 70, "Uncodemy Student Special: Flat 70% OFF activated!");
        } else if ("STUDENT".equals(clean) || "COLLEGE".equals(clean)) {
            return new CouponDto(clean, true, 70, "College Student Verified: Flat 70% OFF activated!");
        } else if ("PROMO70".equals(clean)) {
            return new CouponDto(clean, true, 70, "Launch Promo Discount: 70% OFF applied!");
        }

        return new CouponDto(clean, false, 0, "Invalid coupon code. Try 'UNCODEMY' or 'STUDENT'");
    }

    public PaymentResponse processPayment(PaymentRequest request) {
        String orderId = (request.getOrderId() != null && !request.getOrderId().isBlank())
                ? request.getOrderId()
                : "ORD_" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        String userIdentifier = request.getUserIdentifier() != null ? request.getUserIdentifier() : "guest-user";

        // Signature check if Razorpay official callback
        if (razorpayService != null && request.getPaymentId() != null && request.getSignature() != null) {
            boolean valid = razorpayService.verifySignature(orderId, request.getPaymentId(), request.getSignature());
            if (!valid) {
                return new PaymentResponse(false, orderId, request.getPlan(), request.getAmount(), "Signature verification failed.");
            }
        }

        PaymentOrder order = new PaymentOrder();
        order.setOrderId(orderId);
        order.setUserIdentifier(userIdentifier);
        order.setPlan(request.getPlan());
        order.setAmount(request.getAmount());
        order.setCouponCode(request.getCoupon());
        order.setStatus("SUCCESS");

        paymentOrderRepository.save(order);

        // Upgrade usage status
        usageService.upgradeToPro(userIdentifier, request.getPlan(), request.getCoupon());

        // Publish Kafka event
        if (kafkaEventProducer != null) {
            String method = request.getPaymentMethod() != null ? request.getPaymentMethod() : "RAZORPAY_UPI";
            kafkaEventProducer.publishEvent(new ResumeEvent(
                    "PAYMENT_SUCCESS",
                    userIdentifier,
                    null,
                    "Plan: " + request.getPlan() + " | Method: " + method + " | Amount: ₹" + request.getAmount()
            ));
        }

        return new PaymentResponse(
                true,
                orderId,
                request.getPlan(),
                request.getAmount(),
                "Payment successfully verified! Unlimited Pro access activated."
        );
    }
}
