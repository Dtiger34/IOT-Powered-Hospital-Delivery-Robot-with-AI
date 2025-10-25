import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AddTask() {
    const navigate = useNavigate();

    const robots = ["RB-001", "RB-002", "RB-003", "RB-004"];
    const [selectedRobot, setSelectedRobot] = useState("");
    const [input, setInput] = useState("");
    const [route, setRoute] = useState([]);

    const suggestions = [
        "Phòng 301A - Khu cách ly",
        "Khoa Dược",
        "Phòng Xét Nghiệm",
        "Phòng Cấp Cứu",
        "Khoa Nhi",
        "Khoa Nội",
        "Phòng Phẫu Thuật 1",
    ];

    const handleAddPoint = () => {
        if (input.trim() !== "") {
            setRoute([...route, input]);
            setInput("");
        }
    };

    const handleSelectSuggestion = (s) => {
        setRoute([...route, s]);
    };

    const handleRemovePoint = (index) => {
        setRoute(route.filter((_, i) => i !== index));
    };

    const handleStartTask = () => {
        if (!selectedRobot) {
            alert("Vui lòng chọn robot trước khi bắt đầu nhiệm vụ!");
            return;
        }
        if (route.length === 0) {
            alert("Vui lòng thêm ít nhất một điểm đến!");
            return;
        }
        alert(
            `Giao nhiệm vụ cho ${selectedRobot} với ${route.length} điểm đến:\n- ${route.join(
                "\n- "
            )}`
        );
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f3f8ff",
                color: "#333",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Poppins, sans-serif",
            }}
        >
            <div
                style={{
                    width: "900px",
                    background: "#ffffff",
                    borderRadius: "12px",
                    padding: "32px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                    border: "1px solid #e0e7ff",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                        borderBottom: "2px solid #0d6efd",
                        paddingBottom: "10px",
                    }}
                >
                    <h4 style={{ fontWeight: "700", color: "#090a0cff" }}>
                        Giao Nhiệm Vụ Mới
                    </h4>
                    <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => navigate(-1)}
                        style={{
                            fontWeight: "600",
                            borderRadius: "6px",
                        }}
                    >
                        ✕ Hủy Bỏ
                    </button>
                </div>

                {/* Chọn robot */}
                <div style={{ marginBottom: "20px" }}>
                    <label
                        style={{
                            fontWeight: "600",
                            marginBottom: "6px",
                            color: "#090a0cff",
                        }}
                    >
                        Chọn Robot
                    </label>
                    <select
                        className="form-select"
                        value={selectedRobot}
                        onChange={(e) => setSelectedRobot(e.target.value)}
                        style={{
                            background: "#e7f1ff",
                            color: "#333",
                            border: "1px solid #0d6efd",
                            borderRadius: "8px",
                            fontWeight: "500",
                        }}
                    >
                        <option value="">-- Chọn robot --</option>
                        {robots.map((r) => (
                            <option key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="row g-4">
                    {/* Cột trái */}
                    <div className="col-md-6">
                        <h6
                            style={{
                                color: "#090a0cff",
                                fontWeight: "600",
                                marginBottom: "8px",
                            }}
                        >
                            Thêm Điểm Đến
                        </h6>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "16px",
                            }}
                        >
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập tên phòng, khoa..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                style={{
                                    background: "#e7f1ff",
                                    color: "#333",
                                    border: "1px solid #0d6efd",
                                    borderRadius: "8px",
                                }}
                            />
                            <button
                                onClick={handleAddPoint}
                                style={{
                                    background: "#0d6efd",
                                    border: "none",
                                    marginLeft: "8px",
                                    borderRadius: "8px",
                                    width: "40px",
                                    height: "40px",
                                    color: "#fff",
                                    fontSize: "20px",
                                    lineHeight: "20px",
                                }}
                            >
                                +
                            </button>
                        </div>

                        <h6 style={{ color: "#090a0cff", fontWeight: "600" }}>
                            Địa Điểm Gợi Ý
                        </h6>
                        <div
                            style={{
                                background: "#f8f9fa",
                                borderRadius: "8px",
                                padding: "12px",
                                maxHeight: "200px",
                                overflowY: "auto",
                                border: "1px solid #dee2e6",
                            }}
                        >
                            {suggestions.map((s, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSelectSuggestion(s)}
                                    style={{
                                        width: "100%",
                                        textAlign: "left",
                                        background: "#e7f1ff",
                                        color: "#0d6efd",
                                        border: "1px solid #cfe2ff",
                                        borderRadius: "8px",
                                        padding: "10px",
                                        marginBottom: "8px",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                    }}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Cột phải */}
                    <div className="col-md-6">
                        <h6
                            style={{
                                color: "#090a0cff",
                                fontWeight: "600",
                                marginBottom: "8px",
                            }}
                        >
                            Lộ Trình ({route.length})
                        </h6>
                        <div
                            style={{
                                background: "#f8f9fa",
                                borderRadius: "8px",
                                padding: "16px",
                                minHeight: "200px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                border: "1px solid #dee2e6",
                            }}
                        >
                            <div>
                                {route.length === 0 ? (
                                    <p style={{ color: "#6c757d", fontSize: "14px" }}>
                                        Chưa có điểm đến nào được thêm.
                                    </p>
                                ) : (
                                    <ul style={{ listStyle: "none", padding: 0 }}>
                                        {route.map((r, i) => (
                                            <li
                                                key={i}
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    background: "#e7f1ff",
                                                    borderRadius: "6px",
                                                    padding: "8px 10px",
                                                    marginBottom: "6px",
                                                    border: "1px solid #cfe2ff",
                                                }}
                                            >
                                                <span style={{ color: "#0d6efd", fontWeight: "500" }}>
                                                    {r}
                                                </span>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    style={{
                                                        background: "#dc3545",
                                                        border: "none",
                                                        borderRadius: "6px",
                                                        padding: "4px 8px",
                                                        fontWeight: "500",
                                                    }}
                                                    onClick={() => handleRemovePoint(i)}
                                                >
                                                    X
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <button
                                className="btn w-100"
                                style={{
                                    background: "#0d6efd",
                                    border: "none",
                                    color: "#fff",
                                    borderRadius: "8px",
                                    fontWeight: "600",
                                    marginTop: "8px",
                                    padding: "10px",
                                }}
                                onClick={handleStartTask}
                            >
                                Bắt Đầu Nhiệm Vụ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
