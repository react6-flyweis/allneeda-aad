export interface EventField {
  name: string;
  type: string;
}

export interface Event {
  id: string;
  name: string;
  category: string;
  description: string;
  fields: EventField[];
  examplePayload: Record<string, unknown>;
}

export const events: Event[] = [
  {
    id: "user.signup",
    name: "user.signup",
    category: "User",
    description: "Triggered when a new user signs up",
    fields: [
      { name: "actor_id", type: "string" },
      { name: "email", type: "string" },
      { name: "signup_method", type: "string" },
    ],
    examplePayload: {
      event_name: "user.signup",
      actor_id: "user_123",
      context: {
        email: "user@example.com",
        signup_method: "email",
      },
    },
  },
  {
    id: "user.login",
    name: "user.login",
    category: "User",
    description: "Triggered when a user logs in",
    fields: [
      { name: "actor_id", type: "string" },
      { name: "device", type: "string" },
    ],
    examplePayload: {
      event_name: "user.login",
      actor_id: "user_123",
      context: {
        device: "mobile",
      },
    },
  },
  {
    id: "user.inactive",
    name: "user.inactive",
    category: "User",
    description: "Triggered when a user has been inactive for specified days",
    fields: [
      { name: "actor_id", type: "string" },
      { name: "days_inactive", type: "number" },
    ],
    examplePayload: {
      event_name: "user.inactive",
      actor_id: "user_123",
      context: {
        days_inactive: 30,
      },
    },
  },
  {
    id: "provider.signup",
    name: "provider.signup",
    category: "Provider",
    description: "Triggered when a new provider signs up",
    fields: [
      { name: "actor_id", type: "string" },
      { name: "business_type", type: "string" },
      { name: "city", type: "string" },
    ],
    examplePayload: {
      event_name: "provider.signup",
      actor_id: "provider_456",
      context: {
        business_type: "restaurant",
        city: "New York",
      },
    },
  },
  {
    id: "provider.post_created",
    name: "provider.post_created",
    category: "Provider",
    description: "Triggered when a provider creates a new post",
    fields: [
      { name: "actor_id", type: "string" },
      { name: "post_id", type: "string" },
      { name: "category", type: "string" },
      { name: "created_at_local", type: "timestamp" },
    ],
    examplePayload: {
      event_name: "provider.post_created",
      actor_id: "provider_456",
      context: {
        post_id: "post_789",
        category: "food",
        created_at_local: "2025-12-15T08:34:59-05:00",
      },
    },
  },
  {
    id: "provider.story_created",
    name: "provider.story_created",
    category: "Provider",
    description: "Triggered when a provider creates a story",
    fields: [
      { name: "actor_id", type: "string" },
      { name: "story_id", type: "string" },
    ],
    examplePayload: {
      event_name: "provider.story_created",
      actor_id: "provider_456",
      context: {
        story_id: "story_321",
      },
    },
  },
  {
    id: "order.created",
    name: "order.created",
    category: "Order",
    description: "Triggered when a new order is created",
    fields: [
      { name: "order_id", type: "string" },
      { name: "user_id", type: "string" },
      { name: "provider_id", type: "string" },
      { name: "total", type: "number" },
    ],
    examplePayload: {
      event_name: "order.created",
      actor_id: "user_123",
      context: {
        order_id: "order_123",
        user_id: "user_456",
        provider_id: "prov_789",
        total: 45.5,
      },
    },
  },
  {
    id: "order.completed",
    name: "order.completed",
    category: "Order",
    description: "Triggered when an order is completed",
    fields: [
      { name: "order_id", type: "string" },
      { name: "user_id", type: "string" },
      { name: "provider_id", type: "string" },
    ],
    examplePayload: {
      event_name: "order.completed",
      actor_id: "user_123",
      context: {
        order_id: "order_123",
        user_id: "user_456",
        provider_id: "prov_789",
      },
    },
  },
  {
    id: "order.canceled",
    name: "order.canceled",
    category: "Order",
    description: "Triggered when an order is canceled",
    fields: [
      { name: "order_id", type: "string" },
      { name: "reason", type: "string" },
    ],
    examplePayload: {
      event_name: "order.canceled",
      actor_id: "user_123",
      context: {
        order_id: "order_123",
        reason: "User requested cancellation",
      },
    },
  },
  {
    id: "cart.abandoned",
    name: "cart.abandoned",
    category: "Commerce",
    description: "Triggered when a cart is abandoned for specified duration",
    fields: [
      { name: "user_id", type: "string" },
      { name: "cart_value", type: "number" },
      { name: "items_count", type: "number" },
    ],
    examplePayload: {
      event_name: "cart.abandoned",
      actor_id: "user_123",
      context: {
        user_id: "user_123",
        cart_value: 500,
        items_count: 3,
      },
    },
  },
  {
    id: "review.submitted",
    name: "review.submitted",
    category: "Engagement",
    description: "Triggered when a user submits a review",
    fields: [
      { name: "user_id", type: "string" },
      { name: "provider_id", type: "string" },
      { name: "rating", type: "number" },
    ],
    examplePayload: {
      event_name: "review.submitted",
      actor_id: "user_123",
      context: {
        user_id: "user_123",
        provider_id: "provider_456",
        rating: 5,
      },
    },
  },
  {
    id: "campaign.created",
    name: "campaign.created",
    category: "Marketing",
    description: "Triggered when a new campaign is created",
    fields: [
      { name: "campaign_id", type: "string" },
      { name: "budget", type: "number" },
      { name: "advertiser_id", type: "string" },
    ],
    examplePayload: {
      event_name: "campaign.created",
      actor_id: "advertiser_789",
      context: {
        campaign_id: "campaign_101",
        budget: 10000,
        advertiser_id: "advertiser_789",
      },
    },
  },
  {
    id: "campaign.spent_threshold_reached",
    name: "campaign.spent_threshold_reached",
    category: "Marketing",
    description: "Triggered when campaign reaches spending threshold",
    fields: [
      { name: "campaign_id", type: "string" },
      { name: "spent_percentage", type: "number" },
    ],
    examplePayload: {
      event_name: "campaign.spent_threshold_reached",
      actor_id: "advertiser_789",
      context: {
        campaign_id: "campaign_101",
        spent_percentage: 80,
      },
    },
  },
];

export const categories = [...new Set(events.map((e) => e.category))];
