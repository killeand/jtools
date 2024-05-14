import RouteFlags from "@/scripts/RouteFlags";

import Home from "@/pages/Home";
import ImageProc from "@/pages/ImageProc";
import Uid from "@/pages/Uid";

export const SiteStructure = [
    {
        name: "Home",
        url: "/",
        path: "/",
        icon: "bi-house-fill",
        flags: RouteFlags.Index | RouteFlags.Always,
        component: <Home />,
        children: null,
    },
    {
        name: "Image Proc",
        url: "/imageproc",
        path: "/imageproc",
        icon: "bi-file-image",
        flags: RouteFlags.Always,
        component: <ImageProc />,
        children: null,
    },
    {
        name: "UID",
        url: "/uidgen",
        path: "/uidgen",
        icon: "bi-shuffle",
        flags: RouteFlags.Always,
        component: <Uid />,
        children: null,
    },
];
