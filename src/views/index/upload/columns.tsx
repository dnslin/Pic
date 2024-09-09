// 如果您不习惯tsx写法，可以传slot，然后在template里写
// 需是hooks写法（函数中有return），避免失去响应性
export function useColumns() {
  const columns: TableColumnList = [
    {
      label: "预览",
      slot: "image",
      width: 120
    },
    {
      label: "图片名称",
      prop: "fileName",
      width: 240,
      cellRenderer: ({ row }) => (
        <div style="display: flex; align-items: start">
          <span title={row.fileName}>{row.fileName}</span>
        </div>
      )
    },
    {
      label: "文件大小",
      prop: "fileSize",
      width: 150,
      cellRenderer: ({ row }) => (
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{row.fileSize}</span>
        </div>
      )
    },
    {
      label: "MD5",
      prop: "md5",
      cellRenderer: ({ row }) => (
        <div style="display: flex; align-items: center">
          <span
            title={row.md5}
            class="inline-block overflow-hidden text-ellipsis whitespace-nowrap custom-ellipsis"
          >
            {row.md5}
          </span>
        </div>
      )
    },
    {
      label: "状态",
      slot: "status",
      width: 90
    },
    {
      label: "操作",
      slot: "operation",
      width: 120
    }
  ];
  return {
    columns
  };
}
