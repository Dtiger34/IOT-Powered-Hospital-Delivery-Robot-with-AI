import Home from "@/pages/Home";
import Login from "@/pages/Login";
import MainLayout from "@/layouts/MainLayout";
import RobotManagement from "../pages/RobotManagement";
import RobotDashBoard from "../pages/RobotDashBoard";
import DoctorProfileProvisionForm from "../pages/DoctorProfileProvisionForm";
import DoctorManagementPage from "../pages/DoctorManagementPage";
import RobotDetailMisson from "../pages/RobotDetailMisson";
import AddTask from "../pages/AddTask";
const routes = [
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/home",
        element: (
            <Home />
        ),
    },

    {
        path: "/team",
        element: (
            <MainLayout>
                <RobotManagement />
            </MainLayout>
        ),
    },
    {
        path: "/dashboard",
        element: (
            <MainLayout>
                <RobotDashBoard />
            </MainLayout>
        ),
    },
    {
        path: "/doctor",
        element: (
            <MainLayout>
                <DoctorManagementPage />
            </MainLayout>
        ),
    },
    {
        path: "/robot-tasks/:id",
        element: (
            <MainLayout>
                <RobotDetailMisson />
            </MainLayout>
        ),
    },

    {
        path: "/addtasks",
        element: (
            <MainLayout>
                <AddTask />
            </MainLayout>
        ),
    },
];

export default routes;
