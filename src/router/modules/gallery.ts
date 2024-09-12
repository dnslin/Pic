const Gallery = () => import("@/views/gallery/index.vue");

export default {
  path: "/gallery",
  name: "Gallery",
  component: Gallery,
  meta: {
    icon: "solar:gallery-bold-duotone",
    title: "我的图库",
    rank: 1
  }
} satisfies RouteConfigsTable;
