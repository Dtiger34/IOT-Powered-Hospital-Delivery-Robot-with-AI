// src/pages/TaskDetail.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TaskDetail() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [task] = useState({
        id: "RB-001",
        title: "RB-001",
        status: "Cần hỗ trợ",
        battery: 75,
        destination: "Khoa Dược (1/2)",
        position: "Hành lang tầng 1",
    });

    const [message, setMessage] = useState("");
    const [micOn, setMicOn] = useState(false);
    const [logs, setLogs] = useState([
        { t: "13:24:17", type: "ok", text: "Hệ thống khởi động. Robot sẵn sàng." },
        { t: "13:24:53", type: "error", text: "AI không thể xử lý tình huống. Yêu cầu hỗ trợ!" },
        { t: "13:24:55", type: "voice", text: 'Phát thanh: "Robot đang đến, vui lòng tránh đường."' },
    ]);

    // thêm log tiện dụng
    const addLog = (type, text) => {
        setLogs((s) => [{ t: new Date().toLocaleTimeString(), type, text }, ...s]);
    };

    // gửi phát thanh
    const sendMessage = () => {
        if (!message.trim()) return;
        addLog("voice", `Phát thanh: "${message}"`);
        setMessage("");
    };

    // chọn thông báo nhanh
    const handleQuickMessage = (e) => {
        const text = e.target.value;
        if (text && text !== "Chọn thông báo nhanh") {
            addLog("voice", `Phát thanh nhanh: "${text}"`);
        }
    };

    // bật / tắt mic
    const toggleMic = () => {
        const newState = !micOn;
        setMicOn(newState);
        addLog("voice", newState ? "Mở mic trực tiếp" : "Tắt mic trực tiếp");
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(90deg, #8bf0e4ff 10%, #FFFFFF 100%)",
                padding: "32px",
                color: "#1b2e4b",
                fontFamily: "Poppins, sans-serif",
            }}
        >
            <div className="container-fluid">
                <div className="row g-4">
                    {/* LEFT */}
                    <div className="col-lg-3">
                        <div
                            style={{
                                background: "#fff",
                                borderRadius: "12px",
                                padding: "20px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                border: "1px solid #e3edf8",
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <h5 className="fw-bold">{task.title}</h5>
                                <button
                                    className="btn btn-outline-secondary btn-sm rounded-3"
                                    onClick={() => navigate(-1)}
                                >
                                    ← Quay Lại
                                </button>
                            </div>

                            <div className="mb-3 d-flex justify-content-between align-items-center">
                                <span className="text-muted">Trạng thái:</span>
                                <span
                                    style={{
                                        background: "#ff6666",
                                        color: "#fff",
                                        fontSize: "13px",
                                        padding: "4px 10px",
                                        borderRadius: "8px",
                                    }}
                                >
                                    {task.status}
                                </span>
                            </div>

                            <div className="mb-3">
                                <div className="d-flex justify-content-between mb-1">
                                    <span className="text-muted small">Ắc quy</span>
                                    <span className="small fw-medium">{task.battery}%</span>
                                </div>
                                <div
                                    style={{
                                        background: "#e5eef8",
                                        height: "10px",
                                        borderRadius: "6px",
                                        overflow: "hidden",
                                    }}
                                >
                                    <div
                                        style={{
                                            height: "100%",
                                            background: "#00b894",
                                            width: `${task.battery}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>

                            <div className="mt-3 mb-2 fw-semibold" style={{ color: "#2f4f75" }}>
                                Phát Thanh
                            </div>
                            <select
                                className="form-select form-select-sm mb-2 rounded-3"
                                style={{ borderColor: "#c7dcf5" }}
                                onChange={handleQuickMessage}
                            >
                                <option>Chọn thông báo nhanh</option>
                                <option>Robot đang đến, vui lòng tránh đường</option>
                                <option>Vui lòng giữ khoảng cách an toàn</option>
                                <option>Xin cảm ơn sự hợp tác của bạn</option>
                            </select>

                            <div className="input-group mb-2">
                                <input
                                    className="form-control form-control-sm rounded-start-3"
                                    placeholder="Hoặc nhập thông báo..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <button
                                    className="btn btn-primary btn-sm rounded-end-3"
                                    style={{
                                        background: "#007bff",
                                        border: "none",
                                        borderRadius: "8px",
                                    }}
                                    onClick={sendMessage}
                                >
                                    Gửi
                                </button>
                            </div>

                            <button
                                className="btn w-100 mb-3"
                                style={{
                                    background: micOn ? "#0061d5" : "#eaf3ff",
                                    color: micOn ? "#fff" : "#0061d5",
                                    borderRadius: "8px",
                                    transition: "0.3s",
                                }}
                                onClick={toggleMic}
                            >
                                🎤 {micOn ? "Tắt Mic Trực Tiếp" : "Mở Mic Trực Tiếp"}
                            </button>

                            <div className="mt-3 p-3 rounded-3" style={{ background: "#f7fbff" }}>
                                <h6 className="mb-2 fw-bold text-danger">Chế Độ Lái</h6>
                                <p className="text-muted small mb-2">
                                    Chuyển robot sang điều khiển từ xa
                                </p>
                                <button
                                    className="btn btn-primary w-100"
                                    style={{
                                        background: "#0061d5",
                                        border: "none",
                                        borderRadius: "8px",
                                    }}
                                    onClick={() => addLog("ok", "Kích hoạt chế độ lái từ xa")}
                                >
                                    Chuyển sang chế độ Lái từ xa
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* MIDDLE */}
                    <div className="col-lg-6">
                        <div
                            style={{
                                background: "#fff",
                                borderRadius: "12px",
                                padding: "20px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                border: "1px solid #e3edf8",
                            }}
                        >
                            <div className="d-flex align-items-center mb-2">
                                <span className="badge bg-danger me-2">LIVE</span>
                                <span className="fw-semibold">Camera Trực Tiếp</span>
                            </div>
                            <div
                                style={{
                                    height: "240px",
                                    background: "#e9f2ff",
                                    borderRadius: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#6c8bb9",
                                    fontSize: "18px",
                                    fontWeight: 500,
                                }}
                            >
                                Camera Feed
                            </div>

                            <div className="mt-4">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h6 className="fw-semibold m-0">Bản Đồ Bệnh Viện</h6>
                                    <div className="text-end">
                                        <div className="small fw-medium text-primary">
                                            Đích đến: {task.destination}
                                        </div>
                                        <div className="small text-muted">
                                            Vị trí hiện tại: {task.position}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        height: "180px",
                                        background: "#f1f7ff",
                                        borderRadius: "8px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#7b96b9",
                                        fontWeight: 500,
                                    }}
                                >
                                    Map Placeholder
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="col-lg-3">
                        <div
                            style={{
                                background: "#fff",
                                borderRadius: "12px",
                                padding: "20px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                border: "1px solid #e3edf8",
                            }}
                        >
                            <h5 className="fw-bold mb-3">Nhật Ký Hệ Thống</h5>
                            <div style={{ maxHeight: "480px", overflowY: "auto" }}>
                                {logs.map((l, i) => (
                                    <div key={i} className="border-bottom py-2">
                                        <div className="d-flex justify-content-between mb-1">
                                            <small className="text-muted">{l.t}</small>
                                            <small
                                                style={{
                                                    color:
                                                        l.type === "ok"
                                                            ? "#00b894"
                                                            : l.type === "error"
                                                                ? "#ff6b6b"
                                                                : "#007bff",
                                                }}
                                            >
                                                {l.type === "ok"
                                                    ? "✔"
                                                    : l.type === "error"
                                                        ? "✖"
                                                        : "🔊"}
                                            </small>
                                        </div>
                                        <div className="small text-secondary">{l.text}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
