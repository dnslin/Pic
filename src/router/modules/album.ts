const Album = () => import("@/views/album/index.vue");

export default {
  path: "/album",
  name: "Album",
  component: Album,
  meta: {
    icon: "solar:album-line-duotone",
    title: "我的相册",
    rank: 2
  }
} satisfies RouteConfigsTable;
