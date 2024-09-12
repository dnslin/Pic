const ApiIndex = () => import("@/views/api/index.vue");

export default {
  path: "/apidex",
  name: "ApiIndex",
  component: ApiIndex,
  meta: {
    icon: "icon-park-outline:api-app",
    title: "API管理",
    rank: 4
  }
} satisfies RouteConfigsTable;
