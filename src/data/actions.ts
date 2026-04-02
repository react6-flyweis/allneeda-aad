export interface ActionField {
  name: string;
  type: string;
  required?: boolean;
  description?: string;
  defaultValue?: string | number;
  options?: string[];
}

export interface Action {
  id: string;
  name: string;
  category: string;
  description: string;
  fields: ActionField[];
  examplePayload: Record<string, unknown>;
}

export const categories = [
  "Finance",
  "Marketing",
  "Communication",
  "CRM",
  "Loyalty",
  "Content",
  "Analytics",
];

export const actions: Action[] = [
  {
    id: "wallet.add_credit",
    name: "wallet.add_credit",
    category: "Finance",
    description: "Add credit to user or provider wallet",
    fields: [
      {
        name: "user_id",
        type: "string",
        required: true,
        description: "User or provider ID",
      },
      {
        name: "amount",
        type: "number",
        required: true,
        description: "Amount to credit",
      },
      {
        name: "currency",
        type: "select",
        required: true,
        description: "Currency for credit amount",
        defaultValue: "USD",
        options: ["USD", "EUR"],
      },
      {
        name: "reason",
        type: "string",
        required: true,
        description: "Reason for credit",
      },
    ],
    examplePayload: {
      action: "wallet.add_credit",
      user_id: "user_123",
      amount: 50,
      currency: "USD",
      reason: "In-app referral bonus",
    },
  },
  {
    id: "ads.give_promo_credit",
    name: "ads.give_promo_credit",
    category: "Marketing",
    description: "Give promotional ad credit",
    fields: [
      {
        name: "advertiser_id",
        type: "string",
        required: true,
        description: "Advertiser ID",
      },
      {
        name: "credit_amount",
        type: "number",
        required: true,
        description: "Credit amount",
      },
      {
        name: "expiry_days",
        type: "number",
        required: true,
        description: "Days until credit expires",
        defaultValue: 30,
      },
    ],
    examplePayload: {
      action: "ads.give_promo_credit",
      advertiser_id: "adv_456",
      credit_amount: 100,
      expiry_days: 30,
    },
  },
  {
    id: "campaign.pause",
    name: "campaign.pause",
    category: "Marketing",
    description: "Pause an advertising campaign",
    fields: [
      {
        name: "campaign_id",
        type: "string",
        required: true,
        description: "Campaign ID",
      },
    ],
    examplePayload: {
      action: "campaign.pause",
      campaign_id: "camp_789",
    },
  },
  {
    id: "notification.send_push",
    name: "notification.send_push",
    category: "Communication",
    description: "Send push notification",
    fields: [
      {
        name: "user_id",
        type: "string",
        required: true,
        description: "User ID",
      },
      {
        name: "title",
        type: "string",
        required: true,
        description: "Notification title",
      },
      {
        name: "message",
        type: "string",
        required: true,
        description: "Notification message",
      },
      {
        name: "action_url",
        type: "string",
        required: false,
        description: "Deep link URL (optional)",
      },
    ],
    examplePayload: {
      action: "notification.send_push",
      user_id: "user_123",
      title: "Order update",
      message: "Your order has been confirmed",
      action_url: "app://orders/123",
    },
  },
  {
    id: "notification.send_email",
    name: "notification.send_email",
    category: "Communication",
    description: "Send email notification",
    fields: [
      {
        name: "email",
        type: "string",
        required: true,
        description: "Email address",
      },
      {
        name: "template_id",
        type: "select",
        required: true,
        description: "Email template",
        options: ["Welcome Email", "Order Confirmation", "Inactive User"],
      },
      {
        name: "variables",
        type: "string",
        required: false,
        description: "Template variables (JSON)",
      },
    ],
    examplePayload: {
      action: "notification.send_email",
      email: "user@example.com",
      template_id: "Order Confirmation",
      variables: '{ "firstName": "Alex" }',
    },
  },
  {
    id: "notification.send_sms",
    name: "notification.send_sms",
    category: "Communication",
    description: "Send SMS notification",
    fields: [
      {
        name: "phone",
        type: "string",
        required: true,
        description: "Phone number",
      },
      {
        name: "message",
        type: "string",
        required: true,
        description: "SMS message",
      },
    ],
    examplePayload: {
      action: "notification.send_sms",
      phone: "+1234567890",
      message: "Your code is 1234",
    },
  },
  {
    id: "crm.tag_user",
    name: "crm.tag_user",
    category: "CRM",
    description: "Add tag to user in CRM",
    fields: [
      {
        name: "user_id",
        type: "string",
        required: true,
        description: "User ID",
      },
      {
        name: "tag",
        type: "string",
        required: true,
        description: "Tag name",
      },
    ],
    examplePayload: {
      action: "crm.tag_user",
      user_id: "user_123",
      tag: "high_value",
    },
  },
  {
    id: "crm.add_to_segment",
    name: "crm.add_to_segment",
    category: "CRM",
    description: "Add user to CRM segment",
    fields: [
      {
        name: "user_id",
        type: "string",
        required: true,
        description: "User ID",
      },
      {
        name: "segment_id",
        type: "select",
        required: true,
        description: "Segment for user",
        options: ["High Value Users", "At Risk", "Power Users"],
      },
    ],
    examplePayload: {
      action: "crm.add_to_segment",
      user_id: "user_123",
      segment_id: "High Value Users",
    },
  },
  {
    id: "loyalty.add_points",
    name: "loyalty.add_points",
    category: "Loyalty",
    description: "Add loyalty points to user account",
    fields: [
      {
        name: "user_id",
        type: "string",
        required: true,
        description: "User ID",
      },
      {
        name: "points",
        type: "number",
        required: true,
        description: "Points to add",
      },
      {
        name: "reason",
        type: "string",
        required: true,
        description: "Reason for points",
      },
    ],
    examplePayload: {
      action: "loyalty.add_points",
      user_id: "user_123",
      points: 100,
      reason: "purchase",
    },
  },
  {
    id: "feed.boost_post",
    name: "feed.boost_post",
    category: "Content",
    description: "Boost post visibility in feed",
    fields: [
      {
        name: "post_id",
        type: "string",
        required: true,
        description: "Post ID",
      },
      {
        name: "boost_duration_hours",
        type: "number",
        required: true,
        description: "Duration in hours",
        defaultValue: 24,
      },
      {
        name: "boost_multiplier",
        type: "number",
        required: false,
        description: "Visibility multiplier",
        defaultValue: 2,
      },
    ],
    examplePayload: {
      action: "feed.boost_post",
      post_id: "post_456",
      boost_duration_hours: 24,
      boost_multiplier: 1.5,
    },
  },
  {
    id: "analytics.log_event",
    name: "analytics.log_event",
    category: "Analytics",
    description: "Log custom analytics event",
    fields: [
      {
        name: "event_name",
        type: "string",
        required: true,
        description: "Event name",
      },
      {
        name: "properties",
        type: "string",
        required: false,
        description: "Event properties (JSON)",
      },
    ],
    examplePayload: {
      action: "analytics.log_event",
      event_name: "checkout_started",
      properties: { cart_value: 320 },
    },
  },
];
