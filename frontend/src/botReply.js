const BASE_URL = import.meta.env.VITE_FRONTEND_URL;

export const getBotReply = (message, context = {}) => {
  const userMsg = message.toLowerCase().trim();
  let botReply = "I'm not sure how to respond to that.";
  let updatedContext = { ...context };

  if (context.expecting === "product-details") {
    botReply = `Thanks! For <strong>${userMsg}</strong>, the price starts from ₹999. <br/> <a href="${BASE_URL}/products" class="text-blue-700 underline">Explore more options</a>`;
    updatedContext.expecting = null;
    return { botReply, updatedContext };
  }

  if (userMsg.includes("hi") || userMsg.includes("hello")) {
    const greetings = [
      "Hello! 👋 How can I assist you today?",
      "Hi there! Need help with something?",
      "Hey! What can I do for you today?",
    ];
    botReply = greetings[Math.floor(Math.random() * greetings.length)];
  } else if (userMsg.includes("price") || userMsg.includes("cost")) {
    botReply = "Our pricing depends on the product. What are you interested in?";
    updatedContext.expecting = "product-details";
  } else if (userMsg.includes("order")) {
    botReply = `Sure! You can place an order through our <a href="${BASE_URL}/products" class="text-blue-700 underline">Shop page</a>.`;
  } else if (userMsg.includes("refund")) {
    botReply = `I'm sorry to hear that! Please provide your order ID and our <a href="${BASE_URL}/profile" class="text-blue-700 underline">support team</a> will help you with the refund process.`;
  } else if (userMsg.includes("bye")) {
    const goodbyes = [
      "Goodbye! Have a great day. 😊",
      "Take care! Feel free to chat again anytime.",
      "Bye! Let me know if you need more help.",
    ];
    botReply = goodbyes[Math.floor(Math.random() * goodbyes.length)];
  } else if (userMsg.includes("thank")) {
    botReply = "You're welcome! 😊 Let me know if you need anything else.";
  }

  return { botReply, updatedContext };
};
