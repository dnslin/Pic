const Ecycle = () => import("@/views/ecycle/index.vue");

export default {
  path: "/ecycle",
  name: "Ecycle",
  component: Ecycle,
  meta: {
    icon: "fluent:bin-recycle-24-regular",
    title: "回收站",
    rank: 5
  }
} satisfies RouteConfigsTable;
