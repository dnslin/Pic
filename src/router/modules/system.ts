const System = () => import("@/views/system/index.vue");

export default {
  path: "/system",
  name: "System",
  component: System,
  meta: {
    icon: "icon-park-outline:system",
    title: "系统配置",
    rank: 7
  }
} satisfies RouteConfigsTable;
