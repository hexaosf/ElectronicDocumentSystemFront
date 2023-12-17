// import React from "react";
// import lazyLoad from "@/routers/util/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";
import FileList from "@/views/fileList";

// 首页模块
const tableRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/file_list",
				// element: lazyLoad(React.lazy(() => import("@/views/home/index"))),
				element: <FileList />,
				meta: {
					requiresAuth: true,
					title: "文件列表",
					key: "fileList"
				}
			}
		]
	}
];

export default tableRouter;
