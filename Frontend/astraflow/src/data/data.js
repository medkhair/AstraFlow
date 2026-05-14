const tenants = [
  {
    id: "5094c936-5662-43c0-adb6-91804e68359e",
    name: "Demo TV",
    subdomain: "demotv",
    custom_domain: "demotv.com",
    currency: "USD",
    timezone: "UTC",
    status: "ACTIVE",
    created_at: "2026-05-13T15:57:34.000Z",
    updated_at: "2026-05-13T15:57:34.000Z",
  },
];

const users = [
  {
    user_type: "OWNER",
    id: "6090615a-1e4b-4ad6-89be-7ff404799c59",
    email: "owner@astraflow.com",
    full_name: "John Owner",
    password: "secret123",
    phone: "+1234567890",
    status: "ACTIVE",
    created_at: "2026-05-13T15:56:11.000Z",
    updated_at: "2026-05-13T15:56:11.000Z",
  },
  {
    user_type: "ADMIN",
    id: "2bb1cd70-08cb-4797-b199-4db73cc47463",
    email: "admin@demotv.com",
    full_name: "Alice Admin",
    password: "admin123",
    phone: "+1987654321",
    status: "ACTIVE",
    created_at: "2026-05-13T16:00:22.000Z",
    updated_at: "2026-05-13T16:00:22.000Z",
  },
  {
    user_type: "CLIENT",
    id: "96a567a1-60e4-4e18-ab2d-b1eed136a776",
    email: "client@example.com",
    full_name: "Bob Client",
    password: "client123",
    phone: "+1555000111",
    status: "ACTIVE",
    created_at: "2026-05-13T16:01:38.000Z",
    updated_at: "2026-05-13T16:01:38.000Z",
  },
];

const owners = [
  {
    id: "6090615a-1e4b-4ad6-89be-7ff404799c59",
    company_name: "AstraFlow Inc.",
  },
];

const admins = [
  {
    id: "2bb1cd70-08cb-4797-b199-4db73cc47463",
    tenant_id: "5094c936-5662-43c0-adb6-91804e68359e",
  },
];

const clients = [
  {
    id: "96a567a1-60e4-4e18-ab2d-b1eed136a776",
    tenant_id: "5094c936-5662-43c0-adb6-91804e68359e",
  },
];

const brandings = [
  {
    id: "396d868c-bdda-4c46-bd67-1582e1465956",
    tenant_id: "5094c936-5662-43c0-adb6-91804e68359e",
    logo_url: "https://cdn.demotv.com/logo.png",
    primary_color: "#FF5733",
    secondary_color: "#33C1FF",
    custom_css: "body { font-family: Arial; }",
  },
];

const channel_categories = [
  {
    id: "c97acf21-1e60-4fcb-b128-9efc0e0aea8e",
    tenant_id: "5094c936-5662-43c0-adb6-91804e68359e",
    name: "Sports",
    description: "All sports channels",
    sort_order: 1,
  },
];

const channels = [
  {
    id: "56daa783-d362-4fc1-80cd-7d538f492ae4",
    tenant_id: "5094c936-5662-43c0-adb6-91804e68359e",
    category_id: "c97acf21-1e60-4fcb-b128-9efc0e0aea8e",
    name: "ESPN HD",
    channel_number: 101,
    status: "ACTIVE",
    logo_url: "https://cdn.demotv.com/espn.png",
    stream_url: "https://stream.demotv.com/espn",
  },
];

const plans = [
  {
    id: "655fde7e-693b-4ee7-8a2d-40a462c83832",
    tenant_id: "5094c936-5662-43c0-adb6-91804e68359e",
    name: "Monthly Basic",
    plan_type: "MONTHLY",
    price: 9.99,
    duration_days: 30,
    max_connections: 2,
    is_active: true,
  },
];

const subscriptions = [
  {
    id: "04f1b153-eea7-4aac-922d-89a6c772ab65",
    client_id: "96a567a1-60e4-4e18-ab2d-b1eed136a776",
    plan_id: "655fde7e-693b-4ee7-8a2d-40a462c83832",
    status: "ACTIVE",
    start_date: "2026-05-13",
    end_date: "2026-06-13",
    trial_end_date: null,
    created_at: "2026-05-13T16:13:46.000Z",
    updated_at: "2026-05-13T16:13:46.000Z",
  },
];

const payments = [
  {
    id: "92db4af9-eb40-4d05-b9a4-127b227100fb",
    subscription_id: "04f1b153-eea7-4aac-922d-89a6c772ab65",
    amount: 9.99,
    currency: "USD",
    method: "CREDIT_CARD",
    status: "COMPLETED",
    transaction_id: "TXN-001-2026",
    paid_at: "2026-05-13T12:00:00.000Z",
  },
];

const devices = [
  {
    id: "ed008039-2589-4c82-8835-ed85ff5691c0",
    client_id: "96a567a1-60e4-4e18-ab2d-b1eed136a776",
    device_id: "DEVICE-ABC-12345",
    device_name: "Samsung TV",
    device_type: "SMART_TV",
    last_active_at: null,
    created_at: "2026-05-13T16:17:05.000Z",
  },
];

const favorites = [
  {
    id: "c7420e9f-4a7b-4a3f-91a9-2e2da03637bf",
    client_id: "96a567a1-60e4-4e18-ab2d-b1eed136a776",
    channel_id: "56daa783-d362-4fc1-80cd-7d538f492ae4",
    created_at: "2026-05-13T16:18:13.000Z",
  },
];

const support_tickets = [
  {
    id: "c84b509c-7bdb-4ca8-afb6-c4cb8f56702e",
    tenant_id: "5094c936-5662-43c0-adb6-91804e68359e",
    client_id: "96a567a1-60e4-4e18-ab2d-b1eed136a776",
    admin_id: "2bb1cd70-08cb-4797-b199-4db73cc47463",
    subject: "Stream not working",
    message: "ESPN HD channel keeps buffering after 10 seconds.",
    priority: "HIGH",
    status: "OPEN",
    created_at: "2026-05-13T16:20:26.000Z",
    updated_at: "2026-05-13T16:20:26.000Z",
  },
];

module.exports = {
  tenants,
  users,
  owners,
  admins,
  clients,
  brandings,
  channel_categories,
  channels,
  plans,
  subscriptions,
  payments,
  devices,
  favorites,
  support_tickets,
};
