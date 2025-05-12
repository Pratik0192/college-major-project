const orderStatusUpdateTemplate = ({ orderId, items, amount, address, status }) => {
  const isDelivered = status.toLowerCase() === "delivered";

  return `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #fafafa;">
    <h2 style="color: #2c3e50; text-align: center;">📦 Order Status Update</h2>
    <p style="font-size: 16px;">Hello,</p>
    <p style="font-size: 16px;">We're reaching out to inform you that the status of your order has been updated to:</p>
    <p style="font-size: 18px; font-weight: bold; color: #2980b9;">${status}</p>

    ${isDelivered ? `
      <p style="font-size: 16px; margin-top: 20px; color: #27ae60;">
        🎉 We're glad your order has been delivered! We’d love to hear your feedback.
        Please take a moment to <strong>add a review</strong> for the products you received.
      </p>
    ` : ''}

    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

    <h3 style="color: #34495e;">Order Summary</h3>
    <p><strong>Order ID:</strong> ${orderId}</p>
    <p><strong>Total Amount:</strong> ₹${amount}</p>

    <h3 style="color: #34495e; margin-top: 20px;">Shipping Address</h3>
    <p style="margin: 0;">${address.street},</p>
    <p style="margin: 0;">${address.city}, ${address.state} - ${address.zipcode}</p>

    <h3 style="color: #34495e; margin-top: 20px;">Items Ordered</h3>
    <ul style="padding-left: 20px;">
      ${items.map(item => `
        <li style="margin-bottom: 6px;">
          ${item.name} — <strong>${item.quantity}</strong> x ₹${item.discounted_price}
        </li>
      `).join("")}
    </ul>

    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

    <p style="font-size: 15px;">We'll notify you of any further updates regarding your order.</p>
    <p style="font-size: 15px;">Thank you for choosing us!</p>

    <div style="text-align: center; margin-top: 30px; color: #888; font-size: 13px;">
      &copy; ${new Date().getFullYear()} EyeWear. All rights reserved.
    </div>
  </div>
  `;
};

export default orderStatusUpdateTemplate;
