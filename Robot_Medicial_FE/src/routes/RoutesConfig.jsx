import Home from "@/pages/Home";
import Login from "@/pages/Login";
import MainLayout from "@/layouts/MainLayout";
import RobotManagement from "../pages/RobotManagement";
const routes = [
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/home",
        element: (
            <MainLayout>
                <Home />
            </MainLayout>
        ),
    },

    {
        path: "/team",
        element: (
            <MainLayout>
                <RobotManagement />
            </MainLayout>
        ),
    }
];

export default routes;
