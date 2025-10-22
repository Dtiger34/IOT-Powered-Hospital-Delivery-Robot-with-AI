import React from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const robots = [
    { id: "RB-001", battery: 78, progress: 50, status: "Chờ bàn giao" },
    { id: "RB-002", battery: 55, progress: 99, status: "Chờ bàn giao" },
    { id: "RB-003", battery: 60, progress: 99, status: "Chờ bàn giao" },
    { id: "RB-004", battery: 78, progress: 0, status: "Tại trạm" },
    { id: "RB-005", battery: 68, progress: 50, status: "Chờ bàn giao" },
    { id: "RB-006", battery: 95, progress: 0, status: "Ngoại tuyến" },
    { id: "RB-007", battery: 100, progress: 0, status: "Đang sạc" },
    { id: "RB-008", battery: 69, progress: 0, status: "Tại trạm" },
    { id: "RB-009", battery: 67, progress: 0, status: "Sẵn sàng" },
    { id: "RB-010", battery: 54, progress: 0, status: "Sẵn sàng" },
    { id: "RB-011", battery: 68, progress: 0, status: "Sẵn sàng" },
    { id: "RB-012", battery: 55, progress: 0, status: "Sẵn sàng" },
];

const getStatusBadge = (status) => {
    const styles = {
        "Chờ bàn giao": { backgroundColor: "#c5a400", color: "#fff" },
        "Tại trạm": { backgroundColor: "#6f42c1", color: "#fff" },
        "Đang sạc": { backgroundColor: "#3949ab", color: "#fff" },
        "Sẵn sàng": { backgroundColor: "#2e7d32", color: "#fff" },
        "Ngoại tuyến": { backgroundColor: "#616161", color: "#fff" },
    };
    const style = styles[status] || { backgroundColor: "#777" };
    return <Badge bg="" style={{ ...style, padding: "6px 12px" }}>{status}</Badge>;
};

export default function RobotManagement() {
    const navigate = useNavigate();

    const handleClick = (robotId) => {
        navigate(`/robots/${robotId}`);
    };

    return (
        <div>
            <Container
                fluid
                style={{
                    backgroundColor: "#e0f7fa",
                    minHeight: "100vh",
                    padding: "30px",
                }}
            >
                <h3 style={{ color: "black", marginBottom: "30px" }}>Đội Robot Y Tế</h3>

                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {robots.map((r) => (
                        <Col key={r.id}>
                            <Card
                                onClick={() => handleClick(r.id)}
                                style={{
                                    backgroundColor: "#1e293b",
                                    color: "white",
                                    borderRadius: "12px",
                                    padding: "15px",
                                    border: "1px solid #334155",
                                    cursor: "pointer",
                                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                }}
                                className="hover-card"
                            >
                                <Card.Body>
                                    <Card.Title style={{ fontWeight: "bold", fontSize: "18px" }}>
                                        {r.id}
                                    </Card.Title>
                                    <Card.Text style={{ marginTop: "10px" }}>
                                        <div>🔋 Ắc quy: {r.battery}%</div>
                                        <div>⚙️ Tiến độ: {r.progress}%</div>
                                    </Card.Text>
                                    <div style={{ marginTop: "15px" }}>{getStatusBadge(r.status)}</div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Hiệu ứng hover */}
            <style>
                {`
                .hover-card:hover {
                    transform: scale(1.03);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
                }
                `}
            </style>
        </div>
    );
}
