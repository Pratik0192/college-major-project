const orderDetailTemplate = ({orderId, items, amount, address, paymentMethod}) => {
  return `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #fafafa;">
    <h2 style="color: #2c3e50; text-align: center;">🧾 Order Confirmation</h2>
    <p style="font-size: 16px;">Hello,</p>
    <p style="font-size: 16px;">Thank you for your order! Here are the details:</p>

    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

    <h3 style="color: #34495e;">Order Summary</h3>
    <p><strong>Order ID:</strong> ${orderId}</p>
    <p><strong>Payment Method:</strong> ${paymentMethod}</p>
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

    <p style="font-size: 15px;">We will notify you once your order is shipped.</p>
    <p style="font-size: 15px;">Thank you for shopping with us!</p>

    <div style="text-align: center; margin-top: 30px; color: #888; font-size: 13px;">
      &copy; ${new Date().getFullYear()} EyeWear. All rights reserved.
    </div>
  </div>
  `;
}

export default orderDetailTemplate;