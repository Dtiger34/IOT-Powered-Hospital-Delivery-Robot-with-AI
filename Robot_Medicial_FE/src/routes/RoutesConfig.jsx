import Home from "@/pages/Home";
import MainLayout from "@/layouts/MainLayout";

const routes = [
    {
        path: "/",
        element: (
            <MainLayout>
                <Home />
            </MainLayout>
        ),
    },
];

export default routes;
