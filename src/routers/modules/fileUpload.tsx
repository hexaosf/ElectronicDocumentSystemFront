// import React from "react";
// import lazyLoad from "@/routers/util/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";
import FileUpload from "@/views/fileUpload";

// 首页模块
const tableRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/file_upload",
				element: <FileUpload />,
				meta: {
					requiresAuth: true,
					title: "文件上传",
					key: "fileUpload"
				}
			}
		]
	}
];

export default tableRouter;
