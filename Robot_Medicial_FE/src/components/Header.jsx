import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handleNavigate = (target) => {
        switch (target) {
            case "dashboard":
                navigate("/dashboard");
                break;
            case "team":
                navigate("/team");
                break;
            case "doctor":
                navigate("/doctor");
                break;
            case "logout":

                localStorage.removeItem("token");
                navigate("/");
                break;
            default:
                navigate("/");
        }
    };

    return (
        <Navbar bg="light" expand="lg" className="shadow-sm fixed-top">
            <Container fluid>
                <Navbar.Brand
                    className="fw-bold text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/home")}
                >
                    🏥 Hospital-Robot
                </Navbar.Brand>

                <Nav className="ms-auto d-flex align-items-center">
                    <Button
                        variant="outline-primary"
                        className="me-2"
                        onClick={() => handleNavigate("dashboard")}
                    >
                        Bảng Điều Khiển
                    </Button>

                    <Button
                        variant="outline-success"
                        className="me-2"
                        onClick={() => handleNavigate("team")}
                    >
                        Quản Lý Đội Robot
                    </Button>
                    <Button
                        variant="outline-danger"
                        className="me-2"
                        onClick={() => handleNavigate("doctor")}
                    >
                        Quản Lý Bác Sĩ
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => handleNavigate("logout")}
                    >
                        Đăng Xuất
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
