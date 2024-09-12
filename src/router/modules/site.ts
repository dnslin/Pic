const WebSiteConfig = () => import("@/views/website/index.vue");

export default {
  path: "/site",
  name: "WebSiteConfig",
  component: WebSiteConfig,
  meta: {
    icon: "dashicons:admin-site-alt",
    title: "网站配置",
    rank: 6
  }
} satisfies RouteConfigsTable;
